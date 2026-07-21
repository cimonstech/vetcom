import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";
import {
  getAllCategories,
  getAllTags,
  getPostCategoryIds,
  getPostForEdit,
  getPostTagIds,
} from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  const [post, categories, tags] = await Promise.all([
    getPostForEdit(id),
    getAllCategories(),
    getAllTags(),
  ]);

  if (!post) notFound();

  const [selectedCategoryIds, selectedTagIds] = await Promise.all([
    getPostCategoryIds(id),
    getPostTagIds(id),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-navy">Edit Post</h1>
      <PostForm
        post={post}
        categories={categories}
        tags={tags}
        selectedCategoryIds={selectedCategoryIds}
        selectedTagIds={selectedTagIds}
      />
    </div>
  );
}
