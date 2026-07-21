"use server";

import { revalidatePath } from "next/cache";

import { deleteFileFromR2, uploadFileToR2 } from "@/lib/r2/upload";
import { createClient } from "@/lib/supabase/server";

export interface MediaFormState {
  status: "idle" | "error" | "success";
  message?: string;
}

export async function uploadMedia(
  _prevState: MediaFormState,
  formData: FormData
): Promise<MediaFormState> {
  const file = formData.get("file");
  const alt = String(formData.get("alt") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Please choose a file to upload." };
  }

  if (!file.type.startsWith("image/")) {
    return { status: "error", message: "Only image files are allowed." };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { status: "error", message: "Image must be 10 MB or smaller." };
  }

  try {
    const uploaded = await uploadFileToR2(file);
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase.from("media").insert({
      key: uploaded.key,
      url: uploaded.url,
      filename: uploaded.filename,
      mime_type: uploaded.mimeType,
      size_bytes: uploaded.sizeBytes,
      alt: alt || null,
      uploaded_by: userData.user?.id ?? null,
    });

    if (error) {
      await deleteFileFromR2(uploaded.key).catch(() => undefined);
      return { status: "error", message: "Uploaded to storage but failed to save metadata." };
    }

    revalidatePath("/admin/media");
    return { status: "success", message: "Upload complete." };
  } catch {
    return {
      status: "error",
      message: "Upload failed. Check that R2 credentials are configured correctly.",
    };
  }
}

export async function deleteMedia(id: string): Promise<void> {
  const supabase = await createClient();
  const { data: media } = await supabase.from("media").select("key").eq("id", id).maybeSingle();

  await supabase.from("media").delete().eq("id", id);

  if (media?.key) {
    await deleteFileFromR2(media.key).catch(() => undefined);
  }

  revalidatePath("/admin/media");
}
