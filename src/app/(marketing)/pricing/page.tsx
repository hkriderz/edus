import { CallToAction } from "@/components/home/CallToAction";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingTable } from "@/components/pricing/PricingTable";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/content/faq";
import { carePlans, paymentTerms, pricingTiers } from "@/content/pricing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Published, fixed-price website packages from $1,200, plus care plans with response times guaranteed in writing. No discovery call required to learn the budget.",
  path: "/pricing/",
});

const pricingFaqs = faqs.filter((faq) =>
  ["Why are your prices lower than other studios?", "What does 'guaranteed support' actually mean?", "Do I own the website when you are finished?", "How long does a project take?"].includes(
    faq.question,
  ),
);

export default function PricingPage() {
  const cheapest = pricingTiers[0]?.price ?? "";

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        title={
          <>
            Our prices are on
            <br />
            our website.
          </>
        }
        lead="Which sounds like a low bar, and is. You should be able to tell in thirty seconds whether a studio is in your budget, without surrendering your email address first."
        meta={[
          { label: "From", value: cheapest },
          { label: "Payment", value: "3 milestones" },
          { label: "Care plans", value: `From ${carePlans[0]?.price ?? ""}` },
          { label: "Hidden fees", value: "None" },
        ]}
      />

      <Section eyebrow="Build packages" width="wide">
        <SectionHeading
          title="Three packages, all of them complete."
          lead="Every tier is a finished, launched site. The difference is scope, not quality — there is no version of this where we hand over something half-built and sell you the rest later."
        />

        <div className="mt-16">
          <PricingTable />
        </div>

        <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-ink-muted">
          Every tier includes hosting setup, a domain and SSL configuration, analytics, a training
          session and a written handover. Hosting itself typically runs $5&ndash;$20 per month paid
          directly to the provider in your own account &mdash; we do not mark it up or resell it.
        </p>
      </Section>

      <Section eyebrow="Care plans" width="wide" tone="sunken">
        <SectionHeading
          title={
            <>
              Support with a number
              <br />
              attached to it.
            </>
          }
          lead="Optional, cancellable any time, and the response time is a contractual commitment rather than an aspiration. Miss it and the month is free."
        />

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-2" data-reveal-group>
          {carePlans.map((plan) => (
            <article key={plan.id} className="flex flex-col bg-surface p-8 lg:p-12">
              <div className="flex items-baseline justify-between gap-5">
                <h3 className="font-display text-3xl font-medium tracking-[-0.025em]">
                  {plan.name}
                </h3>
                <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-accent">
                  {plan.price}
                </p>
              </div>

              <p className="mt-7 border-y border-line py-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                <span className="text-ink-faint">Guaranteed first response</span>
                <br />
                <span className="mt-2 inline-block text-sm tracking-normal">
                  {plan.firstResponse}
                </span>
              </p>

              <ul className="mt-7 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                      &#43;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How payment works" width="wide">
        <SectionHeading title="No surprises on the invoice." />
        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-3">
          {paymentTerms.map((term) => (
            <div key={term.heading} className="bg-surface p-8 lg:p-10">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">
                {term.heading}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">{term.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Questions about money" width="default" tone="sunken">
        <SectionHeading title="The awkward questions, answered." />
        <Accordion items={pricingFaqs} className="mt-14" />
      </Section>

      <CallToAction
        heading="Not sure which tier fits?"
        body="Describe your business in a paragraph and we will tell you which tier is right — including when the answer is the cheapest one."
      />

      <FaqJsonLd items={pricingFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing/" },
        ]}
      />
    </>
  );
}
