import { buildMetadata } from "@/lib/metadata";
import { ReservationForm } from "../ReservationForm";

export const metadata = buildMetadata({
  title: "Reservations — Rosalía (EDUS demo)",
  description:
    "Request a table in three taps, with no account to create. A demonstration build by EDUS Media.",
  path: "/demo/rosalia/reservations/",
});

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 pb-28 sm:px-8">
      <header className="text-center">
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-ink-faint">
          No account, no app, three taps
        </p>
        <h1 className="mt-7 font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9]">
          Reserve a table
        </h1>
        <p className="mx-auto mt-8 max-w-[48ch] border-t border-line pt-7 leading-relaxed text-ink-muted">
          Party size, then the evening, then your name. We hold eight seats at the bar for walk-ins
          every service, so if nothing suits here it is still worth turning up.
        </p>
      </header>

      <div className="mt-12">
        <ReservationForm />
      </div>

      <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
        {[
          {
            heading: "Confirmation",
            body: "By text within two hours during service, or by 10:00 the next morning for late requests. We do not hold tables without a confirmation.",
          },
          {
            heading: "Cancellations",
            body: "Free up to four hours before. Parties of six or more cancelled on the day are charged $25 per head, because the kitchen has already bought for you.",
          },
          {
            heading: "Running late",
            body: "Call us. We hold the table fifteen minutes past the booking without question, and longer if you let us know.",
          },
        ].map((item) => (
          <article key={item.heading} className="bg-surface p-7">
            <h2 className="font-display text-xl leading-snug">{item.heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
