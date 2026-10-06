import { buildMetadata } from "@/lib/metadata";
import { CatalogueBrowser } from "../CatalogueBrowser";

export const metadata = buildMetadata({
  title: "Catalogue — Verde & Vine (EDUS demo)",
  description:
    "Browse plants by light level, difficulty and pet safety. A demonstration build by EDUS Media.",
  path: "/demo/verde-and-vine/catalogue/",
});

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 pb-28 sm:px-8">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
        The shop
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
        Filed by light, then by how fussy it is.
      </h1>
      <p className="mt-8 max-w-[52ch] border-t border-line pt-7 leading-relaxed text-ink-muted">
        Latin names are on every card, but they are not how you should shop. Start with the window
        you have, then decide how much of a routine you are honestly willing to keep.
      </p>

      <div className="mt-12">
        <CatalogueBrowser />
      </div>
    </div>
  );
}
