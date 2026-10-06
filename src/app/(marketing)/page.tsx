import Link from "next/link";
import { CallToAction } from "@/components/home/CallToAction";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { StudioPromises } from "@/components/home/Promises";
import { ServicesList } from "@/components/home/ServicesList";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingTable } from "@/components/pricing/PricingTable";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkCard } from "@/components/work/WorkCard";
import { faqs } from "@/content/faq";
import { caseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Exceptional Designs for Us",
  description:
    `A community-focused web design studio delivering studio-quality websites at published, affordable prices with support guaranteed in writing. Explore ${caseStudies.length} complete builds.`,
  path: "/",
});

const homeFaqs = faqs.slice(0, 5);

const verticals = [
  "Restaurants",
  "Dental & medical",
  "Gyms & studios",
  "Retail & e-commerce",
  "Trades & services",
  "Nonprofits",
  "Salons & barbers",
  "Cafés & roasters",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee items={verticals} />

      <StudioPromises />

      {/* Work preview — the portfolio is the argument, so it sits high on the page. */}
      <Section eyebrow="02 — Selected work" width="wide" tone="sunken">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title={
              <>
                Six builds.
                <br />
                Six identities.
              </>
            }
            lead="Each of these is a complete, navigable site with its own typeface pairing, palette and tone of voice. Open one and click around — they are not mockups."
            className="lg:max-w-2xl"
          />
          <ButtonLink href="/work/" variant="outline" className="shrink-0">
            All {caseStudies.length} case studies
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2" data-reveal-group>
          {caseStudies.map((study, index) => (
            <WorkCard
              key={study.slug}
              study={study}
              index={index}
              // The final card spans the full width so the grid never ends ragged.
              className={
                caseStudies.length % 2 === 1 && index === caseStudies.length - 1
                  ? "lg:col-span-2"
                  : undefined
              }
            />
          ))}
        </div>
      </Section>

      <ServicesList />

      <Section eyebrow="04 — Pricing" width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title={
              <>
                The price is on the
                <br />
                website. Obviously.
              </>
            }
            lead="You should not have to book a call to find out whether you can afford a website. Quotes are fixed, and re-quoted in writing if scope genuinely changes."
            className="lg:max-w-2xl"
          />
          <ButtonLink href="/pricing/" variant="outline" className="shrink-0">
            Full pricing &amp; care plans
          </ButtonLink>
        </div>

        <PricingTable className="mt-16" />
      </Section>

      <Process />

      <Testimonials />

      <Section eyebrow="07 — Questions" width="default" tone="sunken">
        <SectionHeading title="The things people ask before they commit." />
        <Accordion items={homeFaqs} className="mt-14" />
        <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          More answers on the{" "}
          <Link href="/about/#faq" className="link-underline text-accent">
            about page
          </Link>
          .
        </p>
      </Section>

      <CallToAction />

      <FaqJsonLd items={homeFaqs} />
    </>
  );
}
