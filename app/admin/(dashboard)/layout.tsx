import { LogOut } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/admin/login/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { siteImages } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-light">
      <aside className="flex w-64 flex-col bg-navy px-4 py-6">
        <Link href="/" className="mb-8 flex items-center rounded-md bg-white px-2 py-2">
          <Image
            src={siteImages.logo}
            alt={siteConfig.name}
            width={180}
            height={48}
            className="h-9 w-auto"
          />
        </Link>

        <AdminNav />

        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-gray-400">{data.user.email}</p>
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
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
