import { render, screen } from "@testing-library/react";
import { Lockup, Monogram, Wordmark } from "@/components/brand/Logo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";

describe("shared UI", () => {
  it("renders a primary button and forwards the disabled state", () => {
    render(
      <Button disabled type="submit">
        Send enquiry
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Send enquiry" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders an internal ButtonLink with the supplied href", () => {
    render(<ButtonLink href="/work/">All five case studies</ButtonLink>);
    const href = screen.getByRole("link", { name: "All five case studies" }).getAttribute("href");
    expect(href === "/work/" || href === "/work").toBe(true);
  });

  it("builds the FAQ accordion on native details elements", () => {
    render(
      <Accordion
        items={[
          { question: "Do I own the website?", answer: "Completely." },
          { question: "How long does it take?", answer: "Two to six weeks." },
        ]}
      />,
    );

    const first = screen.getByText("Do I own the website?").closest("details");
    expect(first).toBeInTheDocument();
    expect(screen.getByText("Completely.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How long does it take?" })).toBeInTheDocument();
  });

  it("renders a badge with its label", () => {
    render(<Badge tone="accent">Demonstration build</Badge>);
    expect(screen.getByText("Demonstration build")).toBeInTheDocument();
  });

  it("points the skip link at the main landmark", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
  });

  it("renders the EDUS wordmark and monogram", () => {
    const { container } = render(
      <>
        <Monogram />
        <Wordmark />
        <Lockup />
      </>,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(2);
    expect(screen.getAllByText("EDUS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Media").length).toBeGreaterThan(0);
  });
});
