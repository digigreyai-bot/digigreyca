export const SERVICE_PRESELECT_KEY = "digigrey-preselect-service";

export const PHONE_DISPLAY = "+92 334 8208185";
export const PHONE_HREF = "tel:+923348208185";
export const EMAIL = "info@digigrey.ca";

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#technologies", label: "Technologies" },
  { href: "#process", label: "Process" },
  { href: "#results", label: "Results" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const COMPANY_STATS = [
  { value: "6", suffix: "", label: "Core Disciplines" },
  { value: "3", suffix: "+", label: "Global Markets" },
  { value: "2", suffix: "", label: "Regional Hubs" },
  { value: "100", suffix: "%", label: "Transparent Process" },
] as const;

export const STATS = [
  { value: 25, suffix: "%", prefix: "+", label: "Social Engagement" },
  { value: 40, suffix: "%", prefix: "-", label: "Admin Workload" },
  { value: 15, suffix: "%", prefix: "+", label: "Conversion Rate" },
  { value: 20, suffix: "%", prefix: "+", label: "Overall Productivity" },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Understand & Align",
    desc: "We learn your business, audience, and goals — aligning strategy with your vision from day one.",
  },
  {
    title: "Plan & Strategize",
    desc: "Clear roadmaps, milestones, and scope — so you always know where the project is headed.",
  },
  {
    title: "Create & Build",
    desc: "Design, development, and content come together with modern tools and proven frameworks.",
  },
  {
    title: "Test & Refine",
    desc: "Every deliverable is tested for quality, performance, and real-world usability.",
  },
  {
    title: "Launch & Scale",
    desc: "We launch, monitor, and optimize so your solution grows with your business.",
  },
] as const;

export function preselectService(title: string) {
  try {
    sessionStorage.setItem(SERVICE_PRESELECT_KEY, title);
  } catch {
    /* ignore quota / private mode */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("digigrey-preselect-service", { detail: title }));
  }
}
