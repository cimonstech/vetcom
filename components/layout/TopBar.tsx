import { Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/constants/site";

export function TopBar() {
  return (
    <div className="bg-navy text-white text-sm">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{siteConfig.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.phones.office.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Phone className="size-3.5 shrink-0" />
            <span>{siteConfig.phones.office}</span>
          </a>
        </div>

        <SocialIcons />
      </Container>
    </div>
  );
}
