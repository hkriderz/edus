import { CallToAction } from "@/components/home/CallToAction";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig, siteLocation, isPlaceholder } from "@/config/site";
import { faqs } from "@/content/faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "EDUS Media is a community-focused web studio. EDUS stands for Exceptional Designs for Us — published pricing, written support guarantees and client-owned code.",
  path: "/about/",
});

const principles = [
  {
    heading: "The price goes on the website",
    body: "Hiding pricing behind a form is a tactic for extracting a budget before quoting against it. We publish numbers so you can disqualify us in thirty seconds if we are too expensive.",
  },
  {
    heading: "Guarantees must cost us something",
    body: "Our response times are contractual, and missing one means that month is free. A promise with no penalty is marketing copy.",
  },
  {
    heading: "You hold every credential",
    body: "Domain, hosting, analytics, repository — all in your name from day one. Some studios treat access as retention leverage. We would rather you stay because the work is good.",
  },
  {
    heading: "Scope down, not up",
    body: "When a budget does not reach the brief, the honest move is to cut scope, not to upsell financing. Sometimes the right recommendation is three days of fixes instead of a rebuild.",
  },
  {
    heading: "Say what we are bad at",
    body: "We do not do brand identity, paid media, photography or large custom applications. Naming the boundary early saves everyone a disappointing month.",
  },
  {
    heading: "Build it to outlast us",
    body: "Standard HTML, CSS and a mainstream framework. No proprietary builder, no plugin tower, nothing that needs us specifically to keep working in five years.",
  },
] as const;

export default function AboutPage() {
  const hasLocation = !isPlaceholder(siteConfig.address.city);

  return (
    <>
      <PageHeader
        eyebrow="About"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            Exceptional Designs
            <br />
            for <span className="text-accent">Us</span>.
          </>
        }
        lead="The 'us' is deliberate. This studio exists for the businesses on the same street as it — the ones a traditional agency prices out before the first meeting."
        meta={[
          { label: "Founded", value: String(siteConfig.foundedYear) },
          { label: "Studio size", value: "Small by design" },
          { label: "Based", value: hasLocation ? siteLocation : "Remote" },
          { label: "Works remotely", value: "Yes" },
        ]}
      />

      <Section eyebrow="The name" width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-title lg:col-span-5">
            Most studio names are about the studio.
          </h2>
          <div className="space-y-6 lg:col-span-7">
            <p className="text-lead leading-relaxed text-ink-muted">
              The studio is EDUS Media. EDUS stands for Exceptional Designs for Us. Not &ldquo;for
              you&rdquo; &mdash; the
              preposition matters. A web studio that depends on local businesses doing well is a
              participant in the same economy, not a vendor selling into it.
            </p>
            <p className="leading-relaxed text-ink-muted">
              In practice that shapes unglamorous decisions. It is why pricing is published rather
              than quoted. It is why we will tell a client that their existing site needs three days
              of fixes instead of the rebuild they came in asking for, even though the rebuild is the
              bigger invoice. And it is why support response times are written into the agreement
              instead of promised in a sales call and forgotten by month three.
            </p>
            <p className="leading-relaxed text-ink-muted">
              The trade-off is real: we are small, we say no to work regularly, and we do not
              maintain a sales team to chase you. If you want a studio with an account manager and a
              quarterly strategy deck, we are genuinely the wrong choice.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="How we work" width="wide" tone="sunken">
        <SectionHeading
          title={
            <>
              Six principles we will be
              <br />
              held to in writing.
            </>
          }
          lead="Not values on a wall. Each of these is something you can check us against during a project, and complain about if we fail."
        />

        <ol className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {principles.map((principle, index) => (
            <li key={principle.heading} className="flex flex-col bg-surface p-8 lg:p-10">
              <span className="font-mono text-xs tracking-[0.18em] text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 font-display text-2xl font-medium leading-snug tracking-[-0.02em]">
                {principle.heading}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Studio statement, set as oversized editorial type. */}
      <section className="border-t border-line bg-surface-invert text-ink-invert">
        <Container width="wide" className="py-24 lg:py-32">
          <p className="eyebrow mb-10 !text-ink-invert/50">The short version</p>
          <blockquote>
            <p className="font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.03em]">
              &ldquo;A good website should not be a luxury purchase for a business doing
              <span className="text-accent"> honest work</span> on a normal street. That is the whole
              premise. Everything else is logistics.&rdquo;
            </p>
            <footer className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-invert/60">
              {siteConfig.founder} &mdash; Founder, {siteConfig.name}
            </footer>
          </blockquote>
        </Container>
      </section>

      <Section eyebrow="Who we are for" width="wide">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-surface p-8 lg:p-12">
            <h2 className="text-title">A good fit</h2>
            <ul className="mt-8 space-y-4">
              {[
                "An established local business with a site that is actively costing you work",
                "A new business that needs to look credible on a real budget",
                "A nonprofit or community organisation where every dollar is scrutinised",
                "Anyone who wants to understand and own what they are paying for",
                "A business whose owner will actually be in the room for decisions",
              ].map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                    &#43;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-8 lg:p-12">
            <h2 className="text-title">A bad fit</h2>
            <ul className="mt-8 space-y-4">
              {[
                "You need a full brand identity built from nothing",
                "You want a dedicated account manager and weekly status meetings",
                "You are looking for guaranteed first-page rankings",
                "The project needs a custom backend and a product team",
                "Decisions have to pass through a committee of six",
              ].map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-ink-faint">
                    &minus;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Everything else" width="default" tone="sunken" id="faq">
        <SectionHeading title="Frequently asked, fully answered." />
        <Accordion items={faqs} className="mt-14" />
      </Section>

      <CallToAction />

      <FaqJsonLd items={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ]}
      />
    </>
  );
}
