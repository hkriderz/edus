import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import type { CSSProperties } from "react";

/**
 * Marketing-site typefaces. All three are variable fonts, so a single file per
 * family covers the full weight range used across the design system.
 *
 * Demo sites deliberately load their own faces inside their own layouts so a
 * visitor on the marketing site never downloads demo typography.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  // `SOFT` and `WONK` give Fraunces its warm, slightly idiosyncratic edge.
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({ subsets: ["latin"], display: "swap" });

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

/**
 * The semantic font slots, resolved to real families.
 *
 * These are applied as an inline style on the marketing wrapper rather than via
 * next/font's generated `.variable` classes. The distinction matters: a custom
 * property declared on `:root` as `var(--font-inter), …` computes to the
 * guaranteed-invalid value when `--font-inter` is only defined further down the
 * tree, and that empty value then inherits to every descendant — silently
 * dropping the whole type system back to the browser default. Declaring the
 * final family here, at the element that owns the subtree, keeps substitution
 * local and correct. `DemoFrame` uses the same pattern for the same reason.
 */
export const marketingFontVariables: CSSProperties = {
  "--font-display": `${fraunces.style.fontFamily}, ui-serif, Georgia, "Times New Roman", serif`,
  "--font-sans": `${inter.style.fontFamily}, ui-sans-serif, system-ui, -apple-system, sans-serif`,
  "--font-mono": `${jetBrainsMono.style.fontFamily}, ui-monospace, "SFMono-Regular", monospace`,
} as CSSProperties;
