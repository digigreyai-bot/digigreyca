import {
  Code2,
  Smartphone,
  Share2,
  Palette,
  Bot,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  category: "Development" | "Brand & Growth" | "Automation";
  desc: string;
  longDesc: string;
  bullets: string[];
  icon: LucideIcon;
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    desc: "Fast, scalable websites and web platforms crafted for conversion and long-term growth.",
    longDesc:
      "We design and build marketing sites, portals, and web apps that load fast, convert clearly, and stay maintainable as you grow.",
    bullets: [
      "Conversion-focused UX and page structure",
      "Modern React / Vite stacks with SSR when needed",
      "Performance, SEO basics, and analytics wiring",
      "Handoff docs and optional ongoing support",
    ],
    icon: Code2,
  },
  {
    slug: "app-development",
    title: "App Development",
    category: "Development",
    desc: "Native and cross-platform mobile apps with slick interfaces and reliable backends.",
    longDesc:
      "From MVP to production apps — interfaces your users enjoy and backends you can trust under real traffic.",
    bullets: [
      "iOS / Android and cross-platform options",
      "Auth, payments, and API integrations",
      "App store readiness and release support",
      "Post-launch iteration based on usage data",
    ],
    icon: Smartphone,
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    category: "Brand & Growth",
    desc: "End-to-end content, community, and strategy that grows audiences into loyal customers.",
    longDesc:
      "Strategy, content calendars, and community management aligned to your brand voice and growth goals.",
    bullets: [
      "Platform strategy and content systems",
      "Creative production and scheduling",
      "Community engagement and reporting",
      "Campaigns tied to clear KPIs",
    ],
    icon: Share2,
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Brand & Growth",
    desc: "Brand identities, campaigns, and visual systems that stand out in crowded feeds.",
    longDesc:
      "Visual identity and campaign creative that stays consistent across web, social, and ads.",
    bullets: [
      "Logo and brand systems",
      "Social and ad creative packs",
      "Pitch decks and sales collateral",
      "Design guidelines for your team",
    ],
    icon: Palette,
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    category: "Automation",
    desc: "Custom AI workflows that eliminate repetitive tasks and unlock operational speed.",
    longDesc:
      "We map your busywork, then automate booking, email, and ops workflows so your team focuses on growth.",
    bullets: [
      "Process audit and automation roadmap",
      "Booking, CRM, and email workflows",
      "Custom AI assistants where they fit",
      "Measured impact on time and errors",
    ],
    icon: Bot,
  },
  {
    slug: "ad-management",
    title: "Ad Management",
    category: "Brand & Growth",
    desc: "Data-driven paid campaigns across Meta, Google, and TikTok with measurable ROI.",
    longDesc:
      "Paid media managed with clear baselines, creative tests, and reporting you can act on.",
    bullets: [
      "Meta, Google, and TikTok campaigns",
      "Creative testing and audience refinement",
      "Budget pacing and conversion tracking",
      "Weekly performance summaries",
    ],
    icon: Megaphone,
  },
];

export const SERVICE_CATEGORIES = ["Development", "Brand & Growth", "Automation"] as const;

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getServiceByTitle(title: string): ServiceItem | undefined {
  return SERVICES.find(s => s.title === title);
}
