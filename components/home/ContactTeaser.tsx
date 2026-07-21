import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/constants/site";

export function ContactTeaser() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold sm:text-3xl">Need a Consultation?</h2>
          <p className="mt-2 max-w-xl text-gray-300">
            Reach out and our team will help design the right telecommunications and ICT
            solution for you.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-300 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center justify-center gap-2 lg:justify-start">
              <MapPin className="size-4 shrink-0 text-gold" />
              {siteConfig.address.street}, {siteConfig.address.city}
            </span>
            <span className="flex items-center justify-center gap-2 lg:justify-start">
              <Phone className="size-4 shrink-0 text-gold" />
              {siteConfig.phones.office}
            </span>
            <span className="flex items-center justify-center gap-2 lg:justify-start">
              <Mail className="size-4 shrink-0 text-gold" />
              {siteConfig.email}
            </span>
          </div>
        </div>

        <Button href="/contact" variant="primary" className="shrink-0">
          Get in Touch
        </Button>
      </Container>
    </section>
  );
}
