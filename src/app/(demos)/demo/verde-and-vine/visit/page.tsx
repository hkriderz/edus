import { buildMetadata } from "@/lib/metadata";
import { workshops } from "../data";

export const metadata = buildMetadata({
  title: "Visit — Verde & Vine (EDUS demo)",
  description:
    "Hours, parking, transit directions and accessibility notes for Verde & Vine. A demonstration build by EDUS Media.",
  path: "/demo/verde-and-vine/visit/",
});

const hours = [
  { day: "Monday", time: "Closed", closed: true },
  { day: "Tuesday", time: "9:00 – 18:00", closed: false },
  { day: "Wednesday", time: "9:00 – 18:00", closed: false },
  { day: "Thursday", time: "9:00 – 18:00", closed: false },
  { day: "Friday", time: "9:00 – 18:00", closed: false },
  { day: "Saturday", time: "8:00 – 17:00", closed: false },
  { day: "Sunday", time: "8:00 – 17:00", closed: false },
];

export default function VisitPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
            214 Nursery Lane
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
            Come and see it in person.
          </h1>
          <p className="mt-8 max-w-[52ch] border-t border-line pt-7 leading-relaxed text-ink-muted">
            Three of the four questions we are asked on the phone are answered on this page. The
            fourth is &ldquo;will this survive in my bathroom&rdquo;, and for that you should bring us
            a photo of the bathroom.
          </p>
        </div>
      </section>

      <section id="hours" className="border-b border-line scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)]">Opening hours</h2>
            <table className="mt-8 w-full border-collapse border border-line text-sm">
              <caption className="sr-only">Opening hours for Verde &amp; Vine</caption>
              <tbody>
                {hours.map((entry) => (
                  <tr key={entry.day} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-3.5 text-left font-normal">
                      {entry.day}
                    </th>
                    <td
                      className={
                        entry.closed
                          ? "px-5 py-3.5 text-right font-mono text-xs uppercase tracking-[0.1em] text-ink-faint"
                          : "px-5 py-3.5 text-right font-mono text-xs"
                      }
                    >
                      {entry.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              The café stops serving lunch at 15:00 and hot drinks thirty minutes before the shop
              closes. We close entirely on Mondays so the plants get a quiet day.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Schematic map drawn in CSS — a real build would embed a provider
                map, which is deliberately avoided here to keep the demo
                dependency-free and free of third-party cookies. */}
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)]">Getting here</h2>
            <div
              aria-hidden="true"
              className="mt-8 aspect-[16/9] w-full border border-line"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(90deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 42px), radial-gradient(22% 22% at 38% 54%, var(--accent) 0%, transparent 60%), linear-gradient(104deg, transparent 46%, var(--moss) 46%, var(--moss) 52%, transparent 52%)",
              }}
            />
            <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
              Schematic only. Nursery Lane runs north from the Foothill Boulevard junction.
            </p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Parking
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Six free spaces at the side of the building, including one accessible bay. Street
                  parking on Nursery Lane is unrestricted after 09:00.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Transit
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Route 61 stops at Foothill &amp; Nursery, a four-minute walk. The walk is flat and
                  fully paved.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Accessibility
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Step-free entrance, 90cm aisles throughout the shop, accessible toilet. The café
                  has two tables at wheelchair height.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 pb-28 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)]">While you are here</h2>

          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                heading: "Free plant triage",
                body: "Bring a struggling plant any weekday afternoon and we will diagnose it at the counter. No charge, no appointment.",
              },
              {
                heading: "Repotting while you wait",
                body: "Buy a pot and we will repot your plant properly before you leave. Soil and labour included.",
              },
              {
                heading: "We will hold it",
                body: "Pay in store and collect within a week. Useful if you walked or came by bus and bought something enormous.",
              },
              {
                heading: `${workshops.length} workshops running`,
                body: "Repotting, propagation, terrariums and winter triage. Capacity and remaining places are listed on the homepage.",
              },
            ].map((item) => (
              <article key={item.heading} className="bg-surface p-7">
                <h3 className="font-display text-xl leading-snug">{item.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
