import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { industries } from "@/lib/constants/site";

export function IndustriesPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Who We Serve
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Industries We Serve
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
            >
              {industry}
            </span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-gold"
          >
            See how we support your industry
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
