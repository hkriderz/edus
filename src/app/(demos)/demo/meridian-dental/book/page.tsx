import { buildMetadata } from "@/lib/metadata";
import { BookingForm } from "../BookingForm";

export const metadata = buildMetadata({
  title: "Book a visit — Meridian Dental (EDUS demo)",
  description:
    "Request an appointment with accessible, fully-announced form validation. A demonstration build by EDUS Media.",
  path: "/demo/meridian-dental/book/",
});

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 pb-28 sm:px-8">
      <header>
        <p className="text-sm font-medium text-accent">No deposit &middot; No obligation</p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Request an appointment.
        </h1>
        <p className="mt-7 max-w-[54ch] border-t border-line pt-7 text-lg leading-relaxed text-ink-muted">
          We will reply with two or three times to choose from. Nothing is confirmed until you pick
          one, and changing your mind at any point is completely fine.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <BookingForm />
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-accent bg-accent-soft p-7">
            <h2 className="text-lg font-medium">In pain right now?</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Do not use this form. Call us on{" "}
              <a href="tel:+19095550133" className="font-medium underline underline-offset-[3px]">
                (909) 555-0133
              </a>
              . We hold same-day slots every morning and afternoon, and we will fit you in.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-line p-7">
            <h2 className="text-lg font-medium">Opening hours</h2>
            <table className="mt-5 w-full text-sm">
              <caption className="sr-only">Opening hours for Meridian Dental</caption>
              <tbody>
                {[
                  { day: "Monday – Thursday", time: "08:00 – 18:00" },
                  { day: "Friday", time: "08:00 – 15:00" },
                  { day: "Saturday", time: "09:00 – 13:00" },
                  { day: "Sunday", time: "Closed" },
                ].map((row) => (
                  <tr key={row.day} className="border-b border-line last:border-b-0">
                    <th scope="row" className="py-3 text-left font-normal text-ink-muted">
                      {row.day}
                    </th>
                    <td className="py-3 text-right">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-line p-7">
            <h2 className="text-lg font-medium">Access</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li>Step-free entrance from the car park, no threshold.</li>
              <li>Accessible WC with a transfer rail on the left.</li>
              <li>Hearing loop at reception and in both surgeries.</li>
              <li>
                Two accessible parking bays directly outside. Tell us when you book and we will keep
                one free.
              </li>
              <li>A quiet room is available if the waiting area is too much.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
