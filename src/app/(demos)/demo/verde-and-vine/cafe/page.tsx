import { buildMetadata } from "@/lib/metadata";
import { cafeMenu } from "../data";

export const metadata = buildMetadata({
  title: "Café — Verde & Vine (EDUS demo)",
  description:
    "Coffee, a daily bake and lunch until three, served among the stock plants. A demonstration build by EDUS Media.",
  path: "/demo/verde-and-vine/cafe/",
});

export default function CafePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
            Twelve seats, through the back
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
            The café.
          </h1>
          <p className="mt-8 max-w-[52ch] border-t border-line pt-7 leading-relaxed text-ink-muted">
            The bake starts at six and is usually gone by eleven. Lunch runs until three. You are
            welcome to sit for as long as you like, and you do not have to buy a plant on the way out.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 pb-28 sm:px-8">
          {cafeMenu.map((section) => (
            <div key={section.section} className="mb-16 last:mb-0">
              <h2 className="border-b border-line-strong pb-4 font-display text-[clamp(1.5rem,3.2vw,2.25rem)]">
                {section.section}
              </h2>

              <ul className="divide-y divide-line">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-6 py-6 sm:gap-10"
                  >
                    <div>
                      <h3 className="font-display text-xl leading-snug sm:text-2xl">{item.name}</h3>
                      <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-base">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="border border-line bg-surface-sunken p-7 sm:p-9">
            <h2 className="font-display text-2xl">A few practical notes</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="font-medium text-ink">Oat milk is the default</strong> and there is
                no charge for it. Whole milk is available on request.
              </li>
              <li>
                <strong className="font-medium text-ink">Everything on the lunch menu is
                vegetarian.</strong> Vegan versions of the galette and salad are available &mdash; ask
                at the counter.
              </li>
              <li>
                <strong className="font-medium text-ink">We cannot guarantee allergen
                separation</strong> in a kitchen this small. Please tell us before you order and we
                will be honest about what we can do.
              </li>
              <li>
                <strong className="font-medium text-ink">No laptops after midday on weekends.</strong>{" "}
                There are twelve seats and people want to eat in them.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
