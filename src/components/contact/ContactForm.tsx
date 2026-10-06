"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { siteConfig, isPlaceholder } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  budgetOptions,
  contactSchema,
  serviceOptions,
  type ContactFormValues,
} from "./contactSchema";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const SUBMIT_TIMEOUT_MS = 15_000;
const FORMSPREE_ENDPOINT = "https://formspree.io/f";

/** Maps a failed request to something a visitor can act on. */
function describeFailure(error: unknown): string {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "The request timed out. Your connection may be slow — please try again, or email us directly.";
  }
  if (error instanceof TypeError) {
    return "We could not reach the server. Check your connection and try again, or email us directly.";
  }
  return "Something went wrong on our end. Please try again, or email us directly.";
}

const fieldClasses =
  "w-full border border-line bg-surface px-4 py-3.5 text-sm text-ink " +
  "placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none " +
  "aria-[invalid=true]:border-accent";

const labelClasses =
  "mb-2.5 block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      website: "",
      service: "web-design",
      budget: "studio",
      message: "",
      referralSource: "",
      consent: false,
    },
  });

  // Pre-select the tier when arriving from a pricing CTA (/contact/?tier=studio).
  useEffect(() => {
    const tier = searchParams.get("tier");
    if (!tier) return;
    if (budgetOptions.some((option) => option.value === tier)) {
      setValue("budget", tier);
    }
  }, [searchParams, setValue]);

  // Move focus to the status region so screen-reader users hear the outcome.
  useEffect(() => {
    if (submitState.status === "success" || submitState.status === "error") {
      statusRef.current?.focus();
    }
  }, [submitState.status]);

  const formspreeConfigured = siteConfig.formspreeId.length > 0;
  const emailConfigured = !isPlaceholder(siteConfig.email);

  async function onSubmit(values: ContactFormValues) {
    if (!formspreeConfigured) {
      setSubmitState({
        status: "error",
        message: "This form is not connected yet. Please email us directly instead.",
      });
      return;
    }

    setSubmitState({ status: "submitting" });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(`${FORMSPREE_ENDPOINT}/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || "Not provided",
          business: values.business || "Not provided",
          website: values.website || "Not provided",
          service: values.service,
          budget: values.budget,
          message: values.message,
          _subject: `New enquiry from ${values.name}${values.business ? ` (${values.business})` : ""}`,
        }),
      });

      if (!response.ok) {
        // Formspree returns a 422 with field-level detail for rejected payloads.
        const body: unknown = await response.json().catch(() => null);
        const detail =
          body && typeof body === "object" && "errors" in body && Array.isArray(body.errors)
            ? (body.errors as { message?: string }[])[0]?.message
            : undefined;

        throw new Error(detail ?? `Request failed with status ${response.status}`);
      }

      setSubmitState({ status: "success" });
      reset();
    } catch (error) {
      // Logged once, at error level, with no submitted field values attached.
      console.error("[contact-form] submission failed", {
        name: error instanceof Error ? error.name : "unknown",
        message: error instanceof Error ? error.message : String(error),
      });
      setSubmitState({ status: "error", message: describeFailure(error) });
    } finally {
      clearTimeout(timeout);
    }
  }

  if (submitState.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-accent bg-accent-soft p-8 lg:p-12"
      >
        <p className="eyebrow mb-5 !text-accent">Message sent</p>
        <h2 className="text-title">Thank you — that came through.</h2>
        <p className="mt-6 max-w-[56ch] leading-relaxed text-ink-muted">
          You will get a reply within one business day, from a person who read what you wrote. If it
          is urgent,{" "}
          {emailConfigured ? (
            <a href={`mailto:${siteConfig.email}`} className="link-underline text-accent">
              email directly
            </a>
          ) : (
            "call us"
          )}{" "}
          and say so in the subject line.
        </p>
        <Button
          variant="outline"
          className="mt-10"
          onClick={() => setSubmitState({ status: "idle" })}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      {!formspreeConfigured ? (
        <p className="border border-line-strong bg-surface-sunken p-5 text-sm leading-relaxed text-ink-muted">
          <strong className="font-medium text-ink">This form is not connected yet.</strong>{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_FORMSPREE_ID</code> has not been set for
          this build.
          {emailConfigured ? (
            <>
              {" "}
              Please email{" "}
              <a href={`mailto:${siteConfig.email}`} className="link-underline text-accent">
                {siteConfig.email}
              </a>{" "}
              instead.
            </>
          ) : null}
        </p>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Your name"
          required
          error={errors.name?.message}
          id={`${formId}-name`}
          autoComplete="name"
          placeholder="Alex Rivera"
          {...register("name")}
        />
        <Field
          label="Email"
          required
          type="email"
          error={errors.email?.message}
          id={`${formId}-email`}
          autoComplete="email"
          placeholder="alex@yourbusiness.com"
          {...register("email")}
        />
        <Field
          label="Phone (optional)"
          type="tel"
          error={errors.phone?.message}
          id={`${formId}-phone`}
          autoComplete="tel"
          placeholder="(909) 555-0142"
          {...register("phone")}
        />
        <Field
          label="Business name (optional)"
          error={errors.business?.message}
          id={`${formId}-business`}
          autoComplete="organization"
          placeholder="Rivera Landscaping"
          {...register("business")}
        />
      </div>

      <Field
        label="Current website (optional)"
        error={errors.website?.message}
        id={`${formId}-website`}
        autoComplete="url"
        placeholder="riveralandscaping.com"
        hint="If you have one. We will look at it before we reply."
        {...register("website")}
      />

      <div className="grid gap-7 sm:grid-cols-2">
        <SelectField
          label="What do you need?"
          required
          id={`${formId}-service`}
          error={errors.service?.message}
          options={serviceOptions}
          {...register("service")}
        />
        <SelectField
          label="Budget range"
          required
          id={`${formId}-budget`}
          error={errors.budget?.message}
          options={budgetOptions}
          hint="An honest answer gets you a more useful reply."
          {...register("budget")}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClasses}>
          About your business <span className="text-accent">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          rows={6}
          className={cn(fieldClasses, "resize-y")}
          placeholder="What you do, who your customers are, and what is going wrong with how they find you today."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-2.5 text-xs text-accent">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, but present in the
          DOM where naive bots will fill it. A non-empty value fails validation. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-referral`}>Referral source</label>
        <input
          id={`${formId}-referral`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("referralSource")}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
            aria-invalid={errors.consent ? true : undefined}
            {...register("consent")}
          />
          <span>
            I agree that EDUS Media may store this message and contact me about my enquiry.{" "}
            <span className="text-accent">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2.5 text-xs text-accent">{errors.consent.message}</p>
        ) : null}
      </div>

      {/* Live region: announced on failure without stealing focus unexpectedly. */}
      <div ref={statusRef} tabIndex={-1} role="alert" aria-live="assertive">
        {submitState.status === "error" ? (
          <p className="border border-accent bg-accent-soft p-5 text-sm leading-relaxed">
            {submitState.message}
            {emailConfigured ? (
              <>
                {" "}
                <a href={`mailto:${siteConfig.email}`} className="link-underline text-accent">
                  {siteConfig.email}
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-7">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Replies within one business day
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

/**
 * `ref` is forwarded implicitly: React 19 passes it through as a normal prop, so
 * react-hook-form's registration object spreads cleanly without forwardRef.
 */
function Field({ label, id, error, hint, required, className, ...rest }: FieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} {required ? <span className="text-accent">*</span> : null}
      </label>
      <input
        id={id}
        className={cn(fieldClasses, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2.5 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
};

function SelectField({
  label,
  id,
  error,
  hint,
  required,
  options,
  className,
  ...rest
}: SelectFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} {required ? <span className="text-accent">*</span> : null}
      </label>
      <select
        id={id}
        className={cn(fieldClasses, "appearance-none", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2.5 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
