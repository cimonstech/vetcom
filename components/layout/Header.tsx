"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { navLinks, siteConfig } from "@/lib/constants/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container className="flex items-center justify-between !px-3 py-1.5 sm:!px-6 sm:py-2.5 lg:!px-8 lg:py-3">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src={siteImages.logoOnLight}
            alt={siteConfig.name}
            width={320}
            height={90}
            priority
            className="h-14 w-auto sm:h-14 md:h-16"
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
                  isActive ? "text-gold" : "text-navy hover:text-gold"
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
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </Container>

      {/* Mobile drawer — full height, slides in from the right */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 right-0 flex h-dvh w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5 sm:px-4 sm:py-3">
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <Image
                src={siteImages.logoOnLight}
                alt={siteConfig.name}
                width={280}
                height={80}
                className="h-12 w-auto"
              />
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-navy hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
            {navLinks.map(({ label, href }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-navy/5 text-gold"
                      : "text-navy hover:bg-gray-50 hover:text-gold"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 px-4 py-4">
            <Button href="/contact" variant="primary" className="w-full" onClick={() => setMobileOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
