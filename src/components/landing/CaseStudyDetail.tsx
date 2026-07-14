import { ArrowRight } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";

export function CaseStudyDetail() {
  return (
    <section id="case-study-detail" className="py-16 sm:py-20 border-t border-border bg-offwhite/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <SectionBadge>Full Story</SectionBadge>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight">
              Operations automation engagement
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              A client came to DigiGrey drowning in booking and email busywork. We mapped the workflow, automated the
              repetitive steps, and tracked outcomes against the pre-engagement baseline.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 max-w-3xl space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">Challenge</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">
                Manual scheduling and follow-ups created no-shows, delayed responses, and hours of admin each week.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">What we built</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">
                Booking automation, email workflows, and ops checklists so the team could focus on clients instead of
                inboxes.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">Note</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">
                Metrics in the Results section are from this single engagement. Your outcomes will depend on starting
                point, industry, and scope — we set expectations before we build.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              Ask about a similar engagement <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
