import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    name: "Conversation",
    duration: "1 hour",
    body: "We ask how customers find you today and where it falls apart. No slide deck, no discovery questionnaire. You leave the call knowing the price and the timeline.",
  },
  {
    number: "02",
    name: "Direction",
    duration: "Week 1",
    body: "Two genuinely different design directions, built as real pages in a browser rather than flat mockups. You pick one and we throw the other away.",
  },
  {
    number: "03",
    name: "Build",
    duration: "Weeks 2 – 3",
    body: "Daily progress on a staging URL you can check any time. Feedback goes in comments on the page itself, so nothing gets lost in an email thread.",
  },
  {
    number: "04",
    name: "Launch",
    duration: "Week 4",
    body: "We handle DNS, certificates, redirects from your old URLs and search console. You get a training session and a written handover document.",
  },
  {
    number: "05",
    name: "After",
    duration: "Ongoing",
    body: "Support is included for 30 to 180 days depending on tier. Care plans pick up from there with response times written into the agreement.",
  },
] as const;

export function Process() {
  return (
    <Section eyebrow="05 — How a project runs" width="wide">
      <SectionHeading
        title={
          <>
            Four weeks, five steps,
            <br />
            no mystery in the middle.
          </>
        }
        lead="The most common complaint about web projects is silence. You will know what is happening every week, and you will know what your own decisions are holding up."
      />

      <ol className="mt-16 grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col bg-surface p-7 lg:p-8">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-accent">
                {step.number}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                {step.duration}
              </span>
            </div>
            <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.02em]">
              {step.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
