import Image from "next/image";

import { HeroNetworkEffect } from "@/components/effects/HeroNetworkEffect";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { homeStats, siteConfig } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <Image
        src={siteImages.homeHero}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/65" />
      <HeroNetworkEffect className="z-[1]" opacity={0.4} particleCount={65} />

      <Container className="relative z-10 py-24 sm:py-32">
        <HeroMotion className="max-w-2xl">
          <p data-hero-item className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
            {siteConfig.name}
          </p>
          <h1
            data-hero-item
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {siteConfig.tagline}
          </h1>
          <p data-hero-item className="mt-6 text-lg leading-relaxed text-gray-100">
            {siteConfig.description}
          </p>
          <div data-hero-item className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
            <Button href="/services" variant="outline">
              Our Services
            </Button>
          </div>

          <dl
            data-hero-item
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
          >
            {homeStats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-2xl font-bold text-gold sm:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-xs text-gray-200 sm:text-sm">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </HeroMotion>
      </Container>
    </section>
  );
}
