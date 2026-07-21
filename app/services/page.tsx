import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Telecommunications infrastructure, ICT solutions, security, power, and regulatory services from VETCOM Communication.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive telecommunications, ICT, and engineering solutions tailored to your organization's needs."
        breadcrumbs={[{ label: "Services" }]}
      />
      <Container className="py-16">
        <p className="text-gray-600">All service categories — coming in Step 4.</p>
      </Container>
    </>
  );
}
