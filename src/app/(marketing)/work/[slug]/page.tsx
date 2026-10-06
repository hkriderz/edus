import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd, CreativeWorkJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  SCREENSHOT_HEIGHT,
  SCREENSHOT_WIDTH,
  caseStudySlugs,
  getAdjacentCaseStudies,
  getCaseStudy,
  screenshotPaths,
} from "@/content/work";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return buildMetadata({
      title: "Case study not found",
      description: "This case study does not exist.",
      path: `/work/${slug}/`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${study.brand} — ${study.vertical}`,
    description: study.summary,
    path: `/work/${study.slug}/`,
    // The real capture of the built site is a far better share card than a
    // generated template, and it is already in the bundle.
    ogImage: {
      url: screenshotPaths(study.slug).home,
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const { previous, next } = getAdjacentCaseStudies(study.slug);
  const screenshot = screenshotPaths(study.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Case study — ${study.vertical}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work/" },
          { label: study.brand },
        ]}
        title={study.brand}
        lead={study.tagline}
        meta={[
          { label: "Vertical", value: study.vertical },
          { label: "Year", value: study.year },
          { label: "Tier", value: study.tier },
          { label: "Pages", value: String(study.demoPages.length) },
        ]}
      />

      {/* Live demo rail — the single most important action on this page. */}
      <Container width="wide">
        <div
          className="flex flex-col gap-7 border p-7 lg:flex-row lg:items-center lg:justify-between lg:p-9"
          style={{
            backgroundColor: study.cardSurface,
            color: study.cardInk,
            borderColor: study.cardAccent,
          }}
        >
          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">
              {study.liveKicker ?? "Demonstration build"}
            </p>
            <p className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              {study.liveHeadline ?? "The whole site is live. Go and click around."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={study.demoHref}
              className="border px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-opacity hover:opacity-80"
              style={{ backgroundColor: study.cardAccent, borderColor: study.cardAccent, color: study.cardSurface }}
            >
              Open {study.brand}
            </Link>
          </div>
        </div>

        {/* Captured from the production export, not a mockup. */}
        <figure className="mt-6 border border-line">
          <Image
            src={screenshot.home}
            alt={`Home page of the ${study.brand} site, showing its ${study.typography.display} headline treatment`}
            width={SCREENSHOT_WIDTH}
            height={SCREENSHOT_HEIGHT}
            sizes="(min-width: 1440px) 1224px, 100vw"
            priority
            className="block h-auto w-full"
          />
          <figcaption className="border-t border-line bg-surface-sunken px-5 py-3.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
            {study.brand} home page &middot; captured at 1440&times;900
          </figcaption>
        </figure>
      </Container>

      <Section eyebrow="01 — The brief" width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-title lg:col-span-5">
            {study.briefHeading ?? "What the client came in with."}
          </h2>
          <div className="space-y-6 lg:col-span-7">
            {study.brief.map((paragraph) => (
              <p key={paragraph} className="text-lead leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="02 — The approach" width="wide" tone="sunken">
        <h2 className="text-display optical-left max-w-3xl" data-reveal>
          Three decisions that shaped the build.
        </h2>

        <ol className="mt-16 border-t border-line" data-reveal-group>
          {study.approach.map((item, index) => (
            <li key={item.heading} className="grid gap-5 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
              <span className="font-mono text-xs tracking-[0.18em] text-ink-faint lg:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-medium leading-snug tracking-[-0.02em] lg:col-span-5 lg:text-3xl">
                {item.heading}
              </h3>
              <p className="leading-relaxed text-ink-muted lg:col-span-6">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="03 — Identity system" width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-title">Typography</h2>
            <dl className="mt-8 space-y-6 border-t border-line pt-8">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Display
                </dt>
                <dd className="mt-2 font-display text-3xl font-medium tracking-[-0.02em]">
                  {study.typography.display}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Body
                </dt>
                <dd className="mt-2 font-display text-3xl font-medium tracking-[-0.02em]">
                  {study.typography.body}
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-ink-muted">{study.typography.note}</p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-title">Palette</h2>
            <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {study.palette.map((swatch) => (
                <li key={swatch.name} className="flex flex-col">
                  <div
                    className="aspect-[4/3] w-full"
                    style={{ backgroundColor: swatch.value }}
                    aria-hidden="true"
                  />
                  <div className="bg-surface p-4">
                    <p className="text-sm font-medium">{swatch.name}</p>
                    <p className="mt-1.5 break-all font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-ink-faint">
                      {swatch.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="text-title mt-14">Built</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
              {study.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                    &#43;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="mt-16 border border-line">
          <Image
            src={screenshot.detail}
            alt={`An interior page of the ${study.brand} demonstration build, showing the identity applied to dense content`}
            width={SCREENSHOT_WIDTH}
            height={SCREENSHOT_HEIGHT}
            sizes="(min-width: 1440px) 1224px, 100vw"
            loading="lazy"
            className="block h-auto w-full"
          />
          <figcaption className="border-t border-line bg-surface-sunken px-5 py-3.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
            The system under load &mdash; the identity applied to a dense interior page
          </figcaption>
        </figure>
      </Section>

      <Section eyebrow="04 — The build, by the numbers" width="wide" tone="sunken">
        <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {study.outcomes.map((outcome) => (
            <div key={outcome.label} className="bg-surface p-8 lg:p-10">
              <dt className="sr-only">{outcome.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.75rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.035em] text-accent">
                  {outcome.metric}
                </span>
                <span className="mt-5 block text-sm text-ink-muted">{outcome.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <h2 className="text-title">Pages in the demo</h2>
          <ul className="mt-8 border-t border-line">
            {study.demoPages.map((page) => (
              <li key={page.href} className="border-b border-line">
                <Link
                  href={page.href}
                  className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-accent"
                >
                  <span className="font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                    {page.label}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent">
                    {page.href}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href={study.demoHref} size="lg">
            Open the live demo
          </ButtonLink>
          <ButtonLink href="/contact/" variant="outline" size="lg">
            Ask about a build like this
          </ButtonLink>
        </div>
      </Section>

      {/* Previous / next, so the portfolio reads as a sequence. */}
      {previous && next ? (
        <nav aria-label="Case study navigation" className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[90rem] gap-px bg-line sm:grid-cols-2">
            <Link
              href={`/work/${previous.slug}/`}
              className="group bg-surface p-8 transition-colors hover:bg-surface-sunken lg:p-12"
            >
              <span className="eyebrow">Previous</span>
              <span className="mt-4 block font-display text-3xl font-medium tracking-[-0.025em] transition-colors group-hover:text-accent">
                {previous.brand}
              </span>
              <span className="mt-2 block text-sm text-ink-muted">{previous.vertical}</span>
            </Link>
            <Link
              href={`/work/${next.slug}/`}
              className="group bg-surface p-8 text-right transition-colors hover:bg-surface-sunken lg:p-12"
            >
              <span className="eyebrow">Next</span>
              <span className="mt-4 block font-display text-3xl font-medium tracking-[-0.025em] transition-colors group-hover:text-accent">
                {next.brand}
              </span>
              <span className="mt-2 block text-sm text-ink-muted">{next.vertical}</span>
            </Link>
          </div>
        </nav>
      ) : null}

      <CreativeWorkJsonLd
        name={`${study.brand} — ${study.vertical} website`}
        description={study.summary}
        path={`/work/${study.slug}/`}
        about={study.vertical}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work/" },
          { name: study.brand, path: `/work/${study.slug}/` },
        ]}
      />
    </>
  );
}
