import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { storyChapters } from "../data";

export const metadata = buildMetadata({
  title: "Story — Rosalía (EDUS demo)",
  description:
    "How Rosalía sources corn, builds mole over three days and lets the Thursday market set the menu. A demonstration build by EDUS Media.",
  path: "/demo/rosalia/story/",
});

export default function StoryPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-ink-faint">
            Since 2021
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.88]">
            Named for a woman
            <br />
            who never wrote
            <br />
            <span className="italic text-accent">anything down.</span>
          </h1>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          {storyChapters.map((chapter, index) => (
            <article key={chapter.heading} className="mb-16 last:mb-0">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
                {chapter.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">{chapter.body}</p>
            </article>
          ))}

          {/* Pull quote, set as the largest type on the page. */}
          <blockquote className="my-20 border-y border-line-strong py-14 text-center">
            <p className="font-display text-[clamp(1.5rem,4.5vw,3rem)] italic leading-[1.15]">
              &ldquo;If the squash is poor this week, the squash dish comes off. That is not
              inflexibility. That is the opposite of it.&rdquo;
            </p>
            <footer className="mt-8 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-faint">
              Head chef
            </footer>
          </blockquote>

          <div className="border border-line bg-surface-sunken p-7 sm:p-9">
            <h2 className="font-display text-2xl">Where things come from</h2>
            <dl className="mt-7 divide-y divide-line border-y border-line">
              {[
                { term: "Corn", detail: "Heirloom varieties, cooperative in Oaxaca, shipped monthly" },
                { term: "Fish", detail: "Day boats out of San Pedro, delivered Tuesday and Friday" },
                { term: "Pork", detail: "Pasture-raised, single farm, Central Valley" },
                { term: "Vegetables", detail: "Thursday growers' market, whatever is genuinely good" },
                { term: "Mezcal", detail: "Small producers only, bought direct, nothing industrial" },
              ].map((row) => (
                <div key={row.term} className="flex flex-wrap justify-between gap-3 py-3.5">
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                    {row.term}
                  </dt>
                  <dd className="text-sm text-ink-muted">{row.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-14 text-center">
            <Link
              href="/demo/rosalia/reservations/"
              className="inline-block border border-accent bg-accent px-7 py-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Come and eat
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
