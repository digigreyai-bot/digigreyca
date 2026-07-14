import { Reveal } from "./helpers";
import { FB, LI } from "./icons";

const PARTNERS = [
  { label: "Canadian-registered", href: null },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/digi-grey/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61565793802639" },
  { label: "digigrey.ca", href: "https://www.digigrey.ca" },
];

export function Trust() {
  return (
    <Reveal>
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 -mt-2 sm:-mt-4">
        <div className="rounded-2xl border border-border bg-white/80 backdrop-blur px-4 sm:px-6 py-5 shadow-card">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft mb-4">
            Our presence
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {PARTNERS.map((p, i) => (
              <li key={p.label} className="flex items-center gap-3">
                {i > 0 && <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-brand/40" />}
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-ink hover:text-brand transition inline-flex items-center gap-2"
                  >
                    {p.label === "LinkedIn" && <LI className="h-4 w-4" />}
                    {p.label === "Facebook" && <FB className="h-4 w-4" />}
                    {p.label}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-ink">{p.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
