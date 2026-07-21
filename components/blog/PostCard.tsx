import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/types/database";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
    >
      {post.featured_image ? (
        <div className="relative aspect-[16/10] w-full bg-gray-100">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 66vw"
            unoptimized
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
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
        <h2 className="mt-3 text-lg font-semibold text-navy group-hover:text-gold">{post.title}</h2>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-navy group-hover:text-gold">Read more →</span>
      </div>
    </Link>
  );
}
