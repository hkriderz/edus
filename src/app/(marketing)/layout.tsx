import { GrainOverlay } from "@/components/brand/GrainOverlay";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { RevealFallback } from "@/components/motion/RevealFallback";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { marketingFontVariables } from "@/lib/fonts";

/**
 * Marketing chrome. Typefaces are attached here (not in the root layout) so demo
 * routes never download the marketing font files.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={marketingFontVariables}
      className="flex min-h-screen flex-col bg-surface font-sans text-ink"
    >
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <RevealFallback />
      <GrainOverlay />
      <SkipLink />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
