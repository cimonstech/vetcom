import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactTeaser } from "@/components/home/ContactTeaser";
import { CoreValuesSection } from "@/components/home/CoreValuesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesPreview } from "@/components/home/IndustriesPreview";
import { ServiceIconsStrip } from "@/components/home/ServiceIconsStrip";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUs";
import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <ServiceIconsStrip />
      </Reveal>
      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal>
        <CoreValuesSection />
      </Reveal>
      <Reveal>
        <ServicesHighlight />
      </Reveal>
      <Reveal>
        <IndustriesPreview />
      </Reveal>
      <Reveal>
        <WhyChooseUsSection />
      </Reveal>
      <Reveal>
        <BlogPreview />
      </Reveal>
      <Reveal>
        <ContactTeaser />
      </Reveal>
    </>
  );
}
