import { ArrowRight, Settings } from "lucide-react";
import Link from "next/link";

import { TiltMedia } from "@/components/motion/TiltMedia";
import { Container } from "@/components/ui/Container";
import { serviceImages } from "@/lib/constants/images";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories } from "@/lib/constants/site";

const highlighted = serviceCategories.slice(0, 6);

export function ServicesHighlight() {
  return (
    <section className="section-wash-muted py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-sm font-semibold uppercase">What We Do</p>
          <h2 className="text-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Core Services
          </h2>
          <p className="mt-4 text-gray-600">
            Comprehensive telecommunications, ICT, and engineering solutions built to
            international standards.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {highlighted.map((service) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            const image = serviceImages[service.id];
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                {image && (
                  <TiltMedia
                    src={image}
                    alt=""
                    className="relative aspect-[16/9] overflow-hidden rounded-none"
                    imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    maxTilt={6}
                  />
                )}
                <div className="p-5 sm:p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-navy-light text-gold transition-colors group-hover:from-gold group-hover:to-gold-light group-hover:text-navy">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {service.items.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:mt-10">
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
