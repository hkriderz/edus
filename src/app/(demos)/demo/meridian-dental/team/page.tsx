import { buildMetadata } from "@/lib/metadata";
import { clinicians } from "../data";

export const metadata = buildMetadata({
  title: "Our team — Meridian Dental (EDUS demo)",
  description:
    "Clinicians with full qualifications, registration numbers and languages spoken. A demonstration build by EDUS Media.",
  path: "/demo/meridian-dental/team/",
});

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8">
      <header>
        <p className="text-sm font-medium text-accent">
          {clinicians.length} people &middot; Registration numbers published
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Who you will meet.
        </h1>
        <p className="mt-7 max-w-[54ch] border-t border-line pt-7 text-lg leading-relaxed text-ink-muted">
          Registration numbers are listed so you can verify every clinician independently. Languages
          are listed because needing an interpreter should not mean bringing your own.
        </p>
      </header>

      <ul className="mt-14 grid gap-6 lg:grid-cols-2">
        {clinicians.map((clinician) => (
          <li key={clinician.name} className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <article>
              <div className="flex items-start gap-5">
                {/* Initials, not a stock headshot. */}
                <span
                  aria-hidden="true"
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-accent-soft text-lg font-medium text-accent"
                >
                  {clinician.initials}
                </span>
                <div>
                  <h2 className="text-xl font-medium leading-snug">{clinician.name}</h2>
                  <p className="mt-1.5 text-sm text-accent">{clinician.role}</p>
                  <p className="mt-1.5 text-xs text-ink-faint">
                    {clinician.registration === "—"
                      ? "Non-clinical role"
                      : `Registration ${clinician.registration}`}
                  </p>
                </div>
              </div>

              <p className="mt-7 leading-relaxed text-ink-muted">{clinician.bio}</p>

              <dl className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                    Focus
                  </dt>
                  <dd className="mt-2.5 text-sm">{clinician.focus}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                    Languages
                  </dt>
                  <dd className="mt-2.5 text-sm">{clinician.languages.join(", ")}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                    Qualifications
                  </dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {clinician.qualifications.map((qualification) => (
                        <li
                          key={qualification}
                          className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-muted"
                        >
                          {qualification}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-2xl bg-surface-sunken p-8 sm:p-12">
        <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
          You can ask for a specific person
        </h2>
        <p className="mt-5 max-w-[58ch] leading-relaxed text-ink-muted">
          If you get on with one clinician, say so when you book and we will put you with them every
          time. For nervous patients this matters more than almost anything else we do, and it costs
          nothing to arrange. If you would prefer a woman or a man for any reason, just tell us
          &mdash; no explanation needed.
        </p>
      </section>
    </div>
  );
}
