import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getLatestPublishedPosts } from "@/lib/supabase/queries";

export async function BlogPreview() {
  const posts = await getLatestPublishedPosts(3);

  return (
    <section className="section-wash py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">
            Insights
          </p>
          <h2 className="text-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Latest From Our Blog
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                {post.featured_image ? (
                  <div className="relative aspect-[16/10] w-full bg-gray-100">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  {post.published_at && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <CalendarDays className="size-3.5" />
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <h3 className="mt-3 font-semibold text-navy group-hover:text-gold">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-md rounded-xl border border-dashed border-gray-300 bg-gray-light p-10 text-center">
            <Newspaper className="mx-auto size-8 text-gold" />
            <p className="mt-4 text-gray-600">
              Our blog is launching soon — check back for insights on telecommunications and
              ICT solutions.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-gold"
          >
            Visit the blog
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
