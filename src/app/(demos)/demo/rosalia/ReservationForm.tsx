"use client";

import { useMemo, useState } from "react";
import { sittings } from "./data";

type Step = "party" | "when" | "details" | "confirmed";

const partySizes = [1, 2, 3, 4, 5, 6] as const;

/** The next twelve open days, skipping Mondays — the restaurant's closing day. */
function useAvailableDates() {
  return useMemo(() => {
    const dates: { iso: string; weekday: string; day: string; month: string }[] = [];
    const cursor = new Date();

    while (dates.length < 12) {
      cursor.setDate(cursor.getDate() + 1);
      if (cursor.getDay() === 1) continue;

      dates.push({
        iso: cursor.toISOString().slice(0, 10),
        weekday: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        day: String(cursor.getDate()),
        month: cursor.toLocaleDateString("en-US", { month: "short" }),
      });
    }

    return dates;
  }, []);
}

const stepLabels = [
  { id: "party", label: "Party size" },
  { id: "when", label: "Date & time" },
  { id: "details", label: "Your details" },
] as const;

/**
 * Three taps to a reservation: party size, then date and sitting, then contact
 * details. No account creation, which was the explicit brief — the previous
 * provider demanded a login before it would show availability.
 *
 * This is a demonstration: the final step confirms locally and contacts no
 * booking provider. That limitation is stated in the UI rather than implied.
 */
export function ReservationForm() {
  const dates = useAvailableDates();
  const [step, setStep] = useState<Step>("party");
  const [party, setParty] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [sitting, setSitting] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selectedDate = dates.find((entry) => entry.iso === date);
  const selectedSitting = sittings.find((entry) => entry.value === sitting);
  const whenSummary = selectedDate
    ? `${selectedDate.weekday} ${selectedDate.day} ${selectedDate.month}`
    : "—";

  function confirmDetails() {
    if (name.trim().length < 2) {
      setError("Please give us a name for the booking.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("We need a phone number in case the kitchen has a question.");
      return;
    }
    setError(null);
    setStep("confirmed");
  }

  function startOver() {
    setStep("party");
    setParty(null);
    setDate(null);
    setSitting(null);
    setName("");
    setPhone("");
    setNotes("");
    setError(null);
  }

  if (step === "confirmed") {
    const rows = [
      { term: "Party", detail: `${party} ${party === 1 ? "guest" : "guests"}` },
      { term: "Date", detail: whenSummary },
      { term: "Sitting", detail: selectedSitting?.label ?? "—" },
      { term: "Name", detail: name.trim() },
      { term: "Phone", detail: phone.trim() },
      ...(notes.trim() ? [{ term: "Notes", detail: notes.trim() }] : []),
    ];

    return (
      <div role="status" className="border border-accent bg-accent-soft p-8 text-center sm:p-12">
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">
          Request received
        </p>
        <h2 className="mt-6 font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-tight">
          Thank you, {name.trim().split(" ")[0]}.
        </h2>

        <dl className="mx-auto mt-10 max-w-sm divide-y divide-line border-y border-line text-left">
          {rows.map((row) => (
            <div key={row.term} className="flex flex-wrap justify-between gap-3 py-3.5">
              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                {row.term}
              </dt>
              <dd className="text-sm">{row.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-9 max-w-[46ch] text-sm leading-relaxed text-ink-muted">
          A real booking would be confirmed by text within two hours, or by 10:00 the next morning for
          requests made after service. This demonstration confirms locally and sends nothing.
        </p>

        <button
          type="button"
          onClick={startOver}
          className="mt-9 border border-line-strong px-6 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-ink-invert"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <div className="border border-line">
      {/* Progress rail: numbered and labelled, never colour alone. */}
      <ol className="flex divide-x divide-line border-b border-line">
        {stepLabels.map((entry, index) => {
          const isCurrent = step === entry.id;
          const isDone =
            (entry.id === "party" && party !== null && step !== "party") ||
            (entry.id === "when" && step === "details");

          return (
            <li
              key={entry.id}
              aria-current={isCurrent ? "step" : undefined}
              className={
                isCurrent
                  ? "flex-1 bg-ink px-3 py-3.5 text-center text-ink-invert"
                  : "flex-1 px-3 py-3.5 text-center"
              }
            >
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em]">
                {index + 1}. {entry.label}
                {isDone ? " \u2713" : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="p-7 sm:p-10">
        {step === "party" ? (
          <fieldset>
            <legend className="font-display text-2xl sm:text-3xl">How many of you?</legend>
            <p className="mt-3 text-sm text-ink-muted">
              For seven or more, email us instead &mdash; large tables need a set menu agreed with the
              kitchen.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {partySizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setParty(size);
                    setStep("when");
                  }}
                  className="border border-line py-6 font-display text-3xl transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === "when" ? (
          <>
            <fieldset>
              <legend className="font-display text-2xl sm:text-3xl">Which evening?</legend>
              <p className="mt-3 text-sm text-ink-muted">
                We are closed on Mondays, so those are not shown.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                {dates.map((entry) => {
                  const isSelected = date === entry.iso;
                  return (
                    <button
                      key={entry.iso}
                      type="button"
                      onClick={() => setDate(entry.iso)}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "border border-accent bg-accent py-4 text-accent-contrast"
                          : "border border-line py-4 transition-colors hover:border-line-strong"
                      }
                    >
                      <span className="block font-mono text-[0.5rem] uppercase tracking-[0.14em] opacity-75">
                        {entry.weekday}
                      </span>
                      <span className="mt-1.5 block font-display text-xl leading-none">
                        {entry.day}
                      </span>
                      <span className="mt-1 block font-mono text-[0.5rem] uppercase tracking-[0.14em] opacity-75">
                        {entry.month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="font-display text-2xl sm:text-3xl">Which sitting?</legend>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-4">
                {sittings.map((entry) => {
                  const isSelected = sitting === entry.value;
                  return (
                    <button
                      key={entry.value}
                      type="button"
                      onClick={() => setSitting(entry.value)}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "border border-accent bg-accent px-4 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-contrast"
                          : "border border-line px-4 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors hover:border-line-strong"
                      }
                    >
                      {entry.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-line pt-7">
              <button
                type="button"
                onClick={() => setStep("party")}
                className="font-mono text-[0.625rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[5px] hover:text-accent"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("details")}
                disabled={!date || !sitting}
                className="border border-accent bg-accent px-7 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-45"
              >
                Continue
              </button>
              {!date || !sitting ? (
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                  Pick a date and a sitting
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {step === "details" ? (
          <>
            <h2 className="font-display text-2xl sm:text-3xl">Almost done.</h2>
            <p className="mt-3 text-sm text-ink-muted">
              {party} {party === 1 ? "guest" : "guests"}, {whenSummary},{" "}
              {selectedSitting?.label ?? ""}.
            </p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Name for the booking
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="w-full border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Phone number
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  className="w-full border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Allergies or anything we should know
                </span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Our kitchen handles nuts, gluten and shellfish. Tell us and we will be honest about what is possible."
                  className="w-full resize-y border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
                />
              </label>
            </div>

            {error ? (
              <p role="alert" className="mt-6 border border-accent bg-accent-soft p-4 text-sm">
                {error}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-line pt-7">
              <button
                type="button"
                onClick={() => setStep("when")}
                className="font-mono text-[0.625rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[5px] hover:text-accent"
              >
                Back
              </button>
              <button
                type="button"
                onClick={confirmDetails}
                className="border border-accent bg-accent px-7 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                Request the table
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
