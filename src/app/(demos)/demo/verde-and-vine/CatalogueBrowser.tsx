"use client";

import { useMemo, useState } from "react";
import { difficulties, lightLevels, plants, type Difficulty, type Light } from "./data";

type LightFilter = Light | "all";
type DifficultyFilter = Difficulty | "all";

/**
 * Faceted browse. Filtering runs in memory over a twelve-item catalogue, so
 * there is no need for URL state or a server round trip — but the result count
 * is announced in a live region so the change is not silent for screen readers.
 */
export function CatalogueBrowser() {
  const [light, setLight] = useState<LightFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [petSafeOnly, setPetSafeOnly] = useState(false);

  const visible = useMemo(
    () =>
      plants.filter(
        (plant) =>
          (light === "all" || plant.light === light) &&
          (difficulty === "all" || plant.difficulty === difficulty) &&
          (!petSafeOnly || plant.petSafe),
      ),
    [light, difficulty, petSafeOnly],
  );

  const hasFilters = light !== "all" || difficulty !== "all" || petSafeOnly;

  function reset() {
    setLight("all");
    setDifficulty("all");
    setPetSafeOnly(false);
  }

  return (
    <>
      <section aria-labelledby="catalogue-filters" className="border border-line bg-surface-raised p-6 sm:p-8">
        <h2
          id="catalogue-filters"
          className="mb-7 border-b border-line pb-5 font-display text-xl leading-snug"
        >
          Narrow it down
        </h2>

        <FilterRow
          legend="How much light does the spot get?"
          options={[{ value: "all", label: "Any light" }, ...lightLevels.map((level) => ({ value: level, label: level }))]}
          selected={light}
          onSelect={(value) => setLight(value as LightFilter)}
        />

        <FilterRow
          legend="How much attention can you give it?"
          options={[
            { value: "all", label: "Any level" },
            ...difficulties.map((level) => ({ value: level, label: level })),
          ]}
          selected={difficulty}
          onSelect={(value) => setDifficulty(value as DifficultyFilter)}
          className="mt-7"
        />

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={petSafeOnly}
              onChange={(event) => setPetSafeOnly(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            Only show plants that are safe around cats and dogs
          </label>

          {hasFilters ? (
            <button
              type="button"
              onClick={reset}
              className="font-mono text-[0.625rem] uppercase tracking-[0.14em] underline decoration-1 underline-offset-[4px] hover:text-accent"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </section>

      {/* The visible count below doubles as the region's accessible name. */}
      <h2 className="sr-only">Matching plants</h2>
      <p role="status" aria-live="polite" className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
        Showing {visible.length} of {plants.length} plants
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 border border-line-strong bg-surface-sunken p-10 text-center">
          <p className="font-display text-2xl">Nothing matches that combination.</p>
          <p className="mx-auto mt-4 max-w-[48ch] text-sm leading-relaxed text-ink-muted">
            Full sun and pet safe is a genuinely hard ask. Come in and talk to us &mdash; we can
            usually suggest something close, or order it in for you.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 border border-line-strong px-5 py-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((plant) => (
            <li key={plant.slug} className="flex flex-col bg-surface">
              <div
                aria-hidden="true"
                className="aspect-[5/3] w-full border-b border-line"
                style={{
                  background: `radial-gradient(${52 + plant.name.length * 2}% ${64 + plant.latin.length}% at 50% 92%, var(--moss) 0%, transparent 70%), var(--surface-sunken)`,
                }}
              />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl leading-snug">{plant.name}</h3>
                  <span className="shrink-0 font-display text-lg">{plant.price}</span>
                </div>
                <p className="mt-1.5 text-xs italic text-ink-faint">{plant.latin}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  <li className="border border-line px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-muted">
                    {plant.light}
                  </li>
                  <li className="border border-line px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-muted">
                    {plant.difficulty}
                  </li>
                  {plant.petSafe ? (
                    <li className="border border-accent bg-accent-soft px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-accent">
                      Pet safe
                    </li>
                  ) : null}
                </ul>

                {/* Care panel on every card — the question staff answered all day. */}
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink-faint">
                    Water
                  </p>
                  <p className="mt-1.5 text-sm">{plant.water}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{plant.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function FilterRow({
  legend,
  options,
  selected,
  onSelect,
  className,
}: {
  legend: string;
  options: readonly { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="mb-3.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              className={
                isSelected
                  ? "border border-ink bg-ink px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-invert"
                  : "border border-line px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
