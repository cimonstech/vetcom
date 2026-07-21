import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Container } from "@/components/ui/Container";
import {
  getCategoriesWithCounts,
  getLatestPublishedPosts,
  getPostBySlug,
  getPostRelations,
  getTagsWithCounts,
} from "@/lib/supabase/queries";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const [{ categories, tags }, allCategories, allTags, recentPosts] = await Promise.all([
    getPostRelations(post.id),
    getCategoriesWithCounts(),
    getTagsWithCounts(),
    getLatestPublishedPosts(5),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-transparent to-transparent" />
        <Container className="relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-300">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/blog" className="hover:text-gold">
              Blog
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gold">{post.title}</span>
          </nav>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="rounded-full bg-white/10 px-3 py-1 hover:bg-gold hover:text-navy"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article>
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="mb-8 w-full rounded-xl object-cover"
              />
            )}

            <div
              className="prose prose-slate max-w-none prose-headings:text-navy prose-a:text-navy prose-a:underline-offset-2 hover:prose-a:text-gold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
                <span className="text-sm font-medium text-gray-500">Tags:</span>
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:border-gold hover:text-gold"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </article>

          <BlogSidebar categories={allCategories} tags={allTags} recentPosts={recentPosts} />
        </Container>
      </section>
    </>
  );
}
