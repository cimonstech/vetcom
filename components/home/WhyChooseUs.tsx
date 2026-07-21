import { CircleCheck } from "lucide-react";

import { TiltMedia } from "@/components/motion/TiltMedia";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { whyChooseUs } from "@/lib/constants/site";

const featured = whyChooseUs.slice(0, 6);

export function WhyChooseUsSection() {
  return (
    <section className="section-wash-muted py-14 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <TiltMedia
          src={siteImages.whyChooseUs}
          alt="Telecommunications mast installed by VETCOM"
          className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-navy/10"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div>
          <p className="eyebrow text-sm font-semibold uppercase">Why VETCOM</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">Why Choose</span>{" "}
            <span className="highlight-gold">VETCOM Communication?</span>
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            We believe communication is the foundation of growth — delivering dependable
            solutions that empower businesses and connect communities.
          </p>

          <ul className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2">
            {featured.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-gold/10 bg-white p-3.5 shadow-sm sm:p-4"
              >
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 sm:mt-8">
            <Button href="/contact" variant="secondary">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
