import type { Metadata } from "next";
import Image from "next/image";
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
import { Reveal } from "@/components/motion/Reveal";
import { TiltMedia } from "@/components/motion/TiltMedia";
import { Container } from "@/components/ui/Container";
import { pageHeroImages, siteImages } from "@/lib/constants/images";
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
        image={pageHeroImages.about}
      />

      {/* Company profile */}
      <Reveal>
      <section className="section-wash py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="eyebrow text-sm font-semibold uppercase">
              Company Profile
            </p>
            <h2 className="text-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Who We Are
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <TiltMedia
            src={siteImages.vsat}
            alt="VSAT installation near a commercial building"
            className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-navy/10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Container>
      </section>
      </Reveal>

      {/* Vision & Mission */}
      <Reveal>
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
      </Reveal>

      {/* Core values */}
      <Reveal>
      <section id="values" className="relative overflow-hidden py-16 text-white sm:py-24">
        <Image
          src={siteImages.coreValues}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              What Drives Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition-colors hover:border-gold/50"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-gold text-navy">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-200">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      </Reveal>

      {/* Why choose us */}
      <Reveal>
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
      </Reveal>

      {/* Commitment */}
      <Reveal>
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
      </Reveal>
    </>
  );
}
