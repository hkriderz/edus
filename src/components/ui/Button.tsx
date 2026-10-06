import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.14em] " +
  "border transition-colors duration-300 disabled:opacity-55 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-accent text-accent-contrast border-accent hover:bg-accent-hover hover:border-accent-hover",
  outline: "bg-transparent text-ink border-line-strong hover:bg-ink hover:text-ink-invert hover:border-ink",
  ghost: "bg-transparent text-ink border-transparent hover:border-line-strong",
  invert:
    "bg-surface text-ink border-surface hover:bg-transparent hover:text-ink-invert hover:border-ink-invert",
} as const;

const sizes = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4.5",
} as const;

type SharedProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

type ButtonLinkProps = SharedProps & {
  href: string;
  /** Set for links leaving the marketing site, e.g. into a demo. */
  external?: boolean;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
