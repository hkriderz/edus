import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { cafeMenu, plants, workshops } from "./data";

export const metadata = buildMetadata({
  title: "Verde & Vine — plant shop & garden café (EDUS demo)",
  description:
    "A demonstration build by EDUS Media: a neighbourhood plant shop and garden café, with a catalogue organised by light level and difficulty rather than by species.",
  path: "/demo/verde-and-vine/",
});

const forgiving = plants.filter((plant) => plant.difficulty === "Forgiving").slice(0, 4);
const openWorkshops = workshops.filter((workshop) => workshop.booked < workshop.capacity).length;

export default function VerdeAndVineHome() {
  return (
    <>
      {/* Hero: botanical arch drawn in CSS, no photography. */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-full w-[46rem] opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 35%, var(--moss) 0%, transparent 70%), radial-gradient(40% 40% at 70% 70%, var(--accent) 0%, transparent 72%)",
            filter: "blur(2px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-muted">
            214 Nursery Lane &middot; Open Tuesday to Sunday
          </p>

          <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92]">
            Buy the plant you can
            <br />
            <span className="text-accent">actually keep alive.</span>
          </h1>

          <p className="mt-10 max-w-[48ch] border-t border-line pt-8 text-lg leading-relaxed text-ink-muted">
            Everything in the shop is filed by how much light it needs and how much attention it
            wants &mdash; not by Latin name. Tell us about your window and we will point you at the
            right shelf. Then sit down in the back and have a coffee about it.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demo/verde-and-vine/catalogue/"
              className="border border-accent bg-accent px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Browse by light level
            </Link>
            <Link
              href="/demo/verde-and-vine/cafe/"
              className="border border-line-strong px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
            >
              See the café menu
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-px border border-line bg-line">
            {[
              { value: `${plants.length}`, label: "Plants in stock" },
              { value: `${openWorkshops}`, label: "Workshops with space" },
              { value: "6am", label: "Daily bake starts" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface p-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl leading-none">{stat.value}</span>
                  <span className="mt-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Start-here triage, which is how staff actually talk to customers. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-tight">
            Start with your window.
          </h2>

          <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
            {[
              {
                light: "Low light",
                heading: "North-facing, or a hallway",
                body: "No direct sun ever reaches it. Plenty still thrives here — the trick is choosing something that was never expecting sun.",
                count: plants.filter((plant) => plant.light === "Low light").length,
              },
              {
                light: "Bright indirect",
                heading: "Near a window, out of the beam",
                body: "The most common situation in a home, and the sweet spot for most foliage plants. Widest choice by far.",
                count: plants.filter((plant) => plant.light === "Bright indirect").length,
              },
              {
                light: "Full sun",
                heading: "South-facing, sun on the sill",
                body: "Hot, bright and drying. Mediterranean plants and succulents love it; almost nothing else will cope.",
                count: plants.filter((plant) => plant.light === "Full sun").length,
              },
            ].map((option) => (
              <article key={option.light} className="flex flex-col bg-surface p-8">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                  {option.light}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-snug">{option.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{option.body}</p>
                <p className="mt-auto pt-7 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                  {option.count} plants &middot;{" "}
                  <Link href="/demo/verde-and-vine/catalogue/" className="text-accent hover:underline">
                    Browse
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Forgiving picks: the shelf staff point beginners at. */}
      <section className="border-b border-line bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
                If you have killed one before
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.875rem,4vw,3rem)] leading-tight">
                The forgiving shelf.
              </h2>
            </div>
            <Link
              href="/demo/verde-and-vine/catalogue/"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] underline decoration-1 underline-offset-[5px] hover:text-accent"
            >
              All {plants.length} plants
            </Link>
          </div>

          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {forgiving.map((plant) => (
              <li key={plant.slug} className="flex flex-col bg-surface">
                {/* Generated leaf form: each plant gets a deterministic silhouette
                    derived from its name length, so no two look identical. */}
                <div
                  aria-hidden="true"
                  className="aspect-[4/3] w-full border-b border-line"
                  style={{
                    background: `radial-gradient(${55 + plant.name.length}% ${70 + plant.latin.length}% at 50% 90%, var(--moss) 0%, transparent 68%), var(--surface-sunken)`,
                  }}
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-snug">{plant.name}</h3>
                  <p className="mt-1.5 text-xs italic text-ink-faint">{plant.latin}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{plant.note}</p>
                  <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-5 font-mono text-[0.5625rem] uppercase tracking-[0.12em]">
                    <div>
                      <dt className="text-ink-faint">Water</dt>
                      <dd className="mt-1.5 tracking-normal">{plant.water}</dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-ink-faint">Price</dt>
                      <dd className="mt-1.5 font-display text-base tracking-normal">
                        {plant.price}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Café teaser — proving the two businesses share one site. */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
              Through the back
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.875rem,4vw,3rem)] leading-tight">
              Yes, you can just have a coffee.
            </h2>
            <p className="mt-7 max-w-[46ch] leading-relaxed text-ink-muted">
              Twelve seats among the stock plants, a bake that starts at six and usually sells out by
              eleven, and lunch until three. You do not have to buy a plant. Most people end up doing
              both, which is the entire business model.
            </p>
            <Link
              href="/demo/verde-and-vine/cafe/"
              className="mt-9 inline-block border border-line-strong px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
            >
              Full café menu
            </Link>
          </div>

          <div className="border border-line">
            <p className="border-b border-line bg-surface-sunken px-6 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
              {cafeMenu[1]?.section}
            </p>
            <ul className="divide-y divide-line">
              {cafeMenu[1]?.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-6 px-6 py-4">
                  <span>
                    <span className="block font-display text-lg">{item.name}</span>
                    <span className="mt-1 block text-xs text-ink-faint">{item.description}</span>
                  </span>
                  <span className="shrink-0 font-mono text-sm">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Workshops with real capacity signals. */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 pb-28 sm:px-8">
          <h2 className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-tight">
            Workshops in the back room.
          </h2>

          <ul className="mt-12 border-t border-line">
            {workshops.map((workshop) => {
              const remaining = workshop.capacity - workshop.booked;
              const isFull = remaining <= 0;

              return (
                <li
                  key={workshop.title}
                  className="grid gap-4 border-b border-line py-7 lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent">
                      {workshop.date}
                    </p>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                      {workshop.time}
                    </p>
                  </div>

                  <div className="lg:col-span-6">
                    <h3 className="font-display text-xl leading-snug">{workshop.title}</h3>
                    <p className="mt-2.5 max-w-[56ch] text-sm leading-relaxed text-ink-muted">
                      {workshop.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 lg:text-right">
                    <p className="font-display text-xl">{workshop.price}</p>
                    {/* Capacity as a filled bar plus text, never colour alone. */}
                    <div className="mt-3 lg:flex lg:justify-end">
                      <div
                        className="h-1 w-full max-w-[9rem] bg-line"
                        role="img"
                        aria-label={`${workshop.booked} of ${workshop.capacity} places taken`}
                      >
                        <div
                          className={isFull ? "h-full bg-ink-faint" : "h-full bg-accent"}
                          style={{ width: `${(workshop.booked / workshop.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                      {isFull ? "Fully booked — join waitlist" : `${remaining} places left`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
