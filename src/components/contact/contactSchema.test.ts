import { contactSchema } from "./contactSchema";

const validPayload = {
  name: "Alex Rivera",
  email: "alex@riveralandscaping.com",
  phone: "(909) 555-0142",
  business: "Rivera Landscaping",
  website: "riveralandscaping.com",
  service: "web-design",
  budget: "studio",
  message: "We need a new site that explains our seasonal work and takes enquiries.",
  consent: true,
  referralSource: "",
};

describe("contactSchema", () => {
  it("accepts a complete, well-formed enquiry", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("allows optional fields to be blank", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      phone: "",
      business: "",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a name that is too short", () => {
    const result = contactSchema.safeParse({ ...validPayload, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Please enter your name.");
    }
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message.includes("email"))).toBe(true);
    }
  });

  it("rejects a message that is too short to be useful", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "Hello there" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/sentence or two/i);
    }
  });

  it("rejects an unchecked consent box", () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/agreement/i);
    }
  });

  it("rejects a filled honeypot", () => {
    const result = contactSchema.safeParse({ ...validPayload, referralSource: "http://spam.example" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Submission rejected.");
    }
  });

  it("rejects a website that is not a domain", () => {
    const result = contactSchema.safeParse({ ...validPayload, website: "not a url" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/domain/i);
    }
  });
});
