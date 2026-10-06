export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Initials used in place of a photo — no stock headshots anywhere on the site. */
  initials: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "bakery",
    quote:
      "I had three quotes. Two of them would not tell me the price without a discovery call. EDUS sent a number, a timeline and a list of exactly what I was getting. That alone made the decision.",
    name: "Sarah Johnson",
    role: "Owner, Johnson's Bakery",
    initials: "SJ",
  },
  {
    id: "dental",
    quote:
      "What I appreciated most was being told what they would not do. No overselling. The site does the job and I understood every invoice before it arrived.",
    name: "Dr. Mike Chen",
    role: "Chen Family Dental",
    initials: "MC",
  },
  {
    id: "fitness",
    quote:
      "Our studio schedule used to be a photo of a whiteboard. Now members book themselves and I get my Sunday evenings back. That is the whole review.",
    name: "Emily Rodriguez",
    role: "Owner, FitLife Studio",
    initials: "ER",
  },
  {
    id: "landscaping",
    quote:
      "Something broke on a Friday afternoon during our busiest week. I messaged once and it was fixed inside the hour. The response time is in the contract, and they actually honour it.",
    name: "David Thompson",
    role: "Thompson Landscaping",
    initials: "DT",
  },
  {
    id: "nonprofit",
    quote:
      "We are a small nonprofit and I was braced for the usual 'that will be extra'. Instead they scoped it down to what we could afford and it still looks better than anything our peers have.",
    name: "Lisa Wang",
    role: "Director, Green Earth Collective",
    initials: "LW",
  },
  {
    id: "consulting",
    quote:
      "They handed over every credential on day one — domain, hosting, analytics, the repository. I have worked with agencies that treat that as leverage. This felt like the opposite.",
    name: "Robert Martinez",
    role: "Founder, Martinez Consulting",
    initials: "RM",
  },
] as const;
