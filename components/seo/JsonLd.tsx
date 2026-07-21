/**
 * Server-rendered JSON-LD. Data is developer-controlled (site constants / CMS fields),
 * never raw user HTML — safe to stringify into a script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
