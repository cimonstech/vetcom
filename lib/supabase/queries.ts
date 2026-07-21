import { createClient } from "@/lib/supabase/server";
import type { Category, Post, Tag } from "@/lib/types/database";

const DEFAULT_PAGE_SIZE = 6;

export interface CategoryWithCount extends Category {
  count: number;
}

export interface TagWithCount extends Tag {
  count: number;
}

export interface PublishedPostsFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
}

export interface PublishedPostsResult {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}

/** Strips characters that would break PostgREST filter syntax. */
function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%,()]/g, "").trim();
}

/**
 * Fetches the most recent published posts. Returns an empty array on any
 * failure (e.g. Supabase not yet configured) so pages can render a graceful
 * fallback instead of crashing during build or request time.
 */
export async function getLatestPublishedPosts(limit = 3): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

/**
 * Fetches published posts with optional search, category, tag filtering,
 * and pagination. Degrades gracefully to an empty result set on failure.
 */
export async function getPublishedPosts(
  filter: PublishedPostsFilter = {}
): Promise<PublishedPostsResult> {
  const page = Math.max(1, filter.page ?? 1);
  const pageSize = filter.pageSize ?? DEFAULT_PAGE_SIZE;

  try {
    const supabase = await createClient();

    let postIdsFilter: string[] | null = null;

    if (filter.categorySlug) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", filter.categorySlug)
        .maybeSingle();

      if (!category) return { posts: [], total: 0, page, pageSize };

      const { data: rows } = await supabase
        .from("post_categories")
        .select("post_id")
        .eq("category_id", category.id);

      postIdsFilter = (rows ?? []).map((row) => row.post_id);
      if (postIdsFilter.length === 0) return { posts: [], total: 0, page, pageSize };
    }

    if (filter.tagSlug) {
      const { data: tag } = await supabase
        .from("tags")
        .select("id")
        .eq("slug", filter.tagSlug)
        .maybeSingle();

      if (!tag) return { posts: [], total: 0, page, pageSize };

      const { data: rows } = await supabase.from("post_tags").select("post_id").eq("tag_id", tag.id);
      const tagPostIds = (rows ?? []).map((row) => row.post_id);
      if (tagPostIds.length === 0) return { posts: [], total: 0, page, pageSize };

      postIdsFilter = postIdsFilter
        ? postIdsFilter.filter((id) => tagPostIds.includes(id))
        : tagPostIds;
      if (postIdsFilter.length === 0) return { posts: [], total: 0, page, pageSize };
    }

    let query = supabase.from("posts").select("*", { count: "exact" }).eq("status", "published");

    if (postIdsFilter) {
      query = query.in("id", postIdsFilter);
    }

    const search = filter.search ? sanitizeSearchTerm(filter.search) : "";
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error || !data) return { posts: [], total: 0, page, pageSize };

    return { posts: data, total: count ?? 0, page, pageSize };
  } catch {
    return { posts: [], total: 0, page, pageSize };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

/** Lightweight fields for sitemap generation. */
export async function getPublishedPostsForSitemap(): Promise<
  Pick<Post, "slug" | "updated_at" | "published_at" | "featured_image">[]
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug, updated_at, published_at, featured_image")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  try {
    const supabase = await createClient();
    const { data: categories, error } = await supabase.from("categories").select("*").order("name");
    if (error || !categories) return [];

    return await Promise.all(
      categories.map(async (category) => {
        const { count } = await supabase
          .from("post_categories")
          .select("post_id", { count: "exact", head: true })
          .eq("category_id", category.id);
        return { ...category, count: count ?? 0 };
      })
    );
  } catch {
    return [];
  }
}

export async function getTagsWithCounts(): Promise<TagWithCount[]> {
  try {
    const supabase = await createClient();
    const { data: tags, error } = await supabase.from("tags").select("*").order("name");
    if (error || !tags) return [];

    return await Promise.all(
      tags.map(async (tag) => {
        const { count } = await supabase
          .from("post_tags")
          .select("post_id", { count: "exact", head: true })
          .eq("tag_id", tag.id);
        return { ...tag, count: count ?? 0 };
      })
    );
  } catch {
    return [];
  }
}

export interface PostRelations {
  categories: Category[];
  tags: Tag[];
}

export async function getPostRelations(postId: string): Promise<PostRelations> {
  try {
    const supabase = await createClient();

    const [categoryRows, tagRows] = await Promise.all([
      supabase.from("post_categories").select("category_id").eq("post_id", postId),
      supabase.from("post_tags").select("tag_id").eq("post_id", postId),
    ]);

    const categoryIds = (categoryRows.data ?? []).map((row) => row.category_id);
    const tagIds = (tagRows.data ?? []).map((row) => row.tag_id);

    const [categories, tags] = await Promise.all([
      categoryIds.length
        ? supabase.from("categories").select("*").in("id", categoryIds)
        : Promise.resolve({ data: [] as Category[] }),
      tagIds.length
        ? supabase.from("tags").select("*").in("id", tagIds)
        : Promise.resolve({ data: [] as Tag[] }),
    ]);

    return { categories: categories.data ?? [], tags: tags.data ?? [] };
  } catch {
    return { categories: [], tags: [] };
  }
}
