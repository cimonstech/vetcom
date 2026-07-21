import { Settings } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories } from "@/lib/constants/site";

export function ServiceIconsStrip() {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-light/60 py-8 sm:py-10">
      <Container>
        <div className="grid grid-cols-2 gap-4 xs:gap-5 sm:grid-cols-4 sm:gap-6 lg:grid-cols-8">
          {serviceCategories.map((service) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group flex flex-col items-center gap-2 text-center transition-colors"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-navy/8 to-sky/10 text-navy transition-all group-hover:from-gold group-hover:to-gold-light group-hover:text-navy sm:size-14">
                  <Icon className="size-5 sm:size-6" />
                </span>
                <span className="line-clamp-2 text-[11px] font-medium leading-tight text-gray-600 group-hover:text-navy sm:text-xs">
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
