import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SCREENSHOT_HEIGHT, SCREENSHOT_WIDTH, screenshotPaths, type CaseStudy } from "@/content/work";
import { cn } from "@/lib/cn";

/**
 * Portfolio card rendered in each client's own palette, so the index itself
 * demonstrates a distinct identity before a visitor clicks anything.
 *
 * Colours come from the case-study record as inline custom properties rather
 * than Tailwind classes, because the values are data and cannot be known at
 * build time by the compiler.
 */
export function WorkCard({
  study,
  index,
  className,
}: {
  study: CaseStudy;
  index: number;
  className?: string;
}) {
  const style = {
    "--card-surface": study.cardSurface,
    "--card-ink": study.cardInk,
    "--card-accent": study.cardAccent,
  } as CSSProperties;

  const screenshot = screenshotPaths(study.slug);

  return (
    <article
      style={style}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-line",
        "bg-[var(--card-surface)] text-[var(--card-ink)]",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        className,
      )}
    >
      {/* Generated identity plate: concentric rules and a colour field standing
          in for a hero image. Pure CSS, so there is no asset to go missing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 85% 8%, ${study.cardAccent}44 0%, transparent 62%),
             repeating-linear-gradient(90deg, ${study.cardInk}0f 0px, ${study.cardInk}0f 1px, transparent 1px, transparent 46px)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-6 p-7 lg:p-9">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">
          {String(index + 1).padStart(2, "0")} / {study.vertical}
        </p>
        <p className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70">
          {study.year}
        </p>
      </div>

      {/* A real capture of the built site, cropped to its top edge so the card
          shows the actual typography rather than a mockup of it. The first two
          cards load eagerly because they sit above the fold. */}
      <div className="relative mx-7 overflow-hidden border border-current/15 lg:mx-9">
        <Image
          src={screenshot.home}
          alt={`Home page of the ${study.brand} site`}
          width={SCREENSHOT_WIDTH}
          height={SCREENSHOT_HEIGHT}
          sizes="(min-width: 1024px) 45vw, 90vw"
          loading={index < 2 ? "eager" : "lazy"}
          priority={index === 0}
          className="block h-auto w-full"
        />
      </div>

      <div className="relative p-7 pt-10 lg:p-9 lg:pt-12">
        <h3 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {study.brand}
        </h3>
        <p className="mt-4 max-w-[46ch] text-sm leading-relaxed opacity-85">{study.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={`/work/${study.slug}/`}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--card-accent)]"
          >
            Read the case study
          </Link>
          <Link
            href={study.demoHref}
            className="border border-current/40 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors hover:border-[var(--card-accent)] hover:text-[var(--card-accent)]"
          >
            Open live demo
          </Link>
        </div>

        {/* Palette strip: the clearest signal that each build has its own identity. */}
        <ul className="mt-8 flex gap-1.5" aria-label={`${study.brand} palette`}>
          {study.palette.map((swatch) => (
            <li
              key={swatch.name}
              title={swatch.name}
              className="h-1.5 w-10 border border-current/20"
              style={{ backgroundColor: swatch.value }}
            >
              <span className="sr-only">{swatch.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
