"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function deleteContactSubmission(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
