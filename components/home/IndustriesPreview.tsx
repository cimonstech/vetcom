import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { industries } from "@/lib/constants/site";

export function IndustriesPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={siteImages.industriesHero}
              alt="Connected city skyline and telecom infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Who We Serve
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 text-gray-600">
              From telecom operators and government to healthcare, hospitality, and SMEs —
              we deliver reliable infrastructure across sectors that keep Ghana connected.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industries.slice(0, 8).map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-navy"
                >
                  {industry}
                </span>
              ))}
            </div>

            <div className="mt-8">
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
