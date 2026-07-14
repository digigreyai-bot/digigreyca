import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionBadge } from "./helpers";
import { PROCESS_STEPS } from "./constants";
import { CtaBanner } from "./CtaBanner";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-20 sm:py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Our Process</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              How we turn ideas into <span className="text-gradient-brand">impact</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              A repeatable roadmap from concept to continuous growth — designed to reduce risk and maximize ROI.
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="mt-12 sm:mt-16 relative">
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-brand/10" aria-hidden />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 gradient-brand"
            aria-hidden
          />
          <ul className="space-y-6 sm:space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i}>
                <li className="relative flex gap-5 sm:gap-8 lg:pl-4">
                  <div className="relative z-10 grid h-14 w-14 sm:h-16 sm:w-16 shrink-0 place-items-center rounded-full gradient-brand text-white font-display text-lg font-bold shadow-glow ring-4 ring-offwhite">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 pt-1 sm:pt-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-ink-soft leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={2}>
          <div className="mt-14 sm:mt-16">
            <CtaBanner title="Schedule a call" subtitle="Walk through your project — we'll recommend the fastest path to launch." compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
