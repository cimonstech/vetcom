import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whyChooseUs } from "@/lib/constants/site";

const featured = whyChooseUs.slice(0, 6);

export function WhyChooseUsSection() {
  return (
    <section className="bg-gray-light py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Why VETCOM
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Why Choose VETCOM Communication?
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            We believe communication is the foundation of growth — delivering dependable
            solutions that empower businesses and connect communities.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Talk to an Expert
            </Button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {featured.map((item) => (
            <li key={item} className="flex items-start gap-2.5 rounded-lg bg-white p-4 shadow-sm">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="text-sm font-medium text-navy">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
