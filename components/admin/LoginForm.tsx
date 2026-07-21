"use client";

import { CircleAlert, Loader2 } from "lucide-react";
import { useActionState } from "react";

import { login, type LoginFormState } from "@/app/admin/login/actions";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          placeholder="admin@vetcomcommunication.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
          placeholder="••••••••"
        />
      </div>

      {state.status === "error" && state.message && (
        <div role="alert" className="flex items-start gap-2.5 rounded-md bg-red-50 p-3.5 text-sm text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
