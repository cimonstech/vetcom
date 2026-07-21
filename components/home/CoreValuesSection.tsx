import {
  Award,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { coreValues } from "@/lib/constants/site";

const valueIcons: LucideIcon[] = [ShieldCheck, Award, Lightbulb, Wrench, Users, Handshake];

export function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-24">
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
  );
}
