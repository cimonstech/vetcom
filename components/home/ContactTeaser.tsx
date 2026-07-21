import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteImages } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";

export function ContactTeaser() {
  return (
    <section className="relative overflow-hidden py-14 text-white sm:py-16 lg:py-20">
      <Image
        src={siteImages.contactTeaser}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky/30 via-navy/40 to-gold/25" />

      <Container className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Need a <span className="text-gradient-gold">Consultation?</span>
          </h2>
          <p className="mt-2 max-w-xl text-gray-100">
            Reach out and our team will help design the right telecommunications and ICT
            solution for you.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-100 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2 lg:justify-start">
            <span className="flex items-center justify-center gap-2 lg:justify-start">
              <MapPin className="size-4 shrink-0 text-gold" />
              <span className="text-left">
                {siteConfig.address.street}, {siteConfig.address.city}
              </span>
            </span>
            <span className="flex items-center justify-center gap-2 lg:justify-start">
              <Phone className="size-4 shrink-0 text-gold" />
              {siteConfig.phones.office}
            </span>
            <span className="flex items-center justify-center gap-2 break-all lg:justify-start">
              <Mail className="size-4 shrink-0 text-gold" />
              {siteConfig.email}
            </span>
          </div>
        </div>

        <Button href="/contact" variant="primary" className="w-full shrink-0 sm:w-auto">
          Get in Touch
        </Button>
      </Container>
    </section>
  );
}
