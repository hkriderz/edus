import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { clinicians, firstVisitSteps, insuranceNotes, treatments } from "./data";

export const metadata = buildMetadata({
  title: "Meridian Dental — family practice (EDUS demo)",
  description:
    "A demonstration build by EDUS Media: a deliberately calm, accessibility-first dental practice site designed around dental anxiety, with every price published up front.",
  path: "/demo/meridian-dental/",
});

/** The first four spans sum to two complete six-column rows. */
const featured = treatments.slice(0, 4);

const spanClasses = {
  hero: "lg:col-span-4",
  wide: "lg:col-span-3",
  third: "lg:col-span-2",
  full: "lg:col-span-6",
} as const;

export default function MeridianDentalHome() {
  return (
    <>
      {/* Calm hero: a lot of air, soft cyan, no clinical imagery at all. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-accent">
                Accepting new patients &middot; Rancho Cucamonga
              </p>

              <h1 className="mt-7 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                We built this practice around the most anxious person who will ever visit it.
              </h1>

              <p className="mt-8 max-w-[50ch] text-lg leading-relaxed text-ink-muted">
                Roughly a third of people put off seeing a dentist because of fear. So the first
                fifteen minutes of your first appointment involve no instruments at all, every price
                is on this website, and nothing is ever booked while you are sitting at the desk
                feeling cornered.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/demo/meridian-dental/book/"
                  className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  Request an appointment
                </Link>
                <Link
                  href="/demo/meridian-dental/services/"
                  className="rounded-full border border-line-strong px-7 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  See every price
                </Link>
              </div>
            </div>

            {/* Reassurance card rather than a hero image. */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-surface-sunken p-7 sm:p-9">
                <h2 className="text-lg font-medium">What you will not find here</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    "Posters of instruments anywhere in the building",
                    "A television in the waiting room",
                    "Prices you have to phone up to discover",
                    "Treatment recommended without a written alternative",
                    "Anyone making you feel judged about your teeth",
                  ].map((item) => (
                    <li key={item} className="flex gap-3.5 text-sm leading-relaxed text-ink-muted">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      >
                        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M5 8l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First visit comes before credentials — the anxiety-aware content order. */}
      <section className="border-b border-line bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight tracking-[-0.025em]">
            Exactly what happens at a first appointment.
          </h2>
          <p className="mt-5 max-w-[52ch] text-ink-muted">
            In order, with nothing omitted. If you have been avoiding this, knowing the sequence is
            usually the thing that makes it possible.
          </p>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {firstVisitSteps.map((step, index) => (
              <li key={step.heading} className="rounded-2xl border border-line bg-surface p-7">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-sm font-medium text-accent"
                >
                  {index + 1}
                </span>
                <h3 className="mt-6 text-lg font-medium leading-snug">{step.heading}</h3>
                <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bento grid of treatments: cells sized by how often patients search them. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight tracking-[-0.025em]">
                Treatments, with prices.
              </h2>
              <p className="mt-4 max-w-[48ch] text-ink-muted">
                Every item states how long it takes and what it feels like before it explains the
                clinical detail.
              </p>
            </div>
            <Link
              href="/demo/meridian-dental/services/"
              className="text-sm font-medium text-accent underline underline-offset-[5px]"
            >
              All {treatments.length} treatments
            </Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-6">
            {featured.map((treatment) => (
              <article
                key={treatment.name}
                className={`flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-8 ${spanClasses[treatment.span]}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="text-xl font-medium">{treatment.name}</h3>
                  <p className="shrink-0 text-xl font-medium text-accent">{treatment.price}</p>
                </div>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
                  {treatment.duration}
                </p>

                {/* "What it feels like" is given its own treatment, deliberately
                    above the clinical description. */}
                <p className="mt-6 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed">
                  <span className="font-medium">What it feels like: </span>
                  {treatment.feels}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                  {treatment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team strip. */}
      <section className="border-b border-line bg-surface-sunken">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight tracking-[-0.025em]">
              Who you will meet.
            </h2>
            <Link
              href="/demo/meridian-dental/team/"
              className="text-sm font-medium text-accent underline underline-offset-[5px]"
            >
              Full team and qualifications
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clinicians.map((clinician) => (
              <li key={clinician.name} className="rounded-2xl border border-line bg-surface p-7">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-sm font-medium text-accent"
                >
                  {clinician.initials}
                </span>
                <h3 className="mt-6 text-lg font-medium leading-snug">{clinician.name}</h3>
                <p className="mt-1.5 text-sm text-accent">{clinician.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{clinician.focus}</p>
                <p className="mt-4 text-xs text-ink-faint">
                  Speaks {clinician.languages.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Insurance and payment — the second-biggest barrier after fear. */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 pb-28 sm:px-8">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight tracking-[-0.025em]">
            Paying for it.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {insuranceNotes.map((note) => (
              <article key={note.heading} className="rounded-2xl border border-line p-7">
                <h3 className="text-lg font-medium leading-snug">{note.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{note.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-surface-invert p-8 text-ink-invert sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
                  Ready when you are.
                </h2>
                <p className="mt-4 max-w-[46ch] text-ink-invert/75">
                  Request an appointment and we will reply with two or three times to choose from. No
                  deposit, and no obligation if you change your mind.
                </p>
              </div>
              <Link
                href="/demo/meridian-dental/book/"
                className="shrink-0 rounded-full bg-accent px-7 py-3.5 text-center text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                Request an appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
