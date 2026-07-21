"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all fields." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });

    if (error) {
      return {
        status: "error",
        message: "Something went wrong sending your message. Please email us directly.",
      };
    }

    return { status: "success", message: "Thanks — we've received your message and will be in touch soon." };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email us directly.",
    };
  }
}
