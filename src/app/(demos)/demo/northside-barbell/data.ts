export type ClassSlot = {
  day: string;
  time: string;
  name: string;
  coach: string;
  capacity: number;
  booked: number;
  level: "Open" | "Intermediate" | "Advanced";
};

/**
 * The timetable is the most-used page on this site: members check it on a phone,
 * mid-session. It is modelled as flat records so it renders as one scannable
 * table rather than seven collapsible panels.
 */
export const schedule: readonly ClassSlot[] = [
  { day: "Monday", time: "05:30", name: "Barbell Strength", coach: "Dee", capacity: 14, booked: 14, level: "Open" },
  { day: "Monday", time: "12:00", name: "Lunch Lift", coach: "Marcus", capacity: 10, booked: 6, level: "Open" },
  { day: "Monday", time: "18:00", name: "Squat Focus", coach: "Dee", capacity: 14, booked: 11, level: "Intermediate" },
  { day: "Monday", time: "19:30", name: "Open Gym", coach: "—", capacity: 24, booked: 9, level: "Open" },

  { day: "Tuesday", time: "05:30", name: "Press & Pull", coach: "Ana", capacity: 14, booked: 12, level: "Open" },
  { day: "Tuesday", time: "17:00", name: "Technique Lab", coach: "Marcus", capacity: 8, booked: 8, level: "Open" },
  { day: "Tuesday", time: "18:30", name: "Conditioning", coach: "Ana", capacity: 18, booked: 13, level: "Open" },

  { day: "Wednesday", time: "05:30", name: "Barbell Strength", coach: "Dee", capacity: 14, booked: 10, level: "Open" },
  { day: "Wednesday", time: "12:00", name: "Lunch Lift", coach: "Marcus", capacity: 10, booked: 4, level: "Open" },
  { day: "Wednesday", time: "18:00", name: "Deadlift Focus", coach: "Dee", capacity: 14, booked: 14, level: "Intermediate" },
  { day: "Wednesday", time: "19:30", name: "Open Gym", coach: "—", capacity: 24, booked: 7, level: "Open" },

  { day: "Thursday", time: "05:30", name: "Press & Pull", coach: "Ana", capacity: 14, booked: 9, level: "Open" },
  { day: "Thursday", time: "17:00", name: "Competition Prep", coach: "Vance", capacity: 8, booked: 5, level: "Advanced" },
  { day: "Thursday", time: "18:30", name: "Conditioning", coach: "Ana", capacity: 18, booked: 16, level: "Open" },

  { day: "Friday", time: "05:30", name: "Barbell Strength", coach: "Dee", capacity: 14, booked: 13, level: "Open" },
  { day: "Friday", time: "12:00", name: "Lunch Lift", coach: "Marcus", capacity: 10, booked: 5, level: "Open" },
  { day: "Friday", time: "17:30", name: "Heavy Singles", coach: "Vance", capacity: 12, booked: 12, level: "Advanced" },

  { day: "Saturday", time: "08:00", name: "Total Body", coach: "Marcus", capacity: 18, booked: 15, level: "Open" },
  { day: "Saturday", time: "09:30", name: "Beginner Barbell", coach: "Ana", capacity: 12, booked: 4, level: "Open" },
  { day: "Saturday", time: "11:00", name: "Open Gym", coach: "—", capacity: 24, booked: 11, level: "Open" },

  { day: "Sunday", time: "09:00", name: "Open Gym", coach: "—", capacity: 24, booked: 6, level: "Open" },
  { day: "Sunday", time: "10:30", name: "Mobility & Recovery", coach: "Ana", capacity: 16, booked: 8, level: "Open" },
] as const;

export const scheduleDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Coach = {
  name: string;
  role: string;
  initials: string;
  since: string;
  certifications: readonly string[];
  bio: string;
  best: readonly { lift: string; value: string }[];
};

