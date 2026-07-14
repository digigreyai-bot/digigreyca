import { ShieldCheck, Globe2, MessageSquare, Users } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Canadian-registered agency",
    desc: "Formal business entity with accountable delivery — not a faceless freelancer marketplace.",
  },
  {
    icon: Globe2,
    title: "Canada + Pakistan delivery",
    desc: "Strategy and client relations in Canada; skilled execution teams in Pakistan for cost-effective scale.",
  },
  {
    icon: MessageSquare,
    title: "Transparent communication",
    desc: "Weekly updates, clear scope, and honest timelines — you always know where things stand.",
  },
  {
    icon: Users,
    title: "Public company presence",
    desc: "Find us on LinkedIn and Facebook — real channels, real people behind the work.",
  },
];

export function Recognition() {
  return (
    <section id="recognition" className="py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <SectionBadge>Why Teams Trust Us</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Credibility you can <span className="text-gradient-brand">verify</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              We don't invent review scores — we earn trust through process, presence, and delivery you can check.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-5 sm:grid-cols-2">
          {TRUST_POINTS.map((t, i) => (
            <Reveal key={t.title} delay={i}>
              <div className="flex gap-4 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-card h-full">
                <div className="shrink-0 grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <t.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 text-ink-soft leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
