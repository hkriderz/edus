import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/home/CallToAction";
import { PageHeader } from "@/components/layout/PageHeader";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getService, serviceSlugs, services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "This service does not exist.",
      path: `/services/${slug}/`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((entry) => entry.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Service ${service.index}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: service.name },
        ]}
        title={service.name}
        lead={service.intro}
        meta={[
          { label: "Starting at", value: service.startingAt },
          { label: "Timeline", value: service.timeline },
          { label: "Payment", value: "3 milestones" },
          { label: "Ownership", value: "Yours" },
        ]}
      />

      <Section eyebrow="What you get" width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-title lg:col-span-4">Included as standard.</h2>
          <ul className="border-t border-line lg:col-span-8" data-reveal-group>
            {service.deliverables.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-6 border-b border-line py-5 text-lead"
              >
                <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.16em] text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="How it runs" width="wide" tone="sunken">
        <h2 className="text-display optical-left max-w-3xl" data-reveal>
          Four stages, each with a visible output.
        </h2>

        <ol className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {service.process.map((step, index) => (
            <li key={step.step} className="flex flex-col bg-surface p-7 lg:p-9">
              <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.02em]">
                {step.step}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Deliberately excluded" width="default">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-title">Not included.</h2>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Stated up front rather than discovered mid-project. If you need any of these we will
              either quote them separately or refer you to someone who does them properly.
            </p>
          </div>
          <ul className="space-y-5 border-t border-line pt-8 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {service.notIncluded.map((item) => (
              <li key={item} className="flex gap-4 leading-relaxed text-ink-muted">
                <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-accent">
                  &minus;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/contact/" size="lg">
            Enquire about {service.name}
          </ButtonLink>
          <ButtonLink href="/work/" variant="outline" size="lg">
            See it applied in the work
          </ButtonLink>
        </div>
      </Section>

      <Section eyebrow="Other services" width="wide" tone="sunken">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug} className="bg-surface">
              <Link
                href={`/services/${other.slug}/`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-surface-sunken lg:p-9"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.18em] text-ink-faint">
                  {other.index}
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent">
                  {other.name}
                </h3>
                <p className="mt-auto pt-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                  From {other.startingAt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CallToAction />

      <ServiceJsonLd
        name={service.name}
        description={service.summary}
        path={`/services/${service.slug}/`}
        priceFrom={service.startingAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          { name: service.name, path: `/services/${service.slug}/` },
        ]}
      />
    </>
  );
}
