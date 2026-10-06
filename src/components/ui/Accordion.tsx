import { cn } from "@/lib/cn";

type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Built on native <details>/<summary>: keyboard operable, announced correctly by
 * screen readers, and functional with JavaScript disabled. A custom
 * button-and-region implementation would add state for no accessibility gain.
 */
export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-xl sm:text-2xl font-display font-medium leading-snug">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1.5 shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-7 pr-10">
            <p className="max-w-[62ch] leading-relaxed text-ink-muted">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
