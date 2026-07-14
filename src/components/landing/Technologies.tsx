import { Reveal, SectionBadge } from "./helpers";

const TECH_GROUPS = [
  {
    title: "Web & Apps",
    items: ["React", "TypeScript", "TanStack", "Vite", "Tailwind CSS", "Supabase"],
  },
  {
    title: "Mobile",
    items: ["React Native", "iOS", "Android", "Cross-platform"],
  },
  {
    title: "AI & Automation",
    items: ["Workflow automation", "Custom AI assistants", "Integrations", "CRM & email flows"],
  },
  {
    title: "Growth",
    items: ["Meta Ads", "Google Ads", "TikTok Ads", "Analytics", "SEO basics"],
  },
];

export function Technologies() {
  return (
    <section id="technologies" className="py-20 sm:py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Technologies</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Built with tools that <span className="text-gradient-brand">scale</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              We pick modern, maintainable stacks — so your product performs today and stays adaptable tomorrow.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-5 sm:grid-cols-2">
          {TECH_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i}>
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-card h-full">
                <h3 className="text-lg font-bold text-ink">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className="rounded-full border border-brand/15 bg-brand/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-brand"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="mt-10 text-center text-ink-soft">
            Need the right tech for your project?{" "}
            <a href="#contact" className="font-semibold text-brand hover:underline">
              Let's talk implementation
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
