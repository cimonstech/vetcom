import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our vision, mission, and commitment to telecommunications and ICT excellence in Ghana.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About VETCOM Communication"
        description="A Ghanaian-owned telecommunications, ICT, and engineering solutions company connecting people and powering possibilities."
        breadcrumbs={[{ label: "About" }]}
      />
      <Container className="py-16">
        <p className="text-gray-600">Full company profile — coming in Step 4.</p>
      </Container>
    </>
  );
}
