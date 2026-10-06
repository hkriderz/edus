import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { insuranceNotes, treatments } from "../data";

export const metadata = buildMetadata({
  title: "Treatments & prices — Meridian Dental (EDUS demo)",
  description:
    "Every treatment with its price, duration and an honest description of what it feels like. A demonstration build by EDUS Media.",
  path: "/demo/meridian-dental/services/",
});

const spanClasses = {
  hero: "lg:col-span-4",
  wide: "lg:col-span-3",
  third: "lg:col-span-2",
  full: "lg:col-span-6",
} as const;

export default function TreatmentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8">
      <header>
        <p className="text-sm font-medium text-accent">
          {treatments.length} treatments &middot; All prices are self-pay
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Treatments and prices.
        </h1>
        <p className="mt-7 max-w-[54ch] border-t border-line pt-7 text-lg leading-relaxed text-ink-muted">
          Each entry states the cost, the appointment length, and what it feels like &mdash; in that
          order. There is no separate, higher price list for patients without insurance.
        </p>
      </header>

      {/* Bento layout: cells are sized by how often patients search for the item,
          so the grid itself encodes priority rather than treating all eight
          treatments as equally important. */}
      <div className="mt-14 grid gap-5 lg:grid-cols-6">
        {treatments.map((treatment) => (
          <article
            key={treatment.name}
            className={`flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-8 ${spanClasses[treatment.span]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-xl font-medium leading-snug">{treatment.name}</h2>
              <p className="shrink-0 text-xl font-medium text-accent">{treatment.price}</p>
            </div>

            <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
              {treatment.duration}
            </p>

            {/* Capped measure so the full-width card does not stretch a line of
                body copy across the whole grid. */}
            <p className="mt-6 max-w-[70ch] rounded-xl bg-accent-soft p-4 text-sm leading-relaxed">
              <span className="font-medium">What it feels like: </span>
              {treatment.feels}
            </p>

            <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-ink-muted">
              {treatment.description}
            </p>
          </article>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
          How we quote
        </h2>

        <ul className="mt-8 space-y-5">
          {[
            {
              heading: "You get a total before anything is booked",
              body: "Written down, printed or emailed, with each item priced separately. If a treatment has a range, we tell you which end of it you are at and why.",
            },
            {
              heading: "The option of doing nothing is always included",
              body: "Every plan lists what happens if you decline treatment, including when the honest answer is 'probably nothing for a few years'.",
            },
            {
              heading: "Prices do not change after the quote",
              body: "If we find something unexpected mid-treatment, we stop, explain it, and re-quote. We do not add items to an invoice you have already agreed.",
            },
          ].map((item) => (
            <li key={item.heading} className="rounded-2xl border border-line p-7">
              <h3 className="text-lg font-medium">{item.heading}</h3>
              <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
          Insurance and payment
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {insuranceNotes.map((note) => (
            <article key={note.heading} className="rounded-2xl bg-surface-sunken p-7">
              <h3 className="text-lg font-medium leading-snug">{note.heading}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{note.body}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-14 text-center">
        <Link
          href="/demo/meridian-dental/book/"
          className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Request an appointment
        </Link>
      </p>
    </div>
  );
}
