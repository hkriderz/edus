export type Treatment = {
  name: string;
  price: string;
  duration: string;
  /** What the patient will actually experience. Stated before any clinical detail. */
  feels: string;
  description: string;
  /**
   * Visual weight in the bento grid; the most-searched items get more space.
   * The spans across the list are chosen to sum to a whole six-column row at a
   * time, so the grid tiles without leaving holes.
   */
  span: "hero" | "wide" | "third" | "full";
};

/**
 * Prices are on the page because the front desk was fielding cost questions all
 * day and new patients were going elsewhere. Every entry also states duration
 * and what it feels like, in that order — the anxiety-aware content order the
 * case study describes.
 */
export const treatments: readonly Treatment[] = [
  {
    name: "New patient examination",
    price: "$95",
    duration: "45 minutes",
    feels: "No instruments in the first fifteen minutes. We talk first.",
    description:
      "A full assessment including x-rays, gum health check and an oral-cancer screening. You will leave with a written plan and a total cost before anything is booked.",
    span: "hero",
  },
  {
    name: "Hygiene appointment",
    price: "$110",
    duration: "40 minutes",
    feels: "Vibration and cold water. Uncomfortable at most, not painful.",
    description:
      "Scale and polish with a hygienist, plus technique coaching aimed at whichever two teeth you are actually missing when you brush.",
    span: "third",
  },
  {
    name: "White filling",
    price: "$185 – $320",
    duration: "30 – 60 minutes",
    feels: "Numb for two hours. Pressure, but no sharpness.",
    description:
      "Composite filling matched to your tooth colour. The price range reflects the size of the cavity, and you are told which end of it you are at before we start.",
    span: "wide",
  },
  {
    name: "Root canal treatment",
    price: "$650 – $1,100",
    duration: "60 – 90 minutes, sometimes two visits",
    feels: "The most-feared treatment we offer, and almost always painless.",
    description:
      "Removes infection from inside the tooth and saves it. Modern anaesthetic means the appointment itself is usually less uncomfortable than the toothache that brought you in.",
    span: "wide",
  },
  {
    name: "Crown",
    price: "$950 – $1,400",
    duration: "Two visits, 60 minutes each",
    feels: "Numb. Some pressure while the fit is checked.",
    description:
      "A ceramic cap that rebuilds a broken or heavily-filled tooth. We scan rather than take a putty impression, which most patients find far easier to tolerate.",
    span: "third",
  },
  {
    name: "Emergency appointment",
    price: "$120",
    duration: "20 minutes",
    feels: "We will stop the pain first and plan afterwards.",
    description:
      "Same-day slots held back every morning and afternoon. Call before 09:00 or before 14:00 — do not use the online form for pain.",
    span: "third",
  },
  {
    name: "Children's check-up",
    price: "Free under 12",
    duration: "25 minutes",
    feels: "Mostly counting teeth and a sticker.",
    description:
      "Free for children under twelve, with or without a parent registered here. The first few visits are deliberately uneventful so the dentist never becomes frightening.",
    span: "third",
  },
  {
    name: "Teeth whitening",
    price: "$390",
    duration: "One visit plus two weeks at home",
    feels: "Some sensitivity for 48 hours. Normal and temporary.",
    description:
      "Custom trays and professional-strength gel. We will tell you honestly whether your teeth will respond, because for some people they will not — and in that case we will not take your money.",
    span: "full",
  },
] as const;

export type Clinician = {
  name: string;
  role: string;
  initials: string;
  registration: string;
  qualifications: readonly string[];
  languages: readonly string[];
  bio: string;
  focus: string;
};

export const clinicians: readonly Clinician[] = [
  {
    name: "Dr. Priya Raman",
    role: "Principal Dentist",
    initials: "PR",
    registration: "DDS 48211",
    qualifications: ["DDS, University of California", "Certificate in Endodontics", "ADA member"],
    languages: ["English", "Tamil", "Hindi"],
    bio: "Took over the practice in 2018 and spent the first year doing nothing but removing the things that made patients anxious — including the waiting-room television and every poster of a drill.",
    focus: "Root canal treatment and nervous patients",
  },
  {
    name: "Dr. Samuel Okafor",
    role: "Associate Dentist",
    initials: "SO",
    registration: "DDS 51904",
    qualifications: ["DMD, Boston University", "Advanced Restorative Certificate"],
    languages: ["English", "Igbo", "French"],
    bio: "Handles most of the restorative work and all of the digital scanning. Will explain exactly what he is doing throughout, or say nothing at all — whichever you prefer. Just tell him.",
    focus: "Crowns, bridges and complex restorations",
  },
  {
    name: "Elena Vasquez",
    role: "Lead Dental Hygienist",
    initials: "EV",
    registration: "RDH 33187",
    qualifications: ["RDH, Loma Linda University", "Periodontal Therapy Certificate"],
    languages: ["English", "Spanish"],
    bio: "Sees more patients than anyone else here. Has a genuine talent for working out which two teeth you are consistently missing and fixing it in one conversation.",
    focus: "Gum health and prevention",
  },
  {
    name: "Marcus Bell",
    role: "Practice Manager",
    initials: "MB",
    registration: "—",
    qualifications: ["Dental Practice Management Diploma"],
    languages: ["English", "ASL (conversational)"],
    bio: "The person you speak to about costs, insurance and payment plans. Will give you a written total before any treatment is booked, every time, without being asked.",
    focus: "Costs, insurance and payment plans",
  },
] as const;

export const firstVisitSteps = [
  {
    heading: "You arrive and sit down",
    body: "No clipboard at the door. We take your details at a desk, sitting down, with a glass of water. If you would rather fill the form in at home, we will email it instead.",
  },
  {
    heading: "We talk for fifteen minutes",
    body: "Before any instrument comes out, we ask what you are worried about and what your last bad experience was. If you need to stop at any point, we agree a hand signal.",
  },
  {
    heading: "The examination itself",
    body: "Around twenty minutes. Mirror, probe, x-rays and a gum measurement. Nothing in this appointment hurts. We tell you what we are doing as we do it, unless you ask us not to.",
  },
  {
    heading: "You get a written plan",
    body: "Printed or emailed, with every recommended treatment, what happens if you do nothing, and a total price. Nothing is booked at the desk under pressure.",
  },
] as const;

export const insuranceNotes = [
  {
    heading: "We accept most PPO plans",
    body: "Including Delta Dental, Cigna, Aetna, MetLife and Guardian. Bring your card to the first visit and we will check your remaining allowance before quoting you.",
  },
  {
    heading: "No insurance is fine",
    body: "Around a third of our patients have none. Our self-pay prices are the ones published on this page — there is no separate, higher list for people without a plan.",
  },
  {
    heading: "Payment plans at 0%",
    body: "Any treatment over $500 can be spread across six months at no interest, arranged in-house. No credit application and no third-party finance company.",
  },
] as const;
