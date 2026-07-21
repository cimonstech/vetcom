import type { Metadata } from "next";
import { CircleCheck, Settings } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Telecommunications infrastructure, ICT solutions, security, power, and regulatory services from VETCOM Communication.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive telecommunications, ICT, and engineering solutions tailored to your organization's needs."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="space-y-16">
          {serviceCategories.map((service, index) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className="grid scroll-mt-24 gap-8 border-b border-gray-100 pb-16 last:border-none last:pb-0 lg:grid-cols-[1fr_2fr] lg:items-start"
              >
                <div className={isEven ? "lg:order-2" : ""}>
                  <span className="flex size-14 items-center justify-center rounded-xl bg-navy text-gold">
                    <Icon className="size-7" />
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
                    {service.title}
                  </h2>
                </div>

                <div className={isEven ? "lg:order-1" : ""}>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="bg-navy py-14 text-white">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Not sure which service fits your needs?</h2>
            <p className="mt-2 text-gray-300">
              Talk to our team — we&apos;ll help design the right solution for you.
            </p>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            Get a Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