export const coaches: readonly Coach[] = [
  {
    name: "Dee Okonkwo",
    role: "Head Coach / Owner",
    initials: "DO",
    since: "2017",
    certifications: ["NSCA CSCS", "USA Weightlifting L2", "Starting Strength Coach"],
    bio: "Opened Northside in a leaking unit with four barbells and a borrowed platform. Still coaches the 05:30 three days a week because nobody else wants it.",
    best: [
      { lift: "Squat", value: "215 kg" },
      { lift: "Bench", value: "140 kg" },
      { lift: "Deadlift", value: "250 kg" },
    ],
  },
  {
    name: "Marcus Hale",
    role: "Technique Coach",
    initials: "MH",
    since: "2019",
    certifications: ["NASM CPT", "USA Weightlifting L1", "FRCms"],
    bio: "Runs Technique Lab, the only class with an eight-person cap. Will happily spend forty minutes on your setup position and consider it time well spent.",
    best: [
      { lift: "Snatch", value: "118 kg" },
      { lift: "Clean & Jerk", value: "148 kg" },
      { lift: "Front Squat", value: "180 kg" },
    ],
  },
  {
    name: "Ana Reyes",
    role: "Coach / Conditioning Lead",
    initials: "AR",
    since: "2020",
    certifications: ["ACSM CPT", "Precision Nutrition L1", "Kettlebell SFG I"],
    bio: "Came in as a member who could not deadlift her bodyweight and now programmes every conditioning block in the gym. Teaches Beginner Barbell on Saturdays.",
    best: [
      { lift: "Squat", value: "152 kg" },
      { lift: "Deadlift", value: "187 kg" },
      { lift: "Strict Press", value: "62 kg" },
    ],
  },
  {
    name: "Vance Mbeki",
    role: "Competition Coach",
    initials: "VM",
    since: "2022",
    certifications: ["IPF Technical Official", "NSCA CSCS", "Westside Certified"],
    bio: "Handles anyone peaking for a meet. Writes the taper, books the warm-up room, and shouts exactly once per attempt.",
    best: [
      { lift: "Squat", value: "272 kg" },
      { lift: "Bench", value: "182 kg" },
      { lift: "Deadlift", value: "295 kg" },
    ],
  },
] as const;

export type MembershipPlan = {
  name: string;
  price: string;
  cadence: string;
  includes: readonly string[];
  excludes: readonly string[];
  featured: boolean;
};

export const memberships: readonly MembershipPlan[] = [
  {
    name: "Open Gym",
    price: "$75",
    cadence: "per month",
    includes: [
      "24/7 access by fob",
      "All open gym sessions",
      "Chalk, belts, straps provided",
      "Programme templates on request",
    ],
    excludes: ["Coached classes", "Technique Lab", "Competition handling"],
    featured: false,
  },
  {
    name: "Full Member",
    price: "$135",
    cadence: "per month",
    includes: [
      "Everything in Open Gym",
      "Unlimited coached classes",
      "Technique Lab when space allows",
      "Quarterly strength testing",
      "Programme written for your goal",
    ],
    excludes: ["Competition handling at meets"],
    featured: true,
  },
  {
    name: "Competitor",
    price: "$215",
    cadence: "per month",
    includes: [
      "Everything in Full Member",
      "Individual programming, updated weekly",
      "Meet-day handling and taper",
      "Video review between sessions",
      "Priority platform booking",
    ],
    excludes: ["Federation membership and entry fees"],
    featured: false,
  },
] as const;

export const gymRecords = [
  "DEE — 250 KG DEADLIFT",
  "VANCE — 295 KG DEADLIFT",
  "ANA — 152 KG SQUAT",
  "MARCUS — 148 KG CLEAN & JERK",
  "GYM TOTAL 2025 — 4.1 MILLION KG",
  "41 MEMBERS COMPETED",
  "ZERO MIRRORS",
  "NINE PLATFORMS",
] as const;
