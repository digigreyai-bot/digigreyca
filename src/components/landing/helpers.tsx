import { motion, useInView, animate, useMotionValue, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoUrl from "@/assets/digigrey-logo.png";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
      {children}
    </span>
  );
}

export function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: v => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, mv, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function LogoImage({
  className = "h-11 w-auto object-contain",
  blend = false,
}: {
  className?: string;
  blend?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className={`grid place-items-center rounded-xl gradient-brand text-white font-display font-bold shadow-glow ${className.includes("h-11") ? "h-11 w-11 text-base" : "h-10 w-10 text-sm"}`}
      >
        DG
      </span>
    );
  }
  return (
    <img
      src={logoUrl}
      alt="DigiGrey Digital Visionaries"
      loading="eager"
      decoding="async"
      width={480}
      height={480}
      className={`${className} ${blend ? "mix-blend-multiply" : ""}`}
      onError={() => setFailed(true)}
    />
  );
}
