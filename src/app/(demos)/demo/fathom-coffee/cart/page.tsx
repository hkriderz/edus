import { buildMetadata } from "@/lib/metadata";
import { CartPageContents } from "../CartPageContents";

export const metadata = buildMetadata({
  title: "Your bag — Fathom Coffee Roasters (EDUS demo)",
  description:
    "A working client-side cart on a fully static site: variant pricing, quantity editing and a free-shipping threshold. A demonstration build by EDUS Media.",
  path: "/demo/fathom-coffee/cart/",
});

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8">
      <header className="mb-12">
        <p className="eyebrow text-accent">Step 1 of 2</p>
        <h1 className="optical-left mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em]">
          Your bag.
        </h1>
      </header>

      <CartPageContents />
    </div>
  );
}
