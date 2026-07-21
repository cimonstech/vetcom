import { ArrowRight, Eye, Target } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { about } from "@/lib/constants/site";

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
          <Image
            src={siteImages.aboutPreview}
            alt="VETCOM field engineer on site"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            About Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Connecting People. Powering Possibilities.
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">{about.intro}</p>
          <a
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy transition-colors hover:text-gold"
          >
            Learn more about us
            <ArrowRight className="size-4" />
          </a>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-gray-light p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-gold">
                <Eye className="size-4" />
              </span>
              <h3 className="mt-3 font-semibold text-navy">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-4">
                {about.vision}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-light p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-gold">
                <Target className="size-4" />
              </span>
              <h3 className="mt-3 font-semibold text-navy">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-4">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
