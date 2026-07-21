import { Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/constants/site";

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-sm text-white">
      <Container className="flex items-center justify-between gap-2 py-2">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden min-w-0 items-center gap-1.5 transition-colors hover:text-gold sm:flex"
          >
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{siteConfig.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.phones.office.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Phone className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">{siteConfig.phones.office}</span>
          </a>
        </div>

        <SocialIcons className="shrink-0" />
      </Container>
    </div>
  );
}
