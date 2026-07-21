import { serviceCategories, siteConfig } from "@/lib/constants/site";

/**
 * llms.txt — concise machine-readable site summary for AI answer engines.
 * Spec-inspired convention (similar to robots.txt) for LLM discovery.
 */
export function GET() {
  const services = serviceCategories
    .map((category) => `- ${category.title}: ${siteConfig.url}/services#${category.id}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Contact

- Website: ${siteConfig.url}
- Email: ${siteConfig.email}
- Phone (office): ${siteConfig.phones.office}
- Location: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}
- Digital address: ${siteConfig.address.digitalAddress}

## Key pages

- Home: ${siteConfig.url}/
- About: ${siteConfig.url}/about
- Services: ${siteConfig.url}/services
- Industries: ${siteConfig.url}/industries
- Blog: ${siteConfig.url}/blog
- Contact: ${siteConfig.url}/contact

## Services

${services}

## Optional

- Sitemap: ${siteConfig.url}/sitemap.xml
- Robots: ${siteConfig.url}/robots.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
