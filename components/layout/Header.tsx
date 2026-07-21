"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { navLinks, siteConfig } from "@/lib/constants/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src={siteImages.logoOnLight}
            alt={siteConfig.name}
            width={200}
            height={56}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-navy hover:text-gold"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <nav
          className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy/5 text-gold"
                      : "text-navy hover:bg-gray-50 hover:text-gold"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <div className="mt-3 px-3">
              <Button href="/contact" variant="primary" className="w-full">
                Get a Quote
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
