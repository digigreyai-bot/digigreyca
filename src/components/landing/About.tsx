import { Reveal, SectionBadge } from "./helpers";
import { CtaBanner } from "./CtaBanner";
import { COMPANY_STATS } from "./constants";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionBadge>About Us</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
              Let's build your <span className="text-gradient-brand">next big win</span> together
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
              Great digital products don't just happen — they're designed, built, and scaled with the right partner. At
              DigiGrey, we bring strategy, design, and technology together so your ideas don't stay ideas.
            </p>
            <p className="mt-4 text-base text-ink-soft leading-relaxed">
              Canadian-registered with delivery teams in Pakistan, we serve clients across Canada, the Middle East, and
              international markets with one accountable team.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <ul className="grid grid-cols-2 gap-4 sm:gap-5">
              {COMPANY_STATS.map(s => (
                <li key={s.label} className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-card text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-ink">
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="mt-2 text-sm text-ink-soft font-medium">{s.label}</div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="mt-14 sm:mt-16">
            <CtaBanner compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
