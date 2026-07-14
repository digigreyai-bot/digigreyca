import { Counter, Reveal } from "./helpers";
import { STATS } from "./constants";

export function Results() {
  return (
    <section id="results" className="relative py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-6 sm:p-10 md:p-16 shadow-lift">
          <div className="absolute inset-0 opacity-20 network-bg pointer-events-none" />
          <div className="relative">
            <Reveal>
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Proven Impact
                </span>
                <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                  Numbers that speak louder than promises.
                </h2>
                <p className="mt-4 sm:mt-5 text-white/85 text-base sm:text-lg max-w-2xl">
                  Illustrative outcomes from one client automation engagement — not a guarantee of identical results for every project.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i}>
                  <div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-none">
                      <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 sm:mt-3 text-white/80 font-medium text-sm sm:text-base">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
