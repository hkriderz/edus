import { buildMetadata } from "@/lib/metadata";
import { coaches, schedule } from "../data";

export const metadata = buildMetadata({
  title: "Coaches — Northside Barbell (EDUS demo)",
  description:
    "The full coaching roster with certifications and competition bests. A demonstration build by EDUS Media.",
  path: "/demo/northside-barbell/coaches/",
});

export default function CoachesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 pb-28 sm:px-8">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
        {coaches.length} coaches &middot; {schedule.filter((slot) => slot.coach !== "—").length} coached sessions a week
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] uppercase leading-[0.84] tracking-[-0.045em]">
        THE ROSTER
      </h1>
      <p className="mt-8 max-w-[54ch] border-t-2 border-ink pt-7 leading-relaxed text-ink-muted">
        Everyone here competes or has competed. Certifications are listed in full because they are
        checkable, and bests are listed because in this sport they are the only credential that
        cannot be bought.
      </p>

      <ul className="mt-14 space-y-px bg-line">
        {coaches.map((coach) => (
          <li key={coach.name} className="bg-surface">
            <article className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                {/* Initials monogram rather than a stock gym portrait. */}
                <span
                  aria-hidden="true"
                  className="grid h-24 w-24 place-items-center border-2 border-accent font-display text-3xl tracking-[-0.03em] text-accent"
                >
                  {coach.initials}
                </span>
                <p className="mt-6 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Coaching since {coach.since}
                </p>
              </div>

              <div className="lg:col-span-5">
                <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] uppercase leading-[0.95] tracking-[-0.03em]">
                  {coach.name}
                </h2>
                <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                  {coach.role}
                </p>
                <p className="mt-6 max-w-[52ch] leading-relaxed text-ink-muted">{coach.bio}</p>

                <h3 className="mt-8 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Certifications
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {coach.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="border border-line px-2.5 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-muted"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <h3 className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Competition bests
                </h3>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {coach.best.map((entry) => (
                    <div
                      key={entry.lift}
                      className="flex items-baseline justify-between gap-5 py-3.5"
                    >
                      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                        {entry.lift}
                      </dt>
                      <dd className="font-display text-2xl leading-none tracking-[-0.03em]">
                        {entry.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
