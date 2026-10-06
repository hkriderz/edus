import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { buildMetadata } from "@/lib/metadata";
import { coaches, gymRecords, memberships, schedule } from "./data";

export const metadata = buildMetadata({
  title: "Northside Barbell — strength & conditioning (EDUS demo)",
  description:
    "A demonstration build by EDUS Media: an unapologetically brutalist site for a barbell gym, with a timetable designed to be read at arm's length from a squat rack.",
  path: "/demo/northside-barbell/",
});

const todaySlots = schedule.filter((slot) => slot.day === "Monday");

export default function NorthsideBarbellHome() {
  return (
    <>
      {/* Hero: typography is the entire visual. No gym photography anywhere. */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
            Unit 7, Ironworks Court &middot; Est. 2017
          </p>

          <h1 className="mt-7 font-display text-[clamp(3rem,13.5vw,11rem)] uppercase leading-[0.8] tracking-[-0.045em]">
            LIFT
            <br />
            HEAVY
            <br />
            <span className="text-accent">THINGS</span>
          </h1>

          <div className="mt-12 grid gap-8 border-t-2 border-ink pt-10 lg:grid-cols-12">
            <p className="text-lg leading-relaxed text-ink-muted lg:col-span-6">
              Concrete floors, nine platforms, calibrated bars and no mirrors. We coach the squat,
              bench, deadlift and the overhead press, and we do not run a smoothie bar. If you want an
              experience, this is the wrong gym. If you want a bigger total, it is the right one.
            </p>

            <div className="lg:col-span-6 lg:pl-10">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo/northside-barbell/membership/#trial"
                  className="border-2 border-accent bg-accent px-7 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  Book a free session
                </Link>
                <Link
                  href="/demo/northside-barbell/schedule/"
                  className="border-2 border-ink px-7 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
                >
                  See the timetable
                </Link>
              </div>

              <p className="mt-7 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-ink-faint">
                First session is free and un-pressured. No contract, no joining fee, cancel with
                thirty days&rsquo; notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers as the dominant visual element. */}
      <section className="border-b-2 border-ink">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {[
            { value: "9", label: "Competition platforms" },
            { value: "4.1M", label: "Kilos lifted here in 2025" },
            { value: "41", label: "Members who competed" },
            { value: "0", label: "Mirrors on the walls" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-9 sm:px-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.82] tracking-[-0.05em] text-accent">
                  {stat.value}
                </span>
                <span className="mt-5 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Marquee items={[...gymRecords]} durationSeconds={46} separator="//" className="border-y-0 border-b-2 border-ink" />

      {/* Today's timetable — the thing members actually open the site for. */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-[0.88] tracking-[-0.03em]">
              TODAY
              <span className="text-accent">/</span>
              MONDAY
            </h2>
            <Link
              href="/demo/northside-barbell/schedule/"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] underline decoration-2 underline-offset-[5px] hover:text-accent"
            >
              Full week
            </Link>
          </div>

          <ul className="mt-10 border-t-2 border-ink">
            {todaySlots.map((slot) => {
              const remaining = slot.capacity - slot.booked;
              const isFull = remaining <= 0;
              const fillPercent = Math.round((slot.booked / slot.capacity) * 100);

              return (
                <li
                  key={`${slot.day}-${slot.time}-${slot.name}`}
                  className="grid grid-cols-2 items-center gap-4 border-b border-line py-5 lg:grid-cols-12"
                >
                  {/* Oversized numerals: legible at arm's length. */}
                  <span className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[-0.04em] lg:col-span-2">
                    {slot.time}
                  </span>

                  <span className="text-right text-lg font-medium lg:col-span-4 lg:text-left lg:text-xl">
                    {slot.name}
                  </span>

                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted lg:col-span-2">
                    {slot.coach === "—" ? "Unstaffed" : `Coach ${slot.coach}`}
                  </span>

                  <div className="col-span-2 lg:col-span-4 lg:flex lg:items-center lg:justify-end lg:gap-5">
                    <div
                      className="h-2 w-full border border-line lg:w-32"
                      role="img"
                      aria-label={`${slot.booked} of ${slot.capacity} places taken`}
                    >
                      <div
                        className={isFull ? "h-full bg-ink-faint" : "h-full bg-accent"}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                    <span className="mt-2 block shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-muted lg:mt-0 lg:w-28 lg:text-right">
                      {isFull ? "Full — waitlist" : `${remaining} spaces`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* What we do / what we do not. Filters enquiries before the phone rings. */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-2">
          <div className="bg-surface px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-accent">
              WHAT WE HAVE
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Nine competition platforms with calibrated plates",
                "Fourteen bars, including deadlift and squat specific",
                "Coached classes at 05:30, midday and evening",
                "Technique Lab capped at eight people",
                "Competition handling for anyone entering a meet",
                "Chalk. Actual chalk, not a liquid substitute.",
              ].map((item) => (
                <li key={item} className="flex gap-4 text-sm leading-relaxed">
                  <span aria-hidden="true" className="shrink-0 font-mono text-accent">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-ink-faint">
              WHAT WE DO NOT
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Mirrors, anywhere in the building",
                "A smoothie bar, sauna or towel service",
                "Twelve-month contracts or joining fees",
                "Classes set to a playlist you cannot turn down",
                "Transformation challenges or before-and-after photos",
                "Any machine with a diagram printed on it",
              ].map((item) => (
                <li key={item} className="flex gap-4 text-sm leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="shrink-0 font-mono text-ink-faint">
                    &minus;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Coaches strip. */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-[0.88] tracking-[-0.03em]">
              THE COACHES
            </h2>
            <Link
              href="/demo/northside-barbell/coaches/"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] underline decoration-2 underline-offset-[5px] hover:text-accent"
            >
              Full roster
            </Link>
          </div>

          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {coaches.map((coach) => (
              <li key={coach.name} className="bg-surface p-7">
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center border-2 border-accent font-display text-xl text-accent"
                >
                  {coach.initials}
                </span>
                <h3 className="mt-6 text-lg font-semibold uppercase tracking-[0.01em]">
                  {coach.name}
                </h3>
                <p className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent">
                  {coach.role}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{coach.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Membership summary. */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-14 pb-28 sm:px-8">
          <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-[0.88] tracking-[-0.03em]">
            MEMBERSHIP
          </h2>

          <div className="mt-10 grid gap-px bg-line lg:grid-cols-3">
            {memberships.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.featured
                    ? "flex flex-col border-2 border-accent bg-surface-raised p-8"
                    : "flex flex-col bg-surface p-8"
                }
              >
                <h3 className="text-xl font-semibold uppercase tracking-[0.02em]">{plan.name}</h3>
                <p className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.045em] text-accent">
                  {plan.price}
                </p>
                <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  {plan.cadence}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="shrink-0 text-accent">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo/northside-barbell/membership/"
                  className={
                    plan.featured
                      ? "mt-9 border-2 border-accent bg-accent px-6 py-3.5 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-contrast transition-colors hover:bg-accent-hover"
                      : "mt-9 border-2 border-ink px-6 py-3.5 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
                  }
                >
                  Compare plans
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
