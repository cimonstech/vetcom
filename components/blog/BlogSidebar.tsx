import { CalendarDays, Search, Tag as TagIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { CategoryWithCount, TagWithCount } from "@/lib/supabase/queries";
import type { Post } from "@/lib/types/database";

interface BlogSidebarProps {
  categories: CategoryWithCount[];
  tags: TagWithCount[];
  recentPosts: Post[];
  activeSearch?: string;
  activeCategory?: string;
  activeTag?: string;
}

export function BlogSidebar({
  categories,
  tags,
  recentPosts,
  activeSearch,
  activeCategory,
  activeTag,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-navy">Search</h3>
        <form action="/blog" method="get" className="mt-3 flex">
          <input
            type="text"
            name="search"
            defaultValue={activeSearch}
            placeholder="Search articles..."
            className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-r-md bg-navy px-3 text-gold transition-colors hover:bg-navy-light"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-navy">Categories</h3>
          <ul className="mt-3 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog?category=${category.slug}`}
                  className={`flex items-center justify-between text-sm transition-colors hover:text-gold ${
                    activeCategory === category.slug ? "font-semibold text-gold" : "text-gray-600"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-gray-400">({category.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-navy">Recent Posts</h3>
          <ul className="mt-3 space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <span className="text-sm font-medium text-navy group-hover:text-gold">
                    {post.title}
                  </span>
                  {post.published_at && (
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <CalendarDays className="size-3" />
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tag cloud */}
      {tags.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-navy">Tags</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:border-gold hover:text-gold ${
                  activeTag === tag.slug
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <TagIcon className="size-3" />
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-xl bg-navy p-6 text-center text-white">
        <h3 className="font-semibold">Need Telecom Solutions?</h3>
        <p className="mt-2 text-sm text-gray-300">
          Talk to our team about infrastructure, ICT, or security solutions for your business.
        </p>
        <Button href="/contact" variant="primary" className="mt-4 w-full">
          Contact Us
        </Button>
      </div>
    </aside>
  );
}
