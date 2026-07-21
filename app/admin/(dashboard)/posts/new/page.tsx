import type { Metadata } from "next";

import { PostForm } from "@/components/admin/PostForm";
import { getAllCategories, getAllTags } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-navy">New Post</h1>
      <PostForm categories={categories} tags={tags} selectedCategoryIds={[]} selectedTagIds={[]} />
    </div>
  );
}
