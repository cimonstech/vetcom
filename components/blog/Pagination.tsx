import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Query params to preserve across page links, excluding `page`. */
  searchParams: Record<string, string | undefined>;
}

function buildHref(page: number, searchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={buildHref(Math.max(1, currentPage - 1), searchParams)}
        aria-disabled={currentPage === 1}
        className={`flex size-9 items-center justify-center rounded-md border text-navy transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed border-gray-100 text-gray-300"
            : "border-gray-200 hover:border-gold hover:text-gold"
        }`}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page, searchParams)}
          className={`flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
            page === currentPage
              ? "border-gold bg-gold text-navy"
              : "border-gray-200 text-navy hover:border-gold hover:text-gold"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1), searchParams)}
        aria-disabled={currentPage === totalPages}
        className={`flex size-9 items-center justify-center rounded-md border text-navy transition-colors ${
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-100 text-gray-300"
            : "border-gray-200 hover:border-gold hover:text-gold"
        }`}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
