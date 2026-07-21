import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { navLinks, siteConfig } from "@/lib/constants/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt={siteConfig.name}
                width={180}
                height={44}
                className="mb-4 h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              {siteConfig.tagline}
            </p>
            <SocialIcons className="mt-4" iconClassName="size-4" />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-300 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.country}
                  <br />
                  Digital Address: {siteConfig.address.digitalAddress}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" />
                <div>
                  <a href={`tel:${siteConfig.phones.office.replace(/\s/g, "")}`} className="hover:text-gold">
                    {siteConfig.phones.office}
                  </a>
                  {siteConfig.phones.mobile.map((phone) => (
                    <span key={phone} className="block">
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold">
                        {phone}
                      </a>
                    </span>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Services teaser */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services#telecom-infrastructure" className="hover:text-gold">
                  Telecom Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/services#ict-solutions" className="hover:text-gold">
                  ICT Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#security-solutions" className="hover:text-gold">
                  Security Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-medium text-gold hover:text-gold-light">
                  View all services →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
