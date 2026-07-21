import type { Metadata } from "next";

import { TaxonomyManager } from "@/components/admin/TaxonomyManager";
import { getAllCategories, getAllTags } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "Categories & Tags",
};

export default async function TaxonomyPage() {
  const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Categories & Tags</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create categories and tags here, then assign them when editing a post.
        </p>
      </div>

      <TaxonomyManager categories={categories} tags={tags} />
    </div>
  );
}
