-- ============================================================
-- VETCOM Communication — initial schema
-- Data-API safe: explicit GRANTs + RLS (May/Oct 2026 ready)
-- Blog (Tiptap HTML) + media library (Cloudflare R2) + contact
-- Idempotent: safe to re-run (DROP POLICY IF EXISTS / IF NOT EXISTS)
-- ============================================================

-- Data API roles need schema usage before any table grants apply
grant usage on schema public to anon, authenticated, service_role;

-- ------------------------------------------------------------
-- Admin helper
-- v1: any authenticated user. Before production, swap to
-- profiles.is_admin (see bottom of this file).
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.role() = 'authenticated';
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, service_role;

-- Shared updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- profiles (author display + future is_admin flag)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- No anon grant: profiles stay off the public Data API
grant select on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

drop policy if exists "admins or owner can read profiles" on public.profiles;
create policy "admins or owner can read profiles"
  on public.profiles for select to authenticated
  using (public.is_admin() or auth.uid() = id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();

-- ------------------------------------------------------------
-- categories (blog sidebar)
-- ------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

grant select on table public.categories to anon;
grant select, insert, update, delete on table public.categories to authenticated;
grant select, insert, update, delete on table public.categories to service_role;

drop policy if exists "public can read categories" on public.categories;
create policy "public can read categories"
  on public.categories for select to anon, authenticated
  using (true);

drop policy if exists "admins manage categories" on public.categories;
create policy "admins manage categories"
  on public.categories for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------
-- tags (blog sidebar tag cloud)
-- ------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.tags enable row level security;

grant select on table public.tags to anon;
grant select, insert, update, delete on table public.tags to authenticated;
grant select, insert, update, delete on table public.tags to service_role;

drop policy if exists "public can read tags" on public.tags;
create policy "public can read tags"
  on public.tags for select to anon, authenticated
  using (true);

drop policy if exists "admins manage tags" on public.tags;
create policy "admins manage tags"
  on public.tags for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------
-- posts (Tiptap content stored as HTML in content)
-- ------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  featured_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create index if not exists posts_slug_idx
  on public.posts (slug);

alter table public.posts enable row level security;

grant select on table public.posts to anon;
grant select, insert, update, delete on table public.posts to authenticated;
grant select, insert, update, delete on table public.posts to service_role;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts"
  on public.posts for select to anon
  using (status = 'published');

drop policy if exists "admins can read all posts" on public.posts;
create policy "admins can read all posts"
  on public.posts for select to authenticated
  using (public.is_admin());

drop policy if exists "admins can insert posts" on public.posts;
create policy "admins can insert posts"
  on public.posts for insert to authenticated
  with check (public.is_admin());

drop policy if exists "admins can update posts" on public.posts;
create policy "admins can update posts"
  on public.posts for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins can delete posts" on public.posts;
create policy "admins can delete posts"
  on public.posts for delete to authenticated
  using (public.is_admin());

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row
  execute function public.update_updated_at_column();

-- ------------------------------------------------------------
-- post_categories
-- ------------------------------------------------------------
create table if not exists public.post_categories (
  post_id uuid not null references public.posts (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (post_id, category_id)
);

alter table public.post_categories enable row level security;

grant select on table public.post_categories to anon;
grant select, insert, update, delete on table public.post_categories to authenticated;
grant select, insert, update, delete on table public.post_categories to service_role;

drop policy if exists "public can read post_categories for published posts" on public.post_categories;
create policy "public can read post_categories for published posts"
  on public.post_categories for select to anon
  using (
    exists (
      select 1 from public.posts
      where posts.id = post_categories.post_id
        and posts.status = 'published'
    )
  );

drop policy if exists "admins can read all post_categories" on public.post_categories;
create policy "admins can read all post_categories"
  on public.post_categories for select to authenticated
  using (public.is_admin());

drop policy if exists "admins manage post_categories" on public.post_categories;
create policy "admins manage post_categories"
  on public.post_categories for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------
-- post_tags
-- ------------------------------------------------------------
create table if not exists public.post_tags (
  post_id uuid not null references public.posts (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (post_id, tag_id)
);

alter table public.post_tags enable row level security;

grant select on table public.post_tags to anon;
grant select, insert, update, delete on table public.post_tags to authenticated;
grant select, insert, update, delete on table public.post_tags to service_role;

drop policy if exists "public can read post_tags for published posts" on public.post_tags;
create policy "public can read post_tags for published posts"
  on public.post_tags for select to anon
  using (
    exists (
      select 1 from public.posts
      where posts.id = post_tags.post_id
        and posts.status = 'published'
    )
  );

drop policy if exists "admins can read all post_tags" on public.post_tags;
create policy "admins can read all post_tags"
  on public.post_tags for select to authenticated
  using (public.is_admin());

drop policy if exists "admins manage post_tags" on public.post_tags;
create policy "admins manage post_tags"
  on public.post_tags for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------
-- media library (Cloudflare R2 metadata — files live in R2)
-- ------------------------------------------------------------
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,          -- R2 object key, e.g. media/2026/07/uuid.jpg
  url text not null,                 -- Public CDN URL
  filename text not null,            -- Original filename
  mime_type text not null,
  size_bytes bigint not null default 0,
  width integer,
  height integer,
  alt text,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists media_created_at_idx
  on public.media (created_at desc);

create index if not exists media_mime_type_idx
  on public.media (mime_type);

alter table public.media enable row level security;

-- Public can read media metadata (file bytes are served from R2 public URL)
grant select on table public.media to anon;
grant select, insert, update, delete on table public.media to authenticated;
grant select, insert, update, delete on table public.media to service_role;

drop policy if exists "public can read media" on public.media;
create policy "public can read media"
  on public.media for select to anon, authenticated
  using (true);

drop policy if exists "admins manage media" on public.media;
create policy "admins manage media"
  on public.media for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop trigger if exists media_updated_at on public.media;
create trigger media_updated_at
  before update on public.media
  for each row
  execute function public.update_updated_at_column();

-- ------------------------------------------------------------
-- contact form submissions
-- ------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- anon: insert only (cannot read submissions via Data API)
grant insert on table public.contact_submissions to anon;
grant select, delete on table public.contact_submissions to authenticated;
grant select, insert, update, delete on table public.contact_submissions to service_role;

drop policy if exists "anyone can submit contact form" on public.contact_submissions;
create policy "anyone can submit contact form"
  on public.contact_submissions for insert to anon, authenticated
  with check (true);

drop policy if exists "admins can read contact submissions" on public.contact_submissions;
create policy "admins can read contact submissions"
  on public.contact_submissions for select to authenticated
  using (public.is_admin());

drop policy if exists "admins can delete contact submissions" on public.contact_submissions;
create policy "admins can delete contact submissions"
  on public.contact_submissions for delete to authenticated
  using (public.is_admin());

-- ============================================================
-- Production hardening (optional — run later):
--
-- create or replace function public.is_admin()
-- returns boolean
-- language sql
-- stable
-- security definer
-- set search_path = public
-- as $$
--   select coalesce(
--     (select is_admin from public.profiles where id = auth.uid()),
--     false
--   );
-- $$;
--
-- Then set profiles.is_admin = true for your admin user(s).
-- ============================================================
