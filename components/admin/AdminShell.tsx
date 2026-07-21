"use client";

import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { logout } from "@/app/admin/login/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { siteImages } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";

export function AdminShell({
  email,
  children,
}: {
  email?: string | null;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const sidebar = (
    <>
      <Link
        href="/"
        className="mb-8 flex items-center rounded-md bg-white px-2 py-2"
        onClick={() => setOpen(false)}
      >
        <Image
          src={siteImages.logo}
          alt={siteConfig.name}
          width={180}
          height={48}
          className="h-9 w-auto"
        />
      </Link>

      <div onClick={() => setOpen(false)}>
        <AdminNav />
      </div>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
        <p className="truncate px-3 text-xs text-gray-400">{email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-light">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy px-4 py-6 md:flex">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-navy px-4 py-6 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-navy hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm font-semibold text-navy">Admin</span>
        </div>
        <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
