import { siteImages } from "@/lib/constants/images";
import { siteConfig, serviceCategories } from "@/lib/constants/site";

type JsonLdObject = Record<string, unknown>;

const baseUrl = siteConfig.url;
const logoUrl = `${baseUrl}${siteImages.logoOnLight}`;

function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip spaces from phone for schema.org telephone fields. */
function schemaPhone(phone: string): string {
  return phone.replace(/\s+/g, "-");
}

export function buildOrganizationSchema(): JsonLdObject {
  return {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: siteConfig.name,
    url: baseUrl,
    logo: logoUrl,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: schemaPhone(siteConfig.phones.office),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: schemaPhone(siteConfig.phones.office),
        email: siteConfig.email,
        areaServed: "GH",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: schemaPhone(siteConfig.phones.mobile[0]),
        url: `${baseUrl}/contact`,
        areaServed: "GH",
        availableLanguage: ["English"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Telecommunications & ICT Services",
      itemListElement: serviceCategories.map((category) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: category.title,
          url: `${baseUrl}/services#${category.id}`,
        },
      })),
    },
  };
}

export function buildWebSiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${baseUrl}/#organization` },
  };
}

/**
 * Physical office in Accra — ProfessionalService extends LocalBusiness.
 * Suitable for a telecom/ICT engineering firm with a premises.
 */
export function buildLocalBusinessSchema(): JsonLdObject {
  return {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localbusiness`,
    name: siteConfig.name,
    image: logoUrl,
    url: baseUrl,
    telephone: schemaPhone(siteConfig.phones.office),
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.digitalAddress}`,
      addressLocality: siteConfig.address.city,
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    priceRange: "$$",
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
    ],
    parentOrganization: { "@id": `${baseUrl}/#organization` },
  };
}

export function buildBreadcrumbSchema(
  crumbs: { name: string; path?: string }[]
): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => {
      const isLast = index === crumbs.length - 1;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        ...(crumb.path && !isLast ? { item: absoluteUrl(crumb.path) } : {}),
      };
    }),
  };
}

export function buildBlogPostingSchema(post: {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  updated_at: string;
}): JsonLdObject {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const images = post.featured_image ? [post.featured_image] : [logoUrl];

  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? siteConfig.description,
    image: images,
    datePublished: post.published_at ?? post.updated_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    url,
  };
}

/** Global schemas for every public page (single @graph block). */
export function buildGlobalGraphSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationSchema(), buildWebSiteSchema(), buildLocalBusinessSchema()],
  };
}

/** Wrap page-specific schema(s) with @context. */
export function withContext(schema: JsonLdObject | JsonLdObject[]): JsonLdObject {
  if (Array.isArray(schema)) {
    return {
      "@context": "https://schema.org",
      "@graph": schema,
    };
  }
  return {
    "@context": "https://schema.org",
    ...schema,
  };
}
