import type { Metadata } from "next";
import { CircleCheck, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesProcessSection } from "@/components/services/ServicesProcessSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageHeroImages, serviceImages, siteImages } from "@/lib/constants/images";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories, whyChooseUs } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Telecommunications infrastructure, ICT solutions, security, power, and regulatory services from VETCOM Communication.",
};

const featuredServices = serviceCategories.slice(0, 4);
const highlightServices = serviceCategories.slice(4, 7);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive telecommunications, ICT, and engineering solutions tailored to your organization's needs."
        breadcrumbs={[{ label: "Services" }]}
        image={pageHeroImages.services}
      />

      {/* Intro — image + numbered featured services */}
      <Reveal>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[5/6]">
              <Image
                src={siteImages.telecom}
                alt="Telecommunications infrastructure by VETCOM"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-xl bg-navy p-5 text-white shadow-lg sm:block lg:-right-8">
              <p className="text-3xl font-bold text-gold">{serviceCategories.length}+</p>
              <p className="mt-1 text-sm text-gray-300">Service categories delivered across Ghana</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Our Best Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              We Provide Reliable Telecom &amp; ICT Solutions
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              From fibre networks and data centres to security, power, and NCA compliance —
              VETCOM designs, installs, and supports systems that keep your organization
              connected.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {featuredServices.map((service, index) => {
                const Icon = serviceIconMap[service.id] ?? Settings;
                return (
                  <Link
                    key={service.id}
                    href={`#${service.id}`}
                    className="group rounded-xl border border-gray-100 bg-gray-light p-5 transition-colors hover:border-gold/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-gold">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-2xl font-bold text-gold/40 group-hover:text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold text-navy group-hover:text-gold">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {service.items.slice(0, 2).join(" · ")}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
      </Reveal>

      {/* Mid highlights — three horizontal feature cards */}
      <Reveal>
      <section className="border-y border-gray-100 bg-white py-10">
        <Container className="grid gap-6 md:grid-cols-3">
          {highlightServices.map((service, index) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            const image = serviceImages[service.id];
            return (
              <Link
                key={service.id}
                href={`#${service.id}`}
                className="group flex gap-4 rounded-xl border border-gray-100 p-5 transition-all hover:border-gold/40 hover:shadow-sm"
              >
                <span className="text-3xl font-bold text-gold/30 group-hover:text-gold">
                  {String(index + 5).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    {image ? (
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={image} alt="" fill className="object-cover" sizes="48px" />
                      </span>
                    ) : (
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                        <Icon className="size-5" />
                      </span>
                    )}
                    <h3 className="font-semibold text-navy group-hover:text-gold">{service.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{service.items.slice(0, 2).join(" · ")}</p>
                </div>
              </Link>
            );
          })}
        </Container>
      </section>
      </Reveal>

      <Reveal>
        <ServicesProcessSection />
      </Reveal>

      {/* Full service catalogue */}
      <Reveal>
      <section className="bg-gray-light py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Full Catalogue
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Everything We Deliver
            </h2>
          </div>

          <div className="mt-12 space-y-14">
            {serviceCategories.map((service, index) => {
              const Icon = serviceIconMap[service.id] ?? Settings;
              const image = serviceImages[service.id];
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="grid scroll-mt-24 gap-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:items-center"
                >
                  <div className={isEven ? "lg:order-2" : ""}>
                    {image && (
                      <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-navy">{service.title}</h3>
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
          </div>
        </Container>
      </section>
      </Reveal>

      {/* Trust / why choose us — no pricing */}
      <Reveal>
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Why Clients Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Trusted for Quality Delivery Across Ghana
            </h2>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {whyChooseUs.slice(0, 6).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-light p-5"
              >
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      </Reveal>

      <Reveal>
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
      </Reveal>
    </>
  );
}
