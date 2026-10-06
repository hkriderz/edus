import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

async function fillValidEnquiry(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Alex Rivera");
  await user.type(screen.getByLabelText(/^email/i), "alex@riveralandscaping.com");
  await user.type(
    screen.getByLabelText(/about your business/i),
    "We need a new site that explains seasonal work and takes enquiries.",
  );
  await user.click(screen.getByLabelText(/i agree that edus media/i));
}

describe("ContactForm", () => {
  it("renders the enquiry fields and a disabled-path banner when Formspree is unset", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/about your business/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeEnabled();
    expect(screen.getByText(/this form is not connected yet/i)).toBeInTheDocument();
  });

  it("surfaces field validation when required values are missing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("We need an email address to reply to.")).toBeInTheDocument();
    expect(screen.getByText(/sentence or two about your business/i)).toBeInTheDocument();
    expect(screen.getByText(/we need your agreement/i)).toBeInTheDocument();
  });

  it("does not call fetch and explains the missing endpoint on a valid submit", async () => {
    const user = userEvent.setup();
    const fetchMock = jest.fn();
    globalThis.fetch = fetchMock as typeof fetch;
    render(<ContactForm />);

    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/please email us directly instead/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
