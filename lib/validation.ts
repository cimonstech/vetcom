import { z } from "zod";

/**
 * Ghana phone validation (VETCOM operates in Accra, Ghana).
 * Accepts local (0XXXXXXXXX) and international (+233 / 233) formats.
 */
export function validateGhanaPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("233")) {
    // 233 + 9 national digits
    return digits.length === 12;
  }

  if (digits.startsWith("0")) {
    // Local: 0 + 9 digits
    return digits.length === 10;
  }

  // Bare national number without leading 0 (9 digits)
  return digits.length === 9;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s\-'.]+$/,
      "Name can only contain letters, spaces, hyphens, apostrophes and dots"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters")
    .transform((value) => value.toLowerCase()),

  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .refine((val) => !val || validateGhanaPhone(val), {
      message: "Please enter a valid Ghana phone number (e.g. 024 649 4049 or +233 24 649 4049)",
    })
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),

  agreedToContact: z
    .boolean()
    .refine((val) => val === true, "Please confirm we may contact you about this enquiry"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Parse FormData / loose objects into the contact schema. */
export function parseContactFormInput(input: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  agreedToContact?: unknown;
}) {
  return contactFormSchema.safeParse({
    name: String(input.name ?? ""),
    email: String(input.email ?? ""),
    phone: String(input.phone ?? ""),
    message: String(input.message ?? ""),
    agreedToContact:
      input.agreedToContact === true ||
      input.agreedToContact === "on" ||
      input.agreedToContact === "true",
  });
}

export function getFirstError(error: z.ZodError): string {
  return error.issues[0]?.message || "Validation failed";
}

export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}
