import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  /** Mono eyebrow label, e.g. "02 — Services". */
  eyebrow?: string;
  id?: string;
  width?: "prose" | "narrow" | "default" | "wide" | "full";
  /** Draws the hairline rule that separates editorial sections. */
  divider?: boolean;
  tone?: "default" | "sunken" | "invert";
  className?: string;
  innerClassName?: string;
};

const tones = {
  default: "",
  sunken: "bg-surface-sunken",
  invert: "bg-surface-invert text-ink-invert",
} as const;

export function Section({
  children,
  eyebrow,
  id,
  width = "default",
  divider = true,
  tone = "default",
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28 lg:py-36",
        divider && "border-t border-line",
        tones[tone],
        className,
      )}
    >
      <Container width={width} className={innerClassName}>
        {eyebrow ? <p className="eyebrow mb-10">{eyebrow}</p> : null}
        {children}
      </Container>
    </section>
  );
}

/** Standard section heading: display serif with an optional lead paragraph. */
export function SectionHeading({
  title,
  lead,
  align = "left",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      data-reveal
    >
      <h2 className="text-display optical-left">{title}</h2>
      {lead ? <p className="text-lead mt-6 text-ink-muted">{lead}</p> : null}
    </div>
  );
}
