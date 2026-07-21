import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHero({ title, description, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-transparent to-transparent" />
      <Container className="relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-gray-300">
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

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
