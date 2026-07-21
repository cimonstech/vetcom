"use client";

import { FileText, Image as ImageIcon, LayoutDashboard, Mail, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Categories & Tags", href: "/admin/taxonomy", icon: Tags },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-gold text-navy" : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
