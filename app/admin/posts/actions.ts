"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadFileToR2 } from "@/lib/r2/upload";
import { createClient } from "@/lib/supabase/server";
import type { Database, PostStatus } from "@/lib/types/database";
import { slugify } from "@/lib/utils/slugify";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface PostFormState {
  status: "idle" | "error";
  message?: string;
}

type TypedSupabaseClient = SupabaseClient<Database>;

async function uploadFeaturedImage(
  supabase: TypedSupabaseClient,
  file: File,
  uploadedBy: string | null
): Promise<string | null> {
  const uploaded = await uploadFileToR2(file, "posts");

  await supabase.from("media").insert({
    key: uploaded.key,
    url: uploaded.url,
    filename: uploaded.filename,
    mime_type: uploaded.mimeType,
    size_bytes: uploaded.sizeBytes,
    uploaded_by: uploadedBy,
  });

  return uploaded.url;
}

async function syncPostRelations(
  supabase: TypedSupabaseClient,
  postId: string,
  categoryIds: string[],
  tagIds: string[]
) {
  await supabase.from("post_categories").delete().eq("post_id", postId);
  await supabase.from("post_tags").delete().eq("post_id", postId);

  if (categoryIds.length > 0) {
    await supabase
      .from("post_categories")
      .insert(categoryIds.map((categoryId) => ({ post_id: postId, category_id: categoryId })));
  }

  if (tagIds.length > 0) {
    await supabase
      .from("post_tags")
      .insert(tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId })));
  }
}

export async function savePost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as PostStatus;
  const categoryIds = formData.getAll("categoryIds").map(String);
  const tagIds = formData.getAll("tagIds").map(String);
  const existingImageUrl = String(formData.get("existingImageUrl") ?? "") || null;
  const pastedImageUrl = String(formData.get("featuredImageUrl") ?? "").trim() || null;
  const removeImage = formData.get("removeImage") === "on";
  const imageFile = formData.get("image");

  if (!title || !content) {
    return { status: "error", message: "Title and content are required." };
  }

  const slug = slugify(rawSlug || title);
  if (!slug) {
    return { status: "error", message: "Please provide a valid slug." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const authorId = userData.user?.id ?? null;

  let featuredImage = existingImageUrl;
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      featuredImage = await uploadFeaturedImage(supabase, imageFile, authorId);
    } catch {
      return {
        status: "error",
        message: "Failed to upload image. Check R2 configuration and try again.",
      };
    }
  } else if (pastedImageUrl) {
    featuredImage = pastedImageUrl;
  } else if (removeImage) {
    featuredImage = null;
  }

  let publishedAt: string | null = null;
  if (status === "published") {
    if (id) {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", id)
        .maybeSingle();
      publishedAt = existing?.published_at ?? new Date().toISOString();
    } else {
      publishedAt = new Date().toISOString();
    }
  }

  let postId = id;

  if (id) {
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featured_image: featuredImage,
        status,
        published_at: publishedAt,
      })
      .eq("id", id);

    if (error) {
      return {
        status: "error",
        message: error.code === "23505" ? "That slug is already in use." : "Failed to save post.",
      };
    }
  } else {
    const { data: created, error } = await supabase
      .from("posts")
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featured_image: featuredImage,
        status,
        published_at: publishedAt,
        author_id: authorId,
      })
      .select("id")
      .single();

    if (error || !created) {
      return {
        status: "error",
        message: error?.code === "23505" ? "That slug is already in use." : "Failed to create post.",
      };
    }
    postId = created.id;
  }

  await syncPostRelations(supabase, postId, categoryIds, tagIds);

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
