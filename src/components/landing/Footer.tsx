import { Link } from "@tanstack/react-router";
import { LogoImage } from "./helpers";
import { NAV_LINKS, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./constants";
import { FB, LI } from "./icons";
import { SERVICES } from "@/data/services";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="inline-flex items-center rounded-2xl bg-white px-5 py-4 shadow-sm" style={{ width: "160px" }}>
            <LogoImage className="h-12 w-auto object-contain mx-auto" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Canadian-registered digital agency with delivery teams in Pakistan, serving Canada, the Middle East, and
            international markets.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: LI, href: "https://www.linkedin.com/company/digi-grey/", label: "LinkedIn" },
              { icon: FB, href: "https://www.facebook.com/profile.php?id=61565793802639", label: "Facebook" },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 hover:gradient-brand transition"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-white text-sm font-bold uppercase tracking-wider">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map(s => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-white transition">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white text-sm font-bold uppercase tracking-wider">Company</div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white text-sm font-bold uppercase tracking-wider">Contact</div>
          <ul className="mt-4 space-y-2 text-sm break-all">
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-white transition">
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={PHONE_HREF} className="hover:text-white transition">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href="https://www.digigrey.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                www.digigrey.ca
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/50">Canada · Pakistan · Global delivery</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
          <span>© 2026 DigiGrey Digital Visionaries. All rights reserved.</span>
          <span>Content may not be reproduced without permission.</span>
        </div>
      </div>
    </footer>
  );
}
