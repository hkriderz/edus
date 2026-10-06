import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("tier=studio"),
}));

jest.mock("@/config/site", () => {
  const actual = jest.requireActual<typeof import("@/config/site")>("@/config/site");
  return {
    ...actual,
    siteConfig: {
      ...actual.siteConfig,
      formspreeId: "test-form-id",
      email: "hello@edusdesigns.com",
    },
    isPlaceholder: () => false,
  };
});

function jsonResponse(body: unknown, status: number) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

async function fillValidEnquiry(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Alex Rivera");
  await user.type(screen.getByLabelText(/^email/i), "alex@riveralandscaping.com");
  await user.type(
    screen.getByLabelText(/about your business/i),
    "We need a new site that explains seasonal work and takes enquiries.",
  );
  await user.click(screen.getByLabelText(/i agree that edus media/i));
}

describe("ContactForm submit paths", () => {
  it("shows the success state when Formspree accepts the enquiry", async () => {
    const user = userEvent.setup();
    globalThis.fetch = jest.fn().mockResolvedValue(jsonResponse({ ok: true }, 200)) as typeof fetch;

    render(<ContactForm />);
    expect(screen.queryByText(/this form is not connected yet/i)).not.toBeInTheDocument();

    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/thank you — that came through/i)).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://formspree.io/f/test-form-id",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("maps a rejected request to a user-facing error and keeps the form", async () => {
    const user = userEvent.setup();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    globalThis.fetch = jest
      .fn()
      .mockResolvedValue(jsonResponse({ errors: [{ message: "Rejected" }] }, 422)) as typeof fetch;

    render(<ContactForm />);
    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/something went wrong on our end/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeInTheDocument();
  });

  it("explains a timeout when the request is aborted", async () => {
    const user = userEvent.setup();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    globalThis.fetch = jest.fn().mockImplementation(() => {
      const error = new DOMException("Aborted", "AbortError");
      return Promise.reject(error);
    }) as typeof fetch;

    render(<ContactForm />);
    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/the request timed out/i)).toBeInTheDocument();
  });

  it("explains a network failure when fetch throws TypeError", async () => {
    const user = userEvent.setup();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    globalThis.fetch = jest.fn().mockRejectedValue(new TypeError("Failed to fetch")) as typeof fetch;

    render(<ContactForm />);
    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/we could not reach the server/i)).toBeInTheDocument();
  });

  it("pre-selects the budget tier from the query string", async () => {
    render(<ContactForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/budget range/i)).toHaveValue("studio");
    });
  });
});
