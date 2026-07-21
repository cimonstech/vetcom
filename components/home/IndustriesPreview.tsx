import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { TiltMedia } from "@/components/motion/TiltMedia";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { industries } from "@/lib/constants/site";

export function IndustriesPreview() {
  return (
    <section className="section-wash py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <TiltMedia
            src={siteImages.industriesHero}
            alt="Connected city skyline and telecom infrastructure"
            className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-navy/10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div>
            <p className="eyebrow text-sm font-semibold uppercase">Who We Serve</p>
            <h2 className="text-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 text-gray-600">
              From telecom operators and government to healthcare, hospitality, and SMEs —
              we deliver reliable infrastructure across sectors that keep{" "}
              <span className="highlight-sky font-medium text-navy">Ghana connected</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industries.slice(0, 8).map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-sky/20 bg-sky/5 px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-gold hover:bg-gold/10"
                >
                  {industry}
                </span>
              ))}
            </div>

            <div className="mt-7 sm:mt-8">
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-gold"
              >
                See how we support your industry
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
