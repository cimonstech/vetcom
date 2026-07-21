import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "VETCOM Communication supports telecom, government, financial, healthcare, and other institutions across Ghana.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        description="From government institutions to SMEs, we deliver reliable communication solutions across diverse sectors."
        breadcrumbs={[{ label: "Industries" }]}
      />
      <Container className="py-16">
        <p className="text-gray-600">Industry listings — coming in Step 4.</p>
      </Container>
    </>
  );
}
