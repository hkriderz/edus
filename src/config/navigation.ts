import { caseStudies } from "@/content/work";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  children?: readonly NavLink[];
};

export const primaryNav: readonly NavLink[] = [
  {
    label: "Work",
    href: "/work/",
    description: `${caseStudies.length} sites, ${caseStudies.length} identities`,
  },
  {
    label: "Services",
    href: "/services/",
    description: "What we build",
    children: [
      {
        label: "Web Design & Development",
        href: "/services/web-design/",
        description: "Custom, hand-built, fast",
      },
      {
        label: "SEO Optimization",
        href: "/services/seo-optimization/",
        description: "Found by the people nearby",
      },
      {
        label: "E-Commerce Setup",
        href: "/services/ecommerce-setup/",
        description: "Sell online without the sprawl",
      },
      {
        label: "Website Care & Support",
        href: "/services/website-maintenance/",
        description: "Guaranteed response times",
      },
    ],
  },
  { label: "Pricing", href: "/pricing/", description: "Plain numbers, no discovery call" },
  { label: "About", href: "/about/", description: "Who EDUS is for" },
  { label: "Contact", href: "/contact/", description: "Start a project" },
] as const;

export const footerNav: readonly { heading: string; links: readonly NavLink[] }[] = [
  {
    heading: "Studio",
    links: [
      { label: "Work", href: "/work/" },
      { label: "Services", href: "/services/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Web Design & Development", href: "/services/web-design/" },
      { label: "SEO Optimization", href: "/services/seo-optimization/" },
      { label: "E-Commerce Setup", href: "/services/ecommerce-setup/" },
      { label: "Website Care & Support", href: "/services/website-maintenance/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Service", href: "/terms-of-service/" },
      { label: "Sitemap", href: "/sitemap/" },
    ],
  },
] as const;
