import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: true },
};

/**
 * Hard 404 page — avoids soft-404s that confuse crawlers and AI retrieval.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-light px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-gray-600">
        That URL doesn&apos;t match anything on {siteConfig.name}. It may have been moved or never
        existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/contact" variant="outline">
          Contact us
        </Button>
        <Link href="/blog" className="text-sm font-medium text-navy hover:text-gold">
          Visit the blog →
        </Link>
      </div>
    </div>
  );
}
