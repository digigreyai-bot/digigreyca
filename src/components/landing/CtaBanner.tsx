import { ArrowRight, Phone } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./constants";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export function CtaBanner({
  title = "Ready to build your next win?",
  subtitle = "Book a free consultation — we'll map goals, spot quick wins, and outline a plan.",
  compact = false,
}: CtaBannerProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl gradient-brand shadow-lift ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10 md:p-12"}`}
    >
      <div className="absolute inset-0 network-bg opacity-15 pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-xl">
          <h3 className={`font-display font-bold text-white leading-tight ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
            {title}
          </h3>
          <p className="mt-2 text-white/85 text-sm sm:text-base">{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 min-h-[48px] text-sm font-semibold text-brand hover:scale-[1.02] transition-transform"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 min-h-[48px] text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
      <p className="relative mt-4 text-xs text-white/60">
        Or email{" "}
        <a href={`mailto:${EMAIL}`} className="underline hover:text-white">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}
