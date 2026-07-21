"use server";

import { sendContactNotification } from "@/lib/email/resend";
import { getFieldErrors, getFirstError, parseContactFormInput } from "@/lib/validation";
import { sanitize, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { createClient } from "@/lib/supabase/server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validationResult = parseContactFormInput({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    agreedToContact: formData.get("agreedToContact"),
  });

  if (!validationResult.success) {
    return {
      status: "error",
      message: getFirstError(validationResult.error),
      errors: getFieldErrors(validationResult.error),
    };
  }

  const payload = {
    name: sanitize(validationResult.data.name),
    email: sanitizeEmail(validationResult.data.email),
    phone: validationResult.data.phone
      ? sanitizePhone(validationResult.data.phone)
      : null,
    message: sanitize(validationResult.data.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert(payload);

    if (error) {
      console.error("Contact form insert failed:", error.code);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please email us directly.",
      };
    }

    try {
      await sendContactNotification(payload);
    } catch (mailError) {
      console.error("Contact notification email failed:", mailError);
    }

    return {
      status: "success",
      message: "Thanks — we've received your message and will be in touch soon.",
    };
  } catch (error) {
    console.error("Contact form unexpected error:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email us directly.",
    };
  }
}
