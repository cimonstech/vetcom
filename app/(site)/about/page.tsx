import type { Metadata } from "next";
import {
  Award,
  CircleCheck,
  Eye,
  Handshake,
  Lightbulb,
  Quote,
  ShieldCheck,
  Target,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { about, coreValues, siteConfig, whyChooseUs } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our vision, mission, and commitment to telecommunications and ICT excellence in Ghana.`,
};

const valueIcons: LucideIcon[] = [ShieldCheck, Award, Lightbulb, Wrench, Users, Handshake];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About VETCOM Communication"
        description="A Ghanaian-owned telecommunications, ICT, and engineering solutions company connecting people and powering possibilities."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Company profile */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Company Profile
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Who We Are
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-light py-16 sm:py-24">
        <Container className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-lg bg-navy text-gold">
              <Eye className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-navy">Our Vision</h3>
            <p className="mt-3 leading-relaxed text-gray-600">{about.vision}</p>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-lg bg-navy text-gold">
              <Target className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-navy">Our Mission</h3>
            <p className="mt-3 leading-relaxed text-gray-600">{about.mission}</p>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section id="values" className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              What Drives Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-gray-200 p-6 transition-colors hover:border-gold/50"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section id="why-us" className="bg-navy py-16 text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Why VETCOM
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose VETCOM Communication?
            </h2>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-lg bg-white/5 p-4">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold" />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Commitment */}
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl text-center">
          <Quote className="mx-auto size-8 text-gold" />
          <p className="mt-6 text-xl font-medium leading-relaxed text-navy sm:text-2xl">
            {about.commitment}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
            {siteConfig.name}
          </p>
          <p className="text-sm text-gray-500">{siteConfig.tagline}</p>
        </Container>
      </section>
    </>
  );
}
