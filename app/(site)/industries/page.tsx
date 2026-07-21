import type { Metadata } from "next";
import { Building2 } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageHeroImages } from "@/lib/constants/images";
import { industryIconMap } from "@/lib/constants/icons";
import { industries } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "VETCOM Communication supports telecom, government, financial, healthcare, and other institutions across Ghana.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        description="From government institutions to SMEs, we deliver reliable communication solutions across diverse sectors."
        breadcrumbs={[{ label: "Industries" }]}
        image={pageHeroImages.industries}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industryIconMap[industry] ?? Building2;
              return (
                <div
                  key={industry}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-5 transition-colors hover:border-gold/50"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-medium text-navy">{industry}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-14 text-white">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Don&apos;t see your industry listed?</h2>
            <p className="mt-2 text-gray-300">
              We tailor solutions for any organization that needs reliable connectivity.
            </p>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            Get in Touch
          </Button>
        </Container>
      </section>
    </>
  );
}
