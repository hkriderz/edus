import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Crumb = { label: string; href?: string };

/**
 * Shared page masthead: breadcrumb, oversized display title, lead paragraph and
 * an optional metadata rail. Keeps every interior page on the same vertical
 * rhythm as the homepage hero.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: readonly Crumb[];
  meta?: readonly { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-12 lg:pb-20 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 12.5%)",
        }}
      />

      <Container width="wide" className="relative">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-muted">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="eyebrow">{eyebrow}</p>

        <h1 className="mt-7 text-display optical-left max-w-5xl">{title}</h1>

        {lead ? (
          <p className="text-lead mt-9 max-w-[52ch] border-t border-line pt-9 text-ink-muted">
            {lead}
          </p>
        ) : null}

        {meta ? (
          <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {meta.map((entry) => (
              <div key={entry.label} className="bg-surface p-5 lg:p-6">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  {entry.label}
                </dt>
                <dd className="mt-2.5 font-display text-xl font-medium tracking-[-0.02em]">
                  {entry.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  );
}
