import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";
import { Reveal, SectionBadge } from "./helpers";
import { preselectService } from "./constants";
import { CtaBanner } from "./CtaBanner";

const CATEGORY_DESC: Record<(typeof SERVICE_CATEGORIES)[number], string> = {
  Development: "Robust websites and mobile apps built to scale with your business.",
  "Brand & Growth": "Design, social, and paid media that turn attention into revenue.",
  Automation: "AI workflows that eliminate busywork and unlock operational speed.",
};

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>What We Offer</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Tailored digital solutions to <span className="text-gradient-brand">fuel your success</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              Strategy, design, and technology in one place — whether you're launching, scaling, or automating.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 space-y-14 sm:space-y-16">
          {SERVICE_CATEGORIES.map((cat, ci) => {
            const items = SERVICES.filter(s => s.category === cat);
            return (
              <div key={cat}>
                <Reveal delay={ci}>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink">{cat}</h3>
                  <p className="mt-2 text-ink-soft max-w-2xl">{CATEGORY_DESC[cat]}</p>
                </Reveal>
                <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => (
                    <Reveal key={s.title} delay={i}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-card hover:shadow-lift transition-shadow"
                      >
                        <div className="grid h-14 w-14 place-items-center rounded-full gradient-brand text-white shadow-glow shrink-0">
                          <s.icon className="h-6 w-6" />
                        </div>
                        <h4 className="mt-5 text-xl font-bold text-ink">{s.title}</h4>
                        <p className="mt-3 text-ink-soft leading-relaxed flex-1">{s.desc}</p>
                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
                          >
                            Learn more <ArrowRight className="h-4 w-4" />
                          </Link>
                          <a
                            href="#contact"
                            onClick={() => preselectService(s.title)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand"
                          >
                            Schedule a call
                          </a>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
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
