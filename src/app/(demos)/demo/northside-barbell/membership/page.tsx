import { buildMetadata } from "@/lib/metadata";
import { memberships } from "../data";

export const metadata = buildMetadata({
  title: "Membership — Northside Barbell (EDUS demo)",
  description:
    "Three membership tiers with no joining fee and no annual contract, plus a free trial session. A demonstration build by EDUS Media.",
  path: "/demo/northside-barbell/membership/",
});

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 pb-28 sm:px-8">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
        No joining fee &middot; No annual contract
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] uppercase leading-[0.84] tracking-[-0.045em]">
        MEMBERSHIP
      </h1>
      <p className="mt-8 max-w-[54ch] border-t-2 border-ink pt-7 leading-relaxed text-ink-muted">
        Three tiers, listed with what each one excludes as well as what it includes. Cancel with
        thirty days&rsquo; notice in writing. We will not make you phone a retention line.
      </p>

      <div className="mt-14 grid gap-px bg-line lg:grid-cols-3">
        {memberships.map((plan) => (
          <article
            key={plan.name}
            className={
              plan.featured
                ? "flex flex-col border-2 border-accent bg-surface-raised p-8 lg:p-10"
                : "flex flex-col bg-surface p-8 lg:p-10"
            }
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold uppercase tracking-[0.02em]">{plan.name}</h2>
              {plan.featured ? (
                <span className="shrink-0 bg-accent px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-accent-contrast">
                  Most members
                </span>
              ) : null}
            </div>

            <p className="mt-7 font-display text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none tracking-[-0.05em] text-accent">
              {plan.price}
            </p>
            <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              {plan.cadence}
            </p>

            <h3 className="mt-9 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              Included
            </h3>
            <ul className="mt-4 flex-1 space-y-3">
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="shrink-0 text-accent">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Exclusions given equal visual weight to inclusions. */}
            <h3 className="mt-8 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              Not included
            </h3>
            <ul className="mt-4 space-y-3">
              {plan.excludes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-faint">
                  <span aria-hidden="true" className="shrink-0">
                    &minus;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section id="trial" className="mt-16 scroll-mt-24 border-2 border-accent">
        <div className="grid gap-px bg-line lg:grid-cols-12">
          <div className="bg-surface p-8 lg:col-span-5 lg:p-10">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[0.9] tracking-[-0.035em]">
              FIRST SESSION
              <br />
              <span className="text-accent">FREE</span>
            </h2>
            <p className="mt-7 leading-relaxed text-ink-muted">
              You will be coached, not assessed. Nobody films you, nobody weighs you, and nobody asks
              about your goals until you bring them up. If it is not for you, that is a perfectly
              normal outcome and we will say so.
            </p>
          </div>

          <div className="bg-surface p-8 lg:col-span-7 lg:p-10">
            {/* Demonstration form: inert by design. A production build would wire
                this to the gym's booking provider. */}
            {/* Not a <form>: there is nothing to submit to, and a real form
                element would reload the page on Enter. The controls are kept
                genuine so the layout and focus order can be evaluated. */}
            <div
              className="space-y-6"
              role="group"
              aria-label="Free trial session enquiry"
              aria-describedby="trial-demo-note"
            >
              <p
                id="trial-demo-note"
                className="border border-line bg-surface-sunken p-4 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-ink-muted"
              >
                Demonstration form &mdash; not connected to a booking system.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                    Phone
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className="w-full border border-line bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Which session suits you?
                </span>
                <select
                  name="session"
                  className="w-full appearance-none border border-line bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none"
                >
                  <option>Beginner Barbell — Saturday 09:30</option>
                  <option>Lunch Lift — weekdays 12:00</option>
                  <option>Barbell Strength — weekdays 05:30</option>
                  <option>Conditioning — Tue/Thu 18:30</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  What have you lifted before?
                </span>
                <textarea
                  name="experience"
                  rows={3}
                  className="w-full resize-y border border-line bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  placeholder="Nothing at all is a completely fine answer."
                />
              </label>

              <button
                type="button"
                className="w-full border-2 border-accent bg-accent px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-contrast transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Book the free session
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
