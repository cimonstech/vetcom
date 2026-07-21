import { ArrowRight, Eye, Target } from "lucide-react";
import Link from "next/link";

import { TiltMedia } from "@/components/motion/TiltMedia";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { about } from "@/lib/constants/site";

export function AboutPreview() {
  return (
    <section className="section-wash py-14 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <TiltMedia
          src={siteImages.aboutPreview}
          alt="VETCOM field engineer on site"
          className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-navy/10 lg:order-2"
          sizes="(max-width: 1024px) 100vw, 50vw"
          maxTilt={9}
        />

        <div className="lg:order-1">
          <p className="eyebrow text-sm font-semibold uppercase">About Us</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">Connecting People.</span>{" "}
            <span className="text-gradient-gold">Powering Possibilities.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-gray-600 sm:mt-6">{about.intro}</p>
          <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy transition-colors hover:text-gold sm:mt-6"
          >
            Learn more about us
            <ArrowRight className="size-4" />
          </Link>

          <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2">
            <div className="rounded-xl border border-gold/15 bg-gradient-to-br from-gray-light to-white p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-gold">
                <Eye className="size-4" />
              </span>
              <h3 className="mt-3 font-semibold text-navy">Our Vision</h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-gray-600">
                {about.vision}
              </p>
            </div>
            <div className="rounded-xl border border-sky/15 bg-gradient-to-br from-white to-sky/5 p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-sky-light">
                <Target className="size-4" />
              </span>
              <h3 className="mt-3 font-semibold text-navy">Our Mission</h3>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-gray-600">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
