import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGlobalGraphSchema } from "@/lib/seo/structured-data";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildGlobalGraphSchema()} />
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
