import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Asymmetric bento grid. Cells declare their own span so importance is encoded
 * in the layout rather than applied uniformly — a grid of identical cards is
 * just a list with extra borders.
 */
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-6", className)}
      data-reveal-group
    >
      {children}
    </div>
  );
}

const spans = {
  /** Half-width on desktop. */
  wide: "lg:col-span-3",
  /** Third-width on desktop. */
  third: "lg:col-span-2",
  /** Two-thirds, for the cell that carries the most weight. */
  hero: "lg:col-span-4",
  full: "sm:col-span-2 lg:col-span-6",
} as const;

export function BentoCell({
  children,
  span = "third",
  tone = "default",
  className,
}: {
  children: ReactNode;
  span?: keyof typeof spans;
  tone?: "default" | "accent" | "invert";
  className?: string;
}) {
  const tones = {
    default: "bg-surface",
    accent: "bg-accent text-accent-contrast",
    invert: "bg-surface-invert text-ink-invert",
  } as const;

  return (
    <div className={cn("flex flex-col p-8 lg:p-10", spans[span], tones[tone], className)}>
      {children}
    </div>
  );
}
