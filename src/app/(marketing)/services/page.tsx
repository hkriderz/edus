import Link from "next/link";
import { CallToAction } from "@/components/home/CallToAction";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingTable } from "@/components/pricing/PricingTable";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Web design and development, local SEO, e-commerce setup and guaranteed website care. Each service lists what is included, what is deliberately excluded, the starting price and a realistic timeline.",
  path: "/services/",
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Four services.
            <br />
            Honest boundaries on each.
          </>
        }
        lead="We would rather lose a job than take one we would do badly. Every service page states what is not included, so nothing is a surprise after you have signed."
        meta={[
          { label: "Services", value: "4" },
          { label: "From", value: "$650" },
          { label: "Fastest launch", value: "2 weeks" },
          { label: "Care plans", value: "2" },
        ]}
      />

      <Section eyebrow="The four" width="wide">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2" data-reveal-group>
          {services.map((service) => (
            <li key={service.slug} className="bg-surface">
              <Link
                href={`/services/${service.slug}/`}
                className="group flex h-full flex-col p-8 transition-colors hover:bg-surface-sunken lg:p-12"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.18em] text-ink-faint">
                    {service.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-base text-accent transition-transform duration-500 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </div>

                <h2 className="mt-9 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.025em] transition-colors group-hover:text-accent">
                  {service.name}
                </h2>

                <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-ink-muted">
                  {service.summary}
                </p>

                <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-7 font-mono text-[0.625rem] uppercase tracking-[0.14em]">
                  <div>
                    <dt className="text-ink-faint">Starting at</dt>
                    <dd className="mt-2 text-sm tracking-normal">{service.startingAt}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Timeline</dt>
                    <dd className="mt-2 text-sm tracking-normal">{service.timeline}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Packaged pricing" width="wide" tone="sunken">
        <SectionHeading
          title="Or take a whole package."
          lead="Most clients pick a tier rather than assembling services individually. Each tier bundles design, build, SEO foundations and launch support into one fixed number."
        />
        <PricingTable className="mt-16" />
      </Section>

      <Section eyebrow="What we do not do" width="default">
        <SectionHeading
          title="The referral list."
          lead="These are things clients ask for that we are not the right studio for. We keep a list of people who are, and we will make the introduction at no cost."
        />
        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {[
            {
              heading: "Full brand identity",
              body: "Logo systems, naming and brand guidelines. We design around an existing identity well; we do not pretend to be a brand studio.",
            },
            {
              heading: "Paid advertising",
              body: "Google Ads and Meta campaign management. Different discipline, different daily rhythm, and we would be learning on your budget.",
            },
            {
              heading: "Photography and video",
              body: "We will art-direct a shoot and tell you exactly what images the site needs, but we do not hold the camera.",
            },
            {
              heading: "Large custom applications",
              body: "Multi-tenant platforms, booking engines with complex business rules, anything needing a dedicated backend team.",
            },
          ].map((item) => (
            <li key={item.heading} className="bg-surface p-8 lg:p-10">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{item.heading}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ]}
      />
    </>
  );
}
