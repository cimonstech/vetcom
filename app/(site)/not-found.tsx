import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants/site";

/**
 * Public 404 inside the site chrome — returns a real not-found response
 * (not a soft 200) so crawlers and AI retrieval don't treat missing URLs as live pages.
 */
export default function SiteNotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-gray-600">
        That URL doesn&apos;t match anything on {siteConfig.name}. Try one of these pages instead.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/services" variant="outline">
          Services
        </Button>
        <Link href="/blog" className="text-sm font-medium text-navy hover:text-gold">
          Blog →
        </Link>
        <Link href="/contact" className="text-sm font-medium text-navy hover:text-gold">
          Contact →
        </Link>
      </div>
    </Container>
  );
}
