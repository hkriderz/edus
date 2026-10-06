import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  default: "border-line-strong text-ink-muted",
  accent: "border-accent text-accent bg-accent-soft",
  invert: "border-ink-invert/40 text-ink-invert",
} as const;

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
