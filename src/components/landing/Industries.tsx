import {
  Building2,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Home,
  Truck,
  Landmark,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";
import { CtaBanner } from "./CtaBanner";

type Industry = { icon: LucideIcon; name: string };

const INDUSTRIES: Industry[] = [
  { icon: Landmark, name: "Professional Services" },
  { icon: ShoppingBag, name: "E-commerce" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: GraduationCap, name: "Education" },
  { icon: Home, name: "Real Estate" },
  { icon: Building2, name: "SaaS & Startups" },
  { icon: Truck, name: "Logistics" },
  { icon: Clapperboard, name: "Media & Entertainment" },
];

export function Industries() {
  return (
    <section id="industries" className="py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Industries</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-ink leading-tight">
              Expertise across <span className="text-gradient-brand">multiple sectors</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft">
              Whether you're launching, scaling, or automating — we adapt our playbooks to your industry's goals and
              constraints.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i % 4}>
              <div className="group flex flex-col items-center rounded-2xl border border-border bg-white p-5 sm:p-6 text-center shadow-card hover:shadow-lift hover:border-brand/30 transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand group-hover:gradient-brand group-hover:text-white transition-colors">
                  <ind.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm sm:text-base font-semibold text-ink">{ind.name}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="mt-10 text-center text-ink-soft text-sm sm:text-base">
            Not sure if your industry fits?{" "}
            <a href="#contact" className="font-semibold text-brand hover:underline">
              Talk to our team
            </a>{" "}
            — we'll shape a solution for your business.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
