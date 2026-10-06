import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  /** Reading measure for long-form prose. */
  prose: "max-w-[68ch]",
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
} as const;

type ContainerProps = {
  children: ReactNode;
  width?: keyof typeof widths;
  as?: ElementType;
  className?: string;
};

export function Container({
  children,
  width = "default",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </Tag>
  );
}
