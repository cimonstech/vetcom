import { Pencil, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { Button } from "@/components/ui/Button";
import { getAllPosts } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "Manage Posts",
  robots: { index: false, follow: false },
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">{posts.length} post{posts.length === 1 ? "" : "s"} total</p>
        </div>
        <Button href="/admin/posts/new" variant="primary">
          <Plus className="mr-1.5 size-4" />
          New Post
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {posts.length === 0 ? (
          <p className="p-10 text-center text-sm text-gray-500">
            No posts yet. Click &ldquo;New Post&rdquo; to create your first one.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-gray-50">
                  <td className="max-w-sm px-5 py-3.5">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-medium text-navy hover:text-gold"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(post.published_at)}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(post.updated_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        aria-label={`Edit ${post.title}`}
                        className="inline-flex size-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-navy/5 hover:text-navy"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
