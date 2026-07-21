import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeStats, siteConfig } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 via-transparent to-transparent" />
      <Container className="relative py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
            {siteConfig.name}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Get a Quote
            </Button>
            <Button href="/services" variant="outline">
              Our Services
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {homeStats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-2xl font-bold text-gold sm:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-xs text-gray-400 sm:text-sm">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
