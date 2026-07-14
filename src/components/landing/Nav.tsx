import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { LogoImage } from "./helpers";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "./constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_-16px_rgba(74,14,110,0.25)]" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a href="#top" className="flex items-center shrink-0" onClick={() => setOpen(false)} aria-label="DigiGrey home">
          <LogoImage className="h-11 md:h-12 w-auto object-contain" blend />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-soft hover:text-brand transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={PHONE_HREF} className="hidden xl:inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand">
            <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.03] transition-transform"
          >
            Let's Talk <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden grid h-11 w-11 place-items-center rounded-lg border border-border bg-white shrink-0"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 sm:px-6 py-6 space-y-1 max-h-[70vh] overflow-y-auto">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-ink border-b border-border/50 min-h-[44px]"
            >
              {l.label}
            </a>
          ))}
          <a href={PHONE_HREF} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-brand min-h-[44px]">
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3.5 text-sm font-semibold text-white min-h-[44px]"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
