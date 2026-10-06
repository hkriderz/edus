export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: readonly FaqItem[] = [
  {
    question: "Why are your prices lower than other studios?",
    answer:
      "No office lease, no account managers, and no sales team taking a cut. You talk to the person building your site. We also reuse a mature internal design system instead of starting from zero every time, which removes a week of work without removing any craft.",
  },
  {
    question: "What does 'guaranteed support' actually mean?",
    answer:
      "Response times are written into the service agreement, not implied in a sales call. Four business hours for a standard request, one hour for a site that is down. If we miss it, that month is free. The guarantee is only worth something if it costs us when we fail.",
  },
  {
    question: "Do I own the website when you are finished?",
    answer:
      "Completely. The code, the domain, the hosting account, the analytics property and the repository are all in your name from the start. There is no proprietary builder you have to keep paying for and no part of the site you need our permission to change.",
  },
  {
    question: "Are the portfolio sites real client work?",
    answer:
      "They are demonstration builds, and we label them as such everywhere. Each one is a complete, working site you can click through rather than a screenshot — which tells you considerably more about how we build than a blurred logo wall would.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "An hour for a kickoff conversation, whatever logo and photography you already have, and a named person who can approve decisions. We write the launch copy with you if you do not have it. Most delays come from waiting on content, so we plan for that from day one.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Two weeks for a one-page site, three to four for a multi-page site, four to six for a storefront. Those are calendar weeks assuming feedback comes back within two business days. We tell you the critical path at kickoff so you can see what your decisions are holding up.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "We audit it first. Sometimes the honest answer is that your existing site needs three days of fixes rather than a rebuild, and we will tell you that even though it is the smaller invoice. If we do rebuild, we map every old URL to a new one so you keep your search rankings.",
  },
  {
    question: "Do you work with businesses outside your area?",
    answer:
      "Yes. The studio is community-focused in how it prices and communicates, not in who it will take on. Remote projects run the same way — the only difference is that the kickoff happens on a video call instead of across a counter.",
  },
] as const;
