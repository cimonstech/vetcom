import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactTeaser } from "@/components/home/ContactTeaser";
import { CoreValuesSection } from "@/components/home/CoreValuesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesPreview } from "@/components/home/IndustriesPreview";
import { ServiceIconsStrip } from "@/components/home/ServiceIconsStrip";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceIconsStrip />
      <AboutPreview />
      <CoreValuesSection />
      <ServicesHighlight />
      <IndustriesPreview />
      <WhyChooseUsSection />
      <BlogPreview />
      <ContactTeaser />
    </>
  );
}
