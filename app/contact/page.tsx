import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with VETCOM Communication in Ogbojo, East Legon, Accra, Ghana.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Reach out for a consultation, quote, or support — we're ready to help connect your business."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <Container className="py-16">
        <p className="text-gray-600">Contact form and map — coming in Step 4.</p>
      </Container>
    </>
  );
}
