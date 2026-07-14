import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionBadge } from "./helpers";

const FAQS = [
  {
    q: "What makes DigiGrey different?",
    a: "One partner for web, apps, design, social, ads, and AI automation — with transparent timelines, weekly updates, and delivery across Canada and Pakistan time zones.",
  },
  {
    q: "How do you ensure project success?",
    a: "We align on goals upfront, set clear milestones, test before launch, and stay available post-launch for fixes and iteration. You always know what's shipping and when.",
  },
  {
    q: "What industries do you work with?",
    a: "E-commerce, healthcare, SaaS, professional services, real estate, education, logistics, and more. If your sector isn't listed, book a call — we'll tell you honestly if we're a fit.",
  },
  {
    q: "Can you help with marketing and ads, not just development?",
    a: "Yes. We offer social media management, graphic design, and paid campaigns across Meta, Google, and TikTok — alongside the technical build.",
  },
  {
    q: "Where is DigiGrey based?",
    a: "We're Canadian-registered with delivery teams in Pakistan, serving clients in Canada, the Middle East, Pakistan, and international markets.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation via the form below, email info@digigrey.ca, or call +92 334 8208185. We'll respond with next steps and a scoped plan.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-[48px]"
        aria-expanded={open}
      >
        <span className="font-semibold text-ink pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-ink-soft leading-relaxed">{a}</p>}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
              Frequently asked <span className="text-gradient-brand">questions</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-soft">
              Straight answers before you book a call — no jargon, no pressure.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-2xl border border-border bg-white px-5 sm:px-8 shadow-card">
              {FAQS.map(f => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
