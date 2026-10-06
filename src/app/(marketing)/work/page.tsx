import { CallToAction } from "@/components/home/CallToAction";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { WorkCard } from "@/components/work/WorkCard";
import { caseStudies } from "@/content/work";
import { buildMetadata } from "@/lib/metadata";

const pagesShipped = caseStudies.reduce((total, study) => total + study.demoPages.length, 0);

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Six builds you can click through: five demonstration sites, each with its own typography, palette and voice, and the previous Near Me Web Designs studio site archived with placeholder contact details.",
  path: "/work/",
});

export default function WorkIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        title={
          <>
            Six complete builds.
            <br />
            Six separate identities.
          </>
        }
        lead="Most studio portfolios are screenshots. These are working sites you can navigate. Five were designed from their own typographic and colour systems. The sixth is the previous studio site, kept as an archive."
        meta={[
          { label: "Builds", value: String(caseStudies.length) },
          { label: "Pages shipped", value: String(pagesShipped) },
          { label: "Stock photos used", value: "0" },
          { label: "Templates used", value: "0" },
        ]}
      />

      <Section eyebrow="The builds" width="wide">
        {/* An honest framing, stated once and prominently rather than buried in
            the footer: these are demonstrations, not paid engagements. */}
        <div className="mb-14 border border-accent bg-accent-soft p-6 lg:p-8">
          <h2 className="eyebrow mb-3 !text-accent">About this portfolio</h2>
          <p className="max-w-[72ch] text-sm leading-relaxed">
            Five of the sites below are demonstration builds. Those businesses are invented, which
            means we can show you complete work in full detail instead of a blurred logo and a vague
            metric. The sixth is the previous studio site, Near Me Web Designs. Its contact name,
            email, and phone are placeholders.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2" data-reveal-group>
          {caseStudies.map((study, index) => (
            <WorkCard
              key={study.slug}
              study={study}
              index={index}
              className={
                caseStudies.length % 2 === 1 && index === caseStudies.length - 1
                  ? "lg:col-span-2"
                  : undefined
              }
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="Why six, and why so different" width="default" tone="sunken">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-title">A house style is a tell.</h2>
            <p className="mt-6 leading-relaxed text-ink-muted">
              When every site in a portfolio shares the same layout, the same typeface and the same
              hero crop, you are looking at a template with the colours swapped. Five of these were
              built to be obviously unrelated: a brutalist gym and an accessibility-first dental
              practice cannot be the same site wearing different paint. The sixth is the previous
              studio site, included so the rebrand has a before as well as an after.
            </p>
          </div>
          <div>
            <h2 className="text-title">Constraint drove each one.</h2>
            <p className="mt-6 leading-relaxed text-ink-muted">
              The gym needed legibility at arm&apos;s length. The dental practice needed to not
              frighten anxious patients. The roastery needed a cart that actually works without a
              server. In each case the brief dictated the design, and the case study walks through
              exactly how.
            </p>
          </div>
        </div>
      </Section>

      <CallToAction
        heading="Want one of these for your business?"
        body="Tell us which of the five demonstration builds feels closest to your world and we will tell you what a version for your business would cost and how long it would take."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work/" },
        ]}
      />
    </>
  );
}
