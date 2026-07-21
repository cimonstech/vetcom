import { createClient } from "@/lib/supabase/server";
import type { Category, ContactSubmission, Media, Post, Tag } from "@/lib/types/database";

export interface PostCounts {
  total: number;
  published: number;
  draft: number;
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getPostCounts(): Promise<PostCounts> {
  const posts = await getAllPosts();
  return {
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    draft: posts.filter((post) => post.status === "draft").length,
  };
}

export async function getPostForEdit(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error || !data) return [];
  return data;
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error || !data) return [];
  return data;
}

export async function getPostCategoryIds(postId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("post_categories")
    .select("category_id")
    .eq("post_id", postId);
  return (data ?? []).map((row) => row.category_id);
}

export async function getPostTagIds(postId: string): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("post_tags").select("tag_id").eq("post_id", postId);
  return (data ?? []).map((row) => row.tag_id);
}

export async function getAllMedia(): Promise<Media[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}
