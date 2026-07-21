import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { pageHeroImages } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with VETCOM Communication in Ogbojo, East Legon, Accra, Ghana.",
};

const mapQuery = encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Reach out for a consultation, quote, or support — we're ready to help connect your business."
        breadcrumbs={[{ label: "Contact" }]}
        image={pageHeroImages.contact}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy/5 text-navy">
                <MapPin className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-navy">Our Office</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.country}
                <br />
                Digital Address: {siteConfig.address.digitalAddress}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy/5 text-navy">
                <Phone className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-navy">Call Us</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                <a href={`tel:${siteConfig.phones.office.replace(/\s/g, "")}`} className="block hover:text-gold">
                  {siteConfig.phones.office}
                </a>
                {siteConfig.phones.mobile.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block hover:text-gold"
                  >
                    {phone}
                  </a>
                ))}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy/5 text-navy">
                <Mail className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-navy">Email Us</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy">Send Us a Message</h2>
              <p className="mt-2 text-gray-600">
                Fill out the form and our team will get back to you shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <iframe
                title="VETCOM Communication location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-full min-h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
