import type { Metadata } from "next";
import { Newspaper, X } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Pagination } from "@/components/blog/Pagination";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { pageHeroImages } from "@/lib/constants/images";
import {
  getCategoriesWithCounts,
  getLatestPublishedPosts,
  getPublishedPosts,
  getTagsWithCounts,
} from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, insights, and updates from VETCOM Communication.",
};

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 6;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const [{ posts, total }, categories, tags, recentPosts] = await Promise.all([
    getPublishedPosts({
      page,
      pageSize: PAGE_SIZE,
      search: params.search,
      categorySlug: params.category,
      tagSlug: params.tag,
    }),
    getCategoriesWithCounts(),
    getTagsWithCounts(),
    getLatestPublishedPosts(5),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasFilters = Boolean(params.search || params.category || params.tag);

  return (
    <>
      <PageHero
        title="Blog"
        description="Insights, news, and updates on telecommunications and ICT solutions in Ghana."
        breadcrumbs={[{ label: "Blog" }]}
        image={pageHeroImages.blog}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            {hasFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-500">Filtering by:</span>
                {params.search && (
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-navy">
                    Search: &ldquo;{params.search}&rdquo;
                  </span>
                )}
                {params.category && (
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-navy">
                    Category: {params.category}
                  </span>
                )}
                {params.tag && (
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-navy">
                    Tag: {params.tag}
                  </span>
                )}
                <Link
                  href="/blog"
                  className="flex items-center gap-1 text-gray-500 hover:text-gold"
                >
                  <X className="size-3.5" />
                  Clear
                </Link>
              </div>
            )}

            {posts.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  searchParams={{
                    search: params.search,
                    category: params.category,
                    tag: params.tag,
                  }}
                />
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-light p-10 text-center">
                <Newspaper className="mx-auto size-8 text-gold" />
                <p className="mt-4 text-gray-600">
                  {hasFilters
                    ? "No articles match your filters. Try clearing them or searching for something else."
                    : "Our blog is launching soon — check back for insights on telecommunications and ICT solutions."}
                </p>
                {hasFilters && (
                  <Link
                    href="/blog"
                    className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy hover:text-gold"
                  >
                    <X className="size-4" />
                    Clear filters
                  </Link>
                )}
              </div>
            )}
          </div>

          <BlogSidebar
            categories={categories}
            tags={tags}
            recentPosts={recentPosts}
            activeSearch={params.search}
            activeCategory={params.category}
            activeTag={params.tag}
          />
        </Container>
      </section>
    </>
  );
}
