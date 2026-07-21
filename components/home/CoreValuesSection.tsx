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
    <section className="relative overflow-hidden py-14 text-white sm:py-20 lg:py-24">
      <Image
        src={siteImages.coreValues}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-gold/20" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            What Drives Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Our <span className="text-gradient-gold">Core Values</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {coreValues.map((value, index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <div
                key={value.title}
                className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-colors hover:border-gold/50 sm:p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-light text-navy">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-200">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
