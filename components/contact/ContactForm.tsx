"use client";

import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import { useActionState } from "react";

import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          placeholder="Tell us about your project or request..."
        />
      </div>

      {state.status !== "idle" && state.message && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-md p-3.5 text-sm ${
            state.status === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
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
