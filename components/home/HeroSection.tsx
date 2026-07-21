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
      <div className="absolute inset-0 bg-gradient-to-br from-sky/25 via-transparent to-gold/20" />
      <HeroNetworkEffect className="z-[1]" opacity={0.4} particleCount={65} />

      <Container className="relative z-10 py-16 sm:py-24 lg:py-32">
        <HeroMotion className="max-w-2xl">
          <h1
            data-hero-item
            className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-white">Connecting People.</span>
            <br />
            <span className="text-gradient-gold">Powering Possibilities.</span>
          </h1>
          <p data-hero-item className="mt-5 text-[15px] leading-relaxed text-gray-100 sm:mt-6 sm:text-lg">
            {siteConfig.description}
          </p>
          <div data-hero-item className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
            <Button href="/services" variant="outline">
              Our Services
            </Button>
          </div>

          <dl
            data-hero-item
            className="mt-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-6 sm:mt-12 sm:gap-6 sm:pt-8"
          >
            {homeStats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-xl font-bold text-gold sm:text-2xl lg:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-[10px] leading-snug text-gray-200 sm:text-xs lg:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </HeroMotion>
      </Container>
    </section>
  );
}
