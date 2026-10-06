import { cn } from "@/lib/cn";

/**
 * EDUS monogram. Four stacked bars form an "E" whose top bar extends past the
 * stem — the same overshoot used on display headings, so the mark and the
 * typography share a construction logic.
 *
 * `currentColor` throughout so the mark inherits light/dark text colour, with
 * the one accent bar passed explicitly.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect x="0" y="0" width="32" height="32" fill="currentColor" />
      <rect x="6" y="7" width="20" height="3.5" fill="var(--accent)" />
      <rect x="6" y="14.25" width="13" height="3.5" fill="var(--surface)" />
      <rect x="6" y="21.5" width="20" height="3.5" fill="var(--surface)" />
      <rect x="6" y="7" width="3.5" height="18" fill="var(--surface)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className="font-display text-[1.375rem] font-semibold leading-none tracking-[-0.03em]">
        EDUS
      </span>
      <span className="font-mono text-[0.5625rem] uppercase leading-none tracking-[0.22em] text-ink-faint">
        Media
      </span>
    </span>
  );
}

export function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Monogram className="h-7 w-7 shrink-0" />
      <Wordmark />
    </span>
  );
}
