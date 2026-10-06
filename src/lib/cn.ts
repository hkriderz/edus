type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge`: the
 * component API here passes explicit overrides rather than relying on
 * conflict resolution, so the extra dependencies would not earn their weight.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter((value) => typeof value === "string" && value.length > 0).join(" ");
}
