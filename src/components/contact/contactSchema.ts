import { z } from "zod";
import { pricingTiers } from "@/content/pricing";
import { services } from "@/content/services";

export const serviceOptions = [
  ...services.map((service) => ({ value: service.slug, label: service.name })),
  { value: "not-sure", label: "Not sure yet — help me work it out" },
] as const;

export const budgetOptions = [
  ...pricingTiers.map((tier) => ({
    value: tier.id,
    label: `${tier.name} — ${tier.price}`,
  })),
  { value: "under-1200", label: "Under $1,200 — scope it down for me" },
  { value: "flexible", label: "Flexible / not sure" },
] as const;

const serviceValues = serviceOptions.map((option) => option.value);
const budgetValues = budgetOptions.map((option) => option.value);

/**
 * Validation runs client-side for immediate feedback and is re-asserted before
 * submit. Formspree performs its own server-side validation, so this schema is
 * about user experience, not trust — nothing here is a security boundary.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is longer than we can store."),

  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .email("That does not look like a valid email address."),

  // Optional, but validated when present so typos surface before submit.
  phone: z
    .string()
    .trim()
    .max(32, "That phone number is too long.")
    .refine((value) => value === "" || /^[+()\-.\s\d]{7,}$/.test(value), {
      message: "Use digits, spaces and + ( ) - only.",
    })
    .optional()
    .or(z.literal("")),

  business: z.string().trim().max(120, "That business name is too long.").optional().or(z.literal("")),

  website: z
    .string()
    .trim()
    .max(200)
    .refine(
      (value) => value === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(value),
      { message: "Enter a domain like example.com, or leave this blank." },
    )
    .optional()
    .or(z.literal("")),

  service: z.enum(serviceValues as [string, ...string[]], {
    message: "Pick the closest option.",
  }),

  budget: z.enum(budgetValues as [string, ...string[]], {
    message: "Pick the closest option.",
  }),

  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about your business helps us give a useful answer.")
    .max(4000, "Please keep this under 4000 characters."),

  consent: z.boolean().refine((value) => value === true, {
    message: "We need your agreement before we can store and reply to this.",
  }),

  /** Honeypot. Bots fill hidden inputs; humans cannot see this one. */
  referralSource: z.string().max(0, "Submission rejected.").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
