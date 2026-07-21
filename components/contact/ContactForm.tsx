"use client";

import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";
import { contactFormSchema, getFieldErrors, type ContactFormData } from "@/lib/validation";

const initialState: ContactFormState = { status: "idle" };

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  agreedToContact: false,
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state.status === "error" && state.errors) {
      setErrors(state.errors);
    }
    if (state.status === "success") {
      setFormData(emptyForm);
      setErrors({});
    }
  }, [state]);

  const validateField = (field: keyof ContactFormData, value: unknown) => {
    const fieldSchema = contactFormSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    setErrors((prev) => {
      const next = { ...prev };
      if (!result.success) {
        next[field] = result.error.issues[0]?.message || "Invalid";
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      e.preventDefault();
      setErrors(getFieldErrors(result.error));
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-md border px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={(e) => validateField("name", e.target.value)}
            className={inputClass("name")}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => validateField("email", e.target.value)}
            className={inputClass("email")}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
          Phone{" "}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={(e) => validateField("phone", e.target.value)}
          className={inputClass("phone")}
          placeholder="+233 24 649 4049"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1.5 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={(e) => validateField("message", e.target.value)}
          className={`${inputClass("message")} resize-none`}
          placeholder="Tell us about your project or request..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-gray-700">
          <input
            type="checkbox"
            name="agreedToContact"
            checked={formData.agreedToContact}
            onChange={handleChange}
            className="mt-0.5 size-4 rounded border-gray-300 text-gold focus:ring-gold"
            aria-invalid={Boolean(errors.agreedToContact)}
          />
          <span>
            I agree that VETCOM Communication may contact me about this enquiry using the details
            provided.
          </span>
        </label>
        {errors.agreedToContact && (
          <p className="mt-1.5 text-xs text-red-600">{errors.agreedToContact}</p>
        )}
      </div>

      {state.status !== "idle" && state.message && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-md p-3.5 text-sm ${
            state.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.status === "success" ? (
            <CircleCheck className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
