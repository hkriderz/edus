/**
 * Keyboard users land here first. Visually hidden until focused, at which point
 * it becomes the most prominent thing on the page.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:border focus:border-ink focus:bg-surface focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em]"
    >
      Skip to content
    </a>
  );
}
