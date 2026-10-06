import { buildMetadata } from "@/lib/metadata";
import { dietaryLegend, menu } from "../data";

export const metadata = buildMetadata({
  title: "Menu — Rosalía (EDUS demo)",
  description:
    "The full Rosalía menu as structured, indexable content: four sections, dietary flags and prices. A demonstration build by EDUS Media.",
  path: "/demo/rosalia/menu/",
});

const flagKeys = Object.keys(dietaryLegend) as (keyof typeof dietaryLegend)[];

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 pb-28 sm:px-8">
      <header className="text-center">
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-ink-faint">
          Updated weekly after the Thursday market
        </p>
        <h1 className="mt-7 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.88]">Menu</h1>
        <p className="mx-auto mt-8 max-w-[48ch] border-t border-line pt-7 leading-relaxed text-ink-muted">
          Every dish here is a record on this page rather than a line in a PDF, which is why the
          prices are current and why you can read it on a phone without pinching.
        </p>
      </header>

      {/* Legend first, so flags are decodable before they are encountered. */}
      <dl className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-7 gap-y-3 border-y border-line py-5">
        {flagKeys.map((flag) => (
          <div key={flag} className="flex items-center gap-2.5">
            <dt className="border border-line px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] text-ink-faint">
              {flag}
            </dt>
            <dd className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-muted">
              {dietaryLegend[flag]}
            </dd>
          </div>
        ))}
      </dl>

      {menu.map((section) => (
        <section key={section.section} className="mt-16" aria-labelledby={`section-${section.section}`}>
          <div className="border-b border-line-strong pb-4">
            <h2
              id={`section-${section.section}`}
              className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-tight"
            >
              {section.section}
            </h2>
            <p className="mt-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              {section.note}
            </p>
          </div>

          <ul className="divide-y divide-line">
            {section.dishes.map((dish) => (
              <li key={dish.name} className="py-7">
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-[clamp(1.25rem,2.8vw,1.875rem)] leading-tight">
                    {dish.name}
                  </h3>
                  {/* Leader dots, borrowed from a printed menu. */}
                  <span
                    aria-hidden="true"
                    className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-line"
                  />
                  <span className="shrink-0 font-display text-xl sm:text-2xl">{dish.price}</span>
                </div>

                <p className="mt-2.5 max-w-[58ch] leading-relaxed text-ink-muted">
                  {dish.description}
                </p>

                <ul className="mt-3.5 flex gap-2" aria-label="Dietary information">
                  {dish.flags.map((flag) => (
                    <li
                      key={flag}
                      className="border border-line px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] text-ink-faint"
                    >
                      <abbr title={dietaryLegend[flag]} className="no-underline">
                        {flag}
                      </abbr>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-16 border border-line bg-surface-sunken p-7 sm:p-9">
        <h2 className="font-display text-2xl">Prices and allergens</h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
          <li>All prices are in US dollars and exclude tax and gratuity.</li>
          <li>
            A 20% service charge is added to parties of six or more, and it goes in full to the people
            who served you.
          </li>
          <li>
            Our kitchen handles nuts, gluten, dairy and shellfish in a small space. We cannot
            guarantee separation, but if you tell us when you book, the kitchen will tell you honestly
            what is safe.
          </li>
          <li>
            Vegetable dishes change weekly. If a dish you wanted has gone, ask &mdash; there is usually
            something close that is better right now.
          </li>
        </ul>
      </div>
    </div>
  );
}
