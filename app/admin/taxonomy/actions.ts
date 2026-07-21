"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { Category, Tag } from "@/lib/types/database";
import { slugify } from "@/lib/utils/slugify";

export interface TaxonomyFormState {
  status: "idle" | "error" | "success";
  message?: string;
  item?: Category | Tag;
}

function revalidateTaxonomy() {
  revalidatePath("/admin/taxonomy");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/posts/new");
  revalidatePath("/blog");
}

export async function createCategory(
  _prev: TaxonomyFormState,
  formData: FormData
): Promise<TaxonomyFormState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "Category name is required." };

  const slug = slugify(name);
  if (!slug) return { status: "error", message: "Please provide a valid name." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({ name, slug })
    .select("*")
    .single();

  if (error || !data) {
    return {
      status: "error",
      message: error?.code === "23505" ? "That category already exists." : "Failed to create category.",
    };
  }

  revalidateTaxonomy();
  return { status: "success", message: `Created category “${name}”.`, item: data };
}

export async function createTag(
  _prev: TaxonomyFormState,
  formData: FormData
): Promise<TaxonomyFormState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "Tag name is required." };

  const slug = slugify(name);
  if (!slug) return { status: "error", message: "Please provide a valid name." };

  const supabase = await createClient();
  const { data, error } = await supabase.from("tags").insert({ name, slug }).select("*").single();

  if (error || !data) {
    return {
      status: "error",
      message: error?.code === "23505" ? "That tag already exists." : "Failed to create tag.",
    };
  }

  revalidateTaxonomy();
  return { status: "success", message: `Created tag “${name}”.`, item: data };
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);
  revalidateTaxonomy();
}

export async function deleteTag(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("tags").delete().eq("id", id);
  revalidateTaxonomy();
}
