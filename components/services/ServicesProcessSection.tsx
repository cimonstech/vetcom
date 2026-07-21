"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { siteImages } from "@/lib/constants/images";

const steps = [
  {
    id: "survey",
    label: "Survey",
    title: "Understand Your Requirements",
    body: "We begin with site surveys, stakeholder interviews, and a clear assessment of your connectivity, security, and power needs so every solution is grounded in real conditions on the ground.",
  },
  {
    id: "design",
    label: "Design",
    title: "Engineer the Right Solution",
    body: "Our engineers design networks, cabling, security, and power systems to international standards — balancing performance, compliance, and cost-effectiveness for your environment.",
  },
  {
    id: "deploy",
    label: "Deploy",
    title: "Install, Commission & Support",
    body: "From installation through commissioning and handover, we deliver reliable workmanship and stay with you through after-sales support and long-term partnerships.",
  },
] as const;

export function ServicesProcessSection() {
  const [active, setActive] = useState<(typeof steps)[number]["id"]>("survey");
  const current = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            We Organize Our Delivery Process
          </h2>

          <div className="mt-8 flex flex-wrap gap-2">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(step.id)}
                className={`rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active === step.id
                    ? "bg-gold text-navy"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          <h3 className="mt-8 text-xl font-semibold text-gold">{current.title}</h3>
          <p className="mt-3 leading-relaxed text-gray-200">{current.body}</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex font-semibold text-gold transition-colors hover:text-gold-light"
          >
            Learn more →
          </Link>
        </div>
      </div>

      <div className="relative min-h-[320px] lg:min-h-full">
        <Image
          src={siteImages.fieldWork}
          alt="VETCOM team delivering on-site solutions"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-navy/40" />
      </div>
    </section>
  );
}
