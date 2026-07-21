import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/admin/LoginForm";
import { siteImages } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-light px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center">
          <Image
            src={siteImages.logoOnLight}
            alt={siteConfig.name}
            width={200}
            height={56}
            className="h-10 w-auto"
          />
        </Link>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-navy">Admin Sign In</h1>
          <p className="mt-1 text-sm text-gray-500">Manage blog posts and site content.</p>

          <div className="mt-6">
            <LoginForm redirectTo={redirectTo ?? "/admin/posts"} />
          </div>
        </div>
      </div>
    </div>
  );
}
