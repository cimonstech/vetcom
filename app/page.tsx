import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants/site";

export default function Home() {
  return (
    <>
      {/* Hero placeholder — full homepage sections come in Step 3 */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-transparent to-transparent" />
        <Container className="relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {siteConfig.name}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Get a Quote
              </Button>
              <Button href="/services" variant="outline">
                Our Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Step 1/2 confirmation strip */}
      <section className="bg-gray-light py-16">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-navy">Foundation Ready</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Scaffold, branding, Supabase setup, header/footer, and the shared inner-page hero
            pattern are in place. Full homepage sections come next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 rounded-md border border-navy/20 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
              >
                {label}
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
