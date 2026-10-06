import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { menu, storyChapters } from "./data";

export const metadata = buildMetadata({
  title: "Rosalía — modern Mexican (EDUS demo)",
  description:
    "A demonstration build by EDUS Media: a restaurant site where the menu is set as editorial typography instead of trapped in a PDF, with a three-tap reservation flow.",
  path: "/demo/rosalia/",
});

const totalDishes = menu.reduce((count, section) => count + section.dishes.length, 0);
const signature = menu[2]?.dishes.slice(0, 3) ?? [];

export default function RosaliaHome() {
  return (
    <>
      {/* Hero set as a menu cover: centred, serif, almost nothing else. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-ink-faint">
            88 Calle Verde &middot; Dinner Tuesday to Sunday
          </p>

          <h1 className="mt-10 font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.86] tracking-[-0.02em]">
            Masa ground
            <br />
            at <span className="italic text-accent">six</span>
            <br />
            every morning.
          </h1>

          <p className="mx-auto mt-12 max-w-[50ch] border-t border-line pt-10 text-lg leading-relaxed text-ink-muted">
            Heirloom corn from a cooperative in Oaxaca, cooked overnight and stone-ground before
            service. Everything else on the menu follows from that one decision.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo/rosalia/reservations/"
              className="border border-accent bg-accent px-7 py-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Reserve a table
            </Link>
            <Link
              href="/demo/rosalia/menu/"
              className="border border-line-strong px-7 py-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-ink-invert"
            >
              Read the menu
            </Link>
          </div>
        </div>
      </section>

      {/* Signature dishes — typography at menu scale, readable across a table. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line-strong pb-5">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              Platos fuertes
            </h2>
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-faint">
              {totalDishes} dishes on the current menu
            </p>
          </div>

          <ul className="divide-y divide-line">
            {signature.map((dish) => (
              <li key={dish.name} className="flex items-baseline justify-between gap-6 py-8 sm:gap-12">
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-tight">
                    {dish.name}
                  </h3>
                  <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-muted">
                    {dish.description}
                  </p>
                  <ul className="mt-4 flex gap-2">
                    {dish.flags.map((flag) => (
                      <li
                        key={flag}
                        className="border border-line px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.1em] text-ink-faint"
                      >
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="shrink-0 font-display text-2xl sm:text-3xl">{dish.price}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/demo/rosalia/menu/"
            className="mt-10 inline-block font-mono text-[0.625rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[6px] hover:text-accent"
          >
            The whole menu, all four sections
          </Link>
        </div>
      </section>

      {/* Story teaser. */}
      <section className="border-b border-line bg-surface-sunken">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <h2 className="text-center font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            Four things worth knowing
          </h2>

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {storyChapters.map((chapter) => (
              <article key={chapter.heading} className="bg-surface p-7 sm:p-9">
                <h3 className="font-display text-xl leading-snug sm:text-2xl">{chapter.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{chapter.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center">
            <Link
              href="/demo/rosalia/story/"
              className="font-mono text-[0.625rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[6px] hover:text-accent"
            >
              More about how we cook
            </Link>
          </p>
        </div>
      </section>

      {/* Practical block: hours, walk-ins, private dining. */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-20 pb-28 sm:px-8">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              {
                heading: "Walk-ins at the bar",
                body: "Eight seats at the bar are held back for walk-ins every service, including Saturdays. Arrive before 18:00 or after 21:00 for the best chance.",
              },
              {
                heading: "Private dining for 18",
                body: "The back room seats eighteen with a set menu agreed in advance. Email us rather than using the reservation form for these.",
              },
              {
                heading: "Allergens, honestly",
                body: "Almost everything passes through a kitchen that handles nuts and gluten. Tell us when you book and the kitchen will tell you exactly what is possible.",
              },
            ].map((item) => (
              <article key={item.heading} className="bg-surface p-7 sm:p-9">
                <h2 className="font-display text-xl leading-snug">{item.heading}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-tight">
              Dinner from 17:30, Tuesday to Sunday.
            </p>
            <Link
              href="/demo/rosalia/reservations/"
              className="mt-8 inline-block border border-accent bg-accent px-7 py-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Reserve a table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
