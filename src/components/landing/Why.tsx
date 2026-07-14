import { ShieldCheck, Headphones, Wallet, HeartHandshake } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Transparent Methodology",
    desc: "Clear timelines, weekly updates, and open dashboards — you always know where things stand.",
  },
  {
    icon: Headphones,
    title: "Exceptional Support",
    desc: "A dedicated team responsive across Canada, Pakistan, and Middle East time zones.",
  },
  {
    icon: Wallet,
    title: "Cost-Effective Solutions",
    desc: "Global delivery model that stretches your budget without compromising quality.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Centric Approach",
    desc: "Your goals lead every decision — we measure our success by yours.",
  },
];

export function Why() {
  return (
    <section id="why" className="relative bg-offwhite py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 network-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Why DigiGrey</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Built on trust. <span className="text-gradient-brand">Driven by results.</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <div className="flex gap-4 sm:gap-5 rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-border h-full">
                <div className="shrink-0 grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-ink-soft leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
