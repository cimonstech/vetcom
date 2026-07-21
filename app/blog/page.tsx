import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, insights, and updates from VETCOM Communication.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        description="Insights, news, and updates on telecommunications and ICT solutions in Ghana."
        breadcrumbs={[{ label: "Blog" }]}
      />
      <Container className="py-16">
        <p className="text-gray-600">Blog listing with sidebar — coming in Step 5.</p>
      </Container>
    </>
  );
}
