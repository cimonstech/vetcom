import { Settings } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { serviceIconMap } from "@/lib/constants/icons";
import { serviceCategories } from "@/lib/constants/site";

export function ServiceIconsStrip() {
  return (
    <section className="border-b border-gray-100 bg-white py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {serviceCategories.map((service) => {
            const Icon = serviceIconMap[service.id] ?? Settings;
            return (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group flex flex-col items-center gap-2 text-center transition-colors"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-navy/5 text-navy transition-colors group-hover:bg-gold group-hover:text-navy">
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-medium leading-tight text-gray-600 group-hover:text-navy">
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
