"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { formatCents, getProduct, priceForSize, type BagSize, type Grind } from "./data";

export type CartLine = {
  /** Composite key: a product in a different grind or size is a separate line. */
  id: string;
  slug: string;
  grind: Grind;
  size: BagSize;
  quantity: number;
};

type CartState = { lines: CartLine[] };

type CartAction =
  | { type: "add"; slug: string; grind: Grind; size: BagSize; quantity: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "fathom-cart";
const MAX_QUANTITY_PER_LINE = 12;

function lineId(slug: string, grind: Grind, size: BagSize): string {
  return `${slug}__${grind}__${size}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };

    case "add": {
      const id = lineId(action.slug, action.grind, action.size);
      const existing = state.lines.find((line) => line.id === id);

      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.id === id
              ? {
                  ...line,
                  quantity: Math.min(line.quantity + action.quantity, MAX_QUANTITY_PER_LINE),
                }
              : line,
          ),
        };
      }

      return {
        lines: [
          ...state.lines,
          {
            id,
            slug: action.slug,
            grind: action.grind,
            size: action.size,
            quantity: Math.min(action.quantity, MAX_QUANTITY_PER_LINE),
          },
        ],
      };
    }

    case "setQuantity": {
      // Dropping to zero removes the line, which is what every shopper expects
      // from a quantity stepper.
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((line) => line.id !== action.id) };
      }
      return {
        lines: state.lines.map((line) =>
          line.id === action.id
            ? { ...line, quantity: Math.min(action.quantity, MAX_QUANTITY_PER_LINE) }
            : line,
        ),
      };
    }

    case "remove":
      return { lines: state.lines.filter((line) => line.id !== action.id) };

    case "clear":
      return { lines: [] };
  }
}

/** Discards anything that no longer matches a real product or a known variant. */
function parseStoredLines(raw: string): CartLine[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.flatMap((entry): CartLine[] => {
    if (typeof entry !== "object" || entry === null) return [];
    const candidate = entry as Partial<CartLine>;

    if (
      typeof candidate.slug !== "string" ||
      typeof candidate.grind !== "string" ||
      typeof candidate.size !== "string" ||
      typeof candidate.quantity !== "number" ||
      !getProduct(candidate.slug)
    ) {
      return [];
    }

    return [
      {
        id: lineId(candidate.slug, candidate.grind as Grind, candidate.size as BagSize),
        slug: candidate.slug,
        grind: candidate.grind as Grind,
        size: candidate.size as BagSize,
        quantity: Math.max(1, Math.min(Math.floor(candidate.quantity), MAX_QUANTITY_PER_LINE)),
      },
    ];
  });
}

type CartContextValue = {
  lines: readonly CartLine[];
  itemCount: number;
  subtotalCents: number;
  subtotalLabel: string;
  isDrawerOpen: boolean;
  addItem: (slug: string, grind: Grind, size: BagSize, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Client-side cart for the Fathom Coffee demo.
 *
 * Deliberately has no server: state lives in a reducer and is mirrored to
 * sessionStorage, which demonstrates a genuinely working cart on a fully static
 * site. sessionStorage rather than localStorage so the demo resets when the tab
 * closes instead of surprising the next visitor.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate after mount. Reading storage during render would break SSR and
  // cause a hydration mismatch. Persistence is gated on `hasHydrated` so the
  // empty initial state cannot overwrite a saved bag on the first paint.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: parseStoredLines(raw) });
    } catch (error) {
      // Corrupt or blocked storage must not break the shop.
      console.error("[fathom-cart] could not restore cart", {
        name: error instanceof Error ? error.name : "unknown",
      });
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // Storage unavailable: the cart still works for this page view.
    }
  }, [hasHydrated, state.lines]);

  // Escape closes the drawer; the listener only exists while it is open.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((total, line) => total + line.quantity, 0);

    const subtotalCents = state.lines.reduce((total, line) => {
      const product = getProduct(line.slug);
      if (!product) return total;
      return total + priceForSize(product, line.size) * line.quantity;
    }, 0);

    return {
      lines: state.lines,
      itemCount,
      subtotalCents,
      subtotalLabel: formatCents(subtotalCents),
      isDrawerOpen,
      addItem: (slug, grind, size, quantity = 1) => {
        dispatch({ type: "add", slug, grind, size, quantity });
        setDrawerOpen(true);
      },
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clearCart: () => dispatch({ type: "clear" }),
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [state.lines, isDrawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider.");
  }
  return context;
}

/** Resolves cart lines to products and prices so the drawer and the cart page
 *  render identical figures from one place. */
export function useCartLineDetails() {
  const { lines } = useCart();

  return useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.slug);
        if (!product) return [];
        const unitCents = priceForSize(product, line.size);
        return [
          {
            ...line,
            product,
            unitCents,
            unitLabel: formatCents(unitCents),
            lineLabel: formatCents(unitCents * line.quantity),
          },
        ];
      }),
    [lines],
  );
}
