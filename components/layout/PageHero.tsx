import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HeroNetworkEffect } from "@/components/effects/HeroNetworkEffect";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { buildBreadcrumbSchema, withContext } from "@/lib/seo/structured-data";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  /** Full-bleed underlying hero image (path under /public). */
  image?: string;
}

export function PageHero({ title, description, breadcrumbs = [], image }: PageHeroProps) {
  const crumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    ...breadcrumbs.map((crumb) => ({
      name: crumb.label,
      path: crumb.href,
    })),
  ]);

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <JsonLd data={withContext(crumbSchema)} />
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
      <div className={`absolute inset-0 ${image ? "bg-navy/75" : ""}`} />
      <HeroNetworkEffect className="z-[1]" opacity={0.45} particleCount={55} />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-transparent to-transparent" />
      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        <HeroMotion>
          <nav aria-label="Breadcrumb" data-hero-item>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-300">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="flex items-center gap-1 transition-colors hover:text-gold">
                  <Home className="size-3.5" />
                  Home
                </Link>
              </li>
              {breadcrumbs.map(({ label, href }, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={label} className="flex items-center gap-1.5">
                    <ChevronRight className="size-3.5 text-gray-500" />
                    {href && !isLast ? (
                      <Link href={href} className="transition-colors hover:text-gold">
                        {label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined} className="text-gold">
                        {label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1
            data-hero-item
            className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          {description && (
            <p
              data-hero-item
              className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-200 sm:mt-4 sm:text-base lg:text-lg"
            >
              {description}
            </p>
          )}
        </HeroMotion>
      </Container>
    </section>
  );
}
