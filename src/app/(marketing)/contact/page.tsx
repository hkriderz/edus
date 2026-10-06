import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig, siteLocation, isPlaceholder } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with EDUS Media. Tell us about your business and get a fixed price and realistic timeline back within one business day.",
  path: "/contact/",
});

const expectations = [
  {
    heading: "A reply from a person",
    body: "Within one business day, written by whoever would build your site. Not an autoresponder and not a templated proposal.",
  },
  {
    heading: "A price, not a range",
    body: "If your message has enough detail, the reply includes a fixed number and a timeline. If it does not, we will ask two specific questions.",
  },
  {
    heading: "An honest recommendation",
    body: "Including when that means telling you not to rebuild, or pointing you at a studio better suited to what you actually need.",
  },
  {
    heading: "No follow-up sequence",
    body: "One reply. If you do not respond, that is your answer and we will leave you alone. There is no drip campaign.",
  },
] as const;

export default function ContactPage() {
  const hasEmail = !isPlaceholder(siteConfig.email);
  const hasPhone = !isPlaceholder(siteConfig.phoneDisplay);
  const hasLocation = !isPlaceholder(siteConfig.address.city);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Tell us what is
            <br />
            not working.
          </>
        }
        lead="The more specific you are about where customers currently fall off, the more useful our reply will be. A paragraph beats a form filled in with single words."
      />

      <Container width="wide" className="pb-24 lg:pb-32">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
          <div className="bg-surface p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 className="eyebrow mb-10">Project enquiry</h2>
            {/* Suspense is required: the form reads ?tier= via useSearchParams,
                which suspends during static prerendering. */}
            <Suspense
              fallback={
                <p className="text-sm text-ink-muted" role="status">
                  Loading the enquiry form…
                </p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <aside className="bg-surface-sunken p-7 sm:p-10 lg:col-span-5 lg:p-14">
            <h2 className="eyebrow mb-10">Direct lines</h2>

            <dl className="space-y-8">
              {hasEmail ? (
                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                    Email
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-underline font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              ) : null}

              {hasPhone ? (
                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                    Phone
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="link-underline font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
              ) : null}

              {hasLocation ? (
                <div>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                    Based in
                  </dt>
                  <dd className="mt-3 text-lg">{siteLocation}</dd>
                  <dd className="mt-2 text-sm text-ink-muted">
                    We work with businesses here in person and everywhere else remotely.
                  </dd>
                </div>
              ) : null}

              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Hours
                </dt>
                <dd className="mt-3 space-y-1.5 text-sm text-ink-muted">
                  {siteConfig.hours.map((entry) => (
                    <span key={entry.days} className="block">
                      {entry.days} &mdash; {entry.time}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-12 border-t border-line pt-10">
              <h3 className="eyebrow mb-8">What happens next</h3>
              <ol className="space-y-7">
                {expectations.map((item, index) => (
                  <li key={item.heading} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-[0.625rem] tracking-[0.16em] text-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{item.heading}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-ink-muted">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Container>

      <Section eyebrow="Before you write" width="default" tone="sunken">
        <h2 className="text-title max-w-3xl">
          Two minutes of preparation gets you a far better answer.
        </h2>
        <ul className="mt-10 space-y-5">
          {[
            "The URL of your current site, if you have one, plus one sentence on what you dislike about it.",
            "Two or three sites you think look right — competitors or otherwise.",
            "Roughly how customers find you today: search, referral, walk-in, social.",
            "Any hard deadline, such as a season, an opening or a campaign.",
            "What you genuinely have to spend. We will scope to it rather than argue with it.",
          ].map((item) => (
            <li key={item} className="flex gap-4 leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                &#43;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
      />
    </>
  );
}
