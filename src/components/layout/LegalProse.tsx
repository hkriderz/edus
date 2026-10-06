import type { ReactNode } from "react";

/**
 * Typographic wrapper for legal copy. Tailwind's typography plugin is not used
 * here: these two pages are the only long-form prose on the site, and a dozen
 * lines of selectors is cheaper than another dependency.
 */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        [&>h2]:mt-14 [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:tracking-[-0.02em] sm:[&>h2]:text-3xl
        [&>h3]:mt-10 [&>h3]:text-xl [&>h3]:font-medium
        [&>p]:mt-5 [&>p]:leading-relaxed [&>p]:text-ink-muted
        [&>ul]:mt-5 [&>ul]:space-y-2.5 [&>ul]:pl-5
        [&>ul>li]:list-disc [&>ul>li]:leading-relaxed [&>ul>li]:text-ink-muted [&>ul>li]:marker:text-accent
        [&>ol]:mt-5 [&>ol]:space-y-2.5 [&>ol]:pl-5
        [&>ol>li]:list-decimal [&>ol>li]:leading-relaxed [&>ol>li]:text-ink-muted
        [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[3px]
        [&_strong]:font-medium [&_strong]:text-ink
      "
    >
      {children}
    </div>
  );
}
