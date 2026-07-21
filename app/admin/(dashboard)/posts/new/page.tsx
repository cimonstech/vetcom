import type { Metadata } from "next";

import { PostForm } from "@/components/admin/PostForm";
import { getAllCategories, getAllMedia, getAllTags } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  const [categories, tags, media] = await Promise.all([
    getAllCategories(),
    getAllTags(),
    getAllMedia(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-navy">New Post</h1>
      <PostForm
        categories={categories}
        tags={tags}
        media={media}
        selectedCategoryIds={[]}
        selectedTagIds={[]}
      />
    </div>
  );
}
