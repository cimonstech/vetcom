import { ArrowRight, Settings } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories } from "@/lib/constants/site";

const highlighted = serviceCategories.slice(0, 6);

export function ServicesHighlight() {
  return (
    <section className="bg-gray-light py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Our Core Services
          </h2>
          <p className="mt-4 text-gray-600">
            Comprehensive telecommunications, ICT, and engineering solutions built to
            international standards.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((service) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-gold group-hover:text-navy">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {service.items.slice(0, 3).join(" · ")}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-gold"
          >
            View all services
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
