import { ArrowRight } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";
import { STATS } from "./constants";
import { preselectService } from "./constants";

const CASES = [
  {
    title: "Operations Automation",
    subtitle: "Booking, email & admin workflows",
    desc: "A service business drowning in manual scheduling and follow-ups. We automated core workflows and tracked outcomes against a clear baseline.",
    service: "AI Automation",
    metrics: STATS.slice(0, 2),
    href: "#case-study-detail",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Case Studies</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Real work. <span className="text-gradient-brand">Measured impact.</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              Explore how we partner with teams — starting with a documented automation engagement and its tracked
              outcomes.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-6 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-card hover:shadow-lift transition-shadow">
                <div className="gradient-brand p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-white/80 text-sm">{c.subtitle}</p>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-ink-soft leading-relaxed flex-1">{c.desc}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-4">
                    {c.metrics.map(m => (
                      <li key={m.label}>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                          {m.prefix}
                          {m.value}
                          {m.suffix}
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-ink-soft">{m.label}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={c.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                    >
                      Read full story <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#contact"
                      onClick={() => preselectService(c.service)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand"
                    >
                      Book similar project
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
