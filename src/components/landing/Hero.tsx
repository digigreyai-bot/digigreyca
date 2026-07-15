import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { SectionBadge } from "./helpers";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./constants";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32">
      <div className="absolute inset-0 network-bg opacity-[0.35] pointer-events-none" />
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-24 -right-32 sm:-right-24 h-[340px] w-[340px] sm:h-[520px] sm:w-[520px] rounded-full opacity-40 blur-3xl pointer-events-none"
        aria-hidden
      >
        <div className="h-full w-full rounded-full gradient-brand" />
      </motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute -bottom-32 -left-32 sm:-left-24 h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
        aria-hidden
      >
        <div className="h-full w-full rounded-full bg-brand-vivid" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionBadge>Catering all global markets</SectionBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 max-w-4xl font-display font-bold text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.08] tracking-tight text-ink"
        >
          Custom web, app &amp; AI development for{" "}
          <span className="text-gradient-brand">growing businesses</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-ink-soft leading-relaxed"
        >
          The right digital partner shouldn't feel impossible to find. DigiGrey brings strategy, design, and technology
          together — so you get solutions that actually move the needle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <a
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 min-h-[48px] text-base font-semibold text-white shadow-glow hover:scale-[1.03] transition-transform"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-brand/30 px-7 py-3.5 min-h-[48px] text-base font-semibold text-brand hover:border-brand hover:bg-brand/5 transition-colors"
          >
            Explore Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 text-sm text-ink-soft"
        >
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand transition">
            <Phone className="h-4 w-4 text-brand" /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="font-semibold text-ink hover:text-brand transition">
            {EMAIL}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
