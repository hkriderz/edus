"use client";

import { useState } from "react";
import { treatments } from "./data";

type FieldErrors = Partial<Record<"name" | "contact" | "reason", string>>;

const anxietyLevels = [
  { value: "none", label: "I am fine", detail: "No special arrangements needed." },
  { value: "some", label: "A bit nervous", detail: "Talk me through what you are doing." },
  { value: "high", label: "Very anxious", detail: "I need breaks and a hand signal to stop." },
  { value: "avoidant", label: "I have been avoiding this", detail: "It has been years. Please go slowly." },
] as const;

/**
 * Appointment request form.
 *
 * Accessibility is the point of this demo, so: every error is announced in a
 * live region and referenced by aria-describedby, invalid fields carry
 * aria-invalid, and no state is conveyed by colour alone — errors are text, and
 * the selected anxiety level is marked with aria-checked plus a filled indicator.
 */
export function BookingForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("new-patient-examination");
  const [anxiety, setAnxiety] = useState<string>("none");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (contact.trim().length < 6) {
      next.contact = "We need a phone number or email address so we can offer you times.";
    }
    if (!reason) next.reason = "Please choose what the appointment is for.";
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length === 0) setSubmitted(true);
  }

  const errorCount = Object.keys(errors).length;

  if (submitted) {
    const selectedAnxiety = anxietyLevels.find((level) => level.value === anxiety);

    return (
      <div role="status" className="rounded-2xl border border-accent bg-accent-soft p-8 sm:p-12">
        <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
          Thank you, {name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-6 max-w-[54ch] leading-relaxed text-ink-muted">
          We will reply with two or three appointment times to choose from, usually within a few hours
          and always by the next working day. Nothing is confirmed until you pick one.
        </p>

        {selectedAnxiety && selectedAnxiety.value !== "none" ? (
          <p className="mt-6 max-w-[54ch] rounded-xl bg-surface p-5 text-sm leading-relaxed">
            <span className="font-medium">We have noted that you are {selectedAnxiety.label.toLowerCase()}.</span>{" "}
            The clinician will read that before you arrive, and you will not have to explain it again
            at the desk.
          </p>
        ) : null}

        <p className="mt-7 text-sm text-ink-faint">
          This is a demonstration build. The request was validated in your browser and sent nowhere.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 rounded-full border border-line-strong px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Edit the request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Error summary at the top of the form, which is the pattern that works
          best for screen-reader and cognitive-load reasons alike. */}
      <div aria-live="polite" role="alert">
        {errorCount > 0 ? (
          <div className="rounded-2xl border border-accent bg-accent-soft p-5">
            <h2 className="text-sm font-medium">
              There {errorCount === 1 ? "is 1 thing" : `are ${errorCount} things`} to fix:
            </h2>
            <ul className="mt-3 space-y-1.5">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field} className="text-sm">
                  <a href={`#booking-${field}`} className="underline underline-offset-[3px]">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2.5 block text-sm font-medium">
            Your name <span className="text-accent">*</span>
          </span>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
          />
          {errors.name ? (
            <span id="booking-name-error" className="mt-2 block text-sm text-accent">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2.5 block text-sm font-medium">
            Phone or email <span className="text-accent">*</span>
          </span>
          <input
            id="booking-contact"
            type="text"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            autoComplete="tel"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={
              errors.contact ? "booking-contact-error booking-contact-hint" : "booking-contact-hint"
            }
            className="w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
          />
          <span id="booking-contact-hint" className="mt-2 block text-xs text-ink-faint">
            Whichever you would rather be contacted on.
          </span>
          {errors.contact ? (
            <span id="booking-contact-error" className="mt-2 block text-sm text-accent">
              {errors.contact}
            </span>
          ) : null}
        </label>
      </div>

      <label className="block">
        <span className="mb-2.5 block text-sm font-medium">
          What is the appointment for? <span className="text-accent">*</span>
        </span>
        <select
          id="booking-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          aria-invalid={errors.reason ? true : undefined}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
        >
          {treatments.map((treatment) => (
            <option
              key={treatment.name}
              value={treatment.name.toLowerCase().replace(/[^a-z]+/g, "-")}
            >
              {treatment.name} — {treatment.price}
            </option>
          ))}
          <option value="not-sure">I am not sure — please advise</option>
        </select>
      </label>

      {/* The question that makes this a dental site rather than a generic form. */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">How do you feel about coming in?</legend>
        <p className="mb-5 text-xs text-ink-faint">
          There is no wrong answer, and the clinician reads this before you arrive.
        </p>

        <div
          role="radiogroup"
          aria-label="How do you feel about coming in?"
          className="grid gap-3 sm:grid-cols-2"
        >
          {anxietyLevels.map((level) => {
            const isSelected = anxiety === level.value;
            return (
              <button
                key={level.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setAnxiety(level.value)}
                className={
                  isSelected
                    ? "flex items-start gap-3.5 rounded-xl border-2 border-accent bg-accent-soft p-4 text-left"
                    : "flex items-start gap-3.5 rounded-xl border border-line p-4 text-left transition-colors hover:border-line-strong"
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    isSelected
                      ? "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-accent"
                      : "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-line-strong"
                  }
                >
                  {isSelected ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
                </span>
                <span>
                  <span className="block text-sm font-medium">{level.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                    {level.detail}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2.5 block text-sm font-medium">
          Anything else we should know? (optional)
        </span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="Preferred days or times, a clinician you have seen before, access needs, or a previous experience you would rather we knew about."
          className="w-full resize-y rounded-xl border border-line bg-surface px-4 py-3.5 text-sm focus:border-accent focus:outline-none"
        />
      </label>

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-7">
        <button
          type="submit"
          className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Send the request
        </button>
        <p className="text-xs text-ink-faint">
          Not for emergencies &mdash; if you are in pain, please call (909) 555-0133.
        </p>
      </div>
    </form>
  );
}
