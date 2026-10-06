import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop. Longer reads calmer. */
  durationSeconds?: number;
  separator?: string;
  className?: string;
};

/**
 * CSS-only infinite marquee. The item list is rendered twice and the track is
 * translated by exactly -50%, which makes the loop seamless without JS.
 *
 * The duplicate pass is aria-hidden so screen readers announce the list once.
 */
export function Marquee({
  items,
  durationSeconds = 38,
  separator = "/",
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee overflow-hidden border-y border-line py-5", className)}
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        {[false, true].map((isDuplicate) => (
          <ul
            key={isDuplicate ? "duplicate" : "primary"}
            className="flex shrink-0 items-center"
            aria-hidden={isDuplicate || undefined}
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex shrink-0 items-center font-mono text-xs uppercase tracking-[0.18em] text-ink-muted"
              >
                <span className="px-6">{item}</span>
                <span aria-hidden="true" className="text-accent">
                  {separator}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
