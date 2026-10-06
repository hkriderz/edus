import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getCaseStudy } from "@/content/work";
import { cn } from "@/lib/cn";

type DemoFonts = {
  display: string;
  body: string;
  mono: string;
};

/**
 * Wrapper every demo site sits inside.
 *
 * Two jobs:
 *  1. Scope the demo's palette via `data-demo`, which themes.css keys off.
 *  2. Re-point --font-display / --font-sans / --font-mono to the demo's own
 *     faces, so Tailwind's font utilities resolve per demo without any new
 *     classes. Fonts are passed in as resolved `fontFamily` strings from each
 *     demo layout, which keeps those font files off marketing page loads.
 */
export function DemoFrame({
  slug,
  fonts,
  children,
  grain = false,
}: {
  slug: string;
  fonts: DemoFonts;
  children: ReactNode;
  grain?: boolean;
}) {
  const style = {
    "--font-display": fonts.display,
    "--font-sans": fonts.body,
    "--font-mono": fonts.mono,
  } as CSSProperties;

  return (
    <div
      data-demo={slug}
      style={style}
      className="flex min-h-screen flex-col bg-surface pb-20 font-sans text-ink antialiased"
    >
      {grain ? (
        <svg
          className="grain-overlay"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <filter id={`grain-${slug}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${slug})`} />
        </svg>
      ) : null}

      <a
        href="#demo-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-ink focus:bg-surface focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em]"
      >
        Skip to content
      </a>

      {children}

      <DemoBadge slug={slug} />
    </div>
  );
}

/**
 * Persistent, unmissable label marking the page as an EDUS demonstration build,
 * with a route back to the case study. This is an honesty requirement, not
 * decoration: a visitor who lands here from search must be able to tell that
 * the business is fictional.
 */
export function DemoBadge({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);

  return (
    // Pinned bottom-right rather than bottom-centre: a centred bar sat on top of
    // hero call-to-action buttons on several demos.
    <div
      data-demo-chrome="badge"
      className="pointer-events-none fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5"
    >
      <div
        className={cn(
          "pointer-events-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5",
          "border border-[#cc6a42] bg-[#191511] px-4 py-2.5 text-[#f7f3ec] shadow-lg",
        )}
      >
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[#cc6a42]">
          EDUS demo build
        </span>
        <span aria-hidden="true" className="hidden text-[#f7f3ec]/30 sm:inline">
          |
        </span>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-[#f7f3ec]/65">
          Fictional business
        </span>
        <span aria-hidden="true" className="hidden text-[#f7f3ec]/30 sm:inline">
          |
        </span>
        {study ? (
          <Link
            href={`/work/${slug}/`}
            className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] underline decoration-1 underline-offset-[4px] transition-colors hover:text-[#cc6a42]"
          >
            Case study
          </Link>
        ) : null}
        <Link
          href="/work/"
          className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] underline decoration-1 underline-offset-[4px] transition-colors hover:text-[#cc6a42]"
        >
          All work
        </Link>
      </div>
    </div>
  );
}
