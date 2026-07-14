import { motion } from "framer-motion";
import { Zap, Clock, TrendingUp } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";

const OUTCOMES = [
  {
    icon: Zap,
    title: "Less busywork",
    desc: "Automation that cuts repetitive admin so your team focuses on growth.",
  },
  {
    icon: TrendingUp,
    title: "Measurable lift",
    desc: "Engagement, conversion, and productivity gains tracked against clear baselines.",
  },
  {
    icon: Clock,
    title: "Faster follow-through",
    desc: "Transparent timelines and weekly updates so projects stay on target.",
  },
];

export function Outcomes() {
  return (
    <section className="bg-offwhite py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <SectionBadge>What We Deliver</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Outcomes teams <span className="text-gradient-brand">actually feel.</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              The same priorities behind our results — practical impact, not anonymous quote cards.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="relative flex h-full flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-border"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <o.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{o.title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed flex-1">{o.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
