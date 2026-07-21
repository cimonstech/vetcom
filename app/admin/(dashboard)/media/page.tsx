import type { Metadata } from "next";

import { MediaGrid } from "@/components/admin/MediaGrid";
import { MediaUploadForm } from "@/components/admin/MediaUploadForm";
import { getAllMedia } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "Media Library",
  robots: { index: false, follow: false },
};

export default async function MediaLibraryPage() {
  const media = await getAllMedia();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Media Library</h1>
        <p className="mt-1 text-sm text-gray-500">
          Images uploaded here are stored on Cloudflare R2 and can be reused across posts.
        </p>
      </div>

      <MediaUploadForm />
      <MediaGrid media={media} />
    </div>
  );
}
