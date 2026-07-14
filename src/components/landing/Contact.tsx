import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Mail, Phone, Globe, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { SERVICES } from "@/data/services";
import { submitConsultation } from "@/lib/consultation.functions";
import { Reveal } from "./helpers";
import { SERVICE_PRESELECT_KEY, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./constants";

type FormState = "idle" | "loading" | "success" | "saved" | "error";

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
        {label}
        {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 min-h-[48px] text-base text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 transition"
      />
    </div>
  );
}

export function Contact() {
  const submit = useServerFn(submitConsultation);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [service, setService] = useState("");

  useEffect(() => {
    const applyTitle = (title: string | null) => {
      if (title && SERVICES.some(s => s.title === title)) {
        setService(title);
      }
    };
    const applyFromStorage = () => {
      try {
        const stored = sessionStorage.getItem(SERVICE_PRESELECT_KEY);
        if (stored) {
          applyTitle(stored);
          sessionStorage.removeItem(SERVICE_PRESELECT_KEY);
        }
      } catch {
        /* ignore */
      }
    };
    applyFromStorage();
    const onCustom = (e: Event) => {
      applyTitle((e as CustomEvent<string>).detail);
      try {
        sessionStorage.removeItem(SERVICE_PRESELECT_KEY);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("hashchange", applyFromStorage);
    window.addEventListener("digigrey-preselect-service", onCustom);
    return () => {
      window.removeEventListener("hashchange", applyFromStorage);
      window.removeEventListener("digigrey-preselect-service", onCustom);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      service: String(fd.get("service") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.service) {
      setState("error");
      setErrorMsg("Please fill in your name, email, and service.");
      return;
    }

    try {
      const result = (await submit({ data: payload })) as { ok?: boolean; emailed?: boolean };
      form.reset();
      setService("");
      setState(result?.emailed ? "success" : "saved");
      setTimeout(() => setState("idle"), 6000);
    } catch (err) {
      console.error(err);
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-6 sm:p-8 md:p-14 shadow-lift">
          <div className="absolute inset-0 network-bg opacity-15 pointer-events-none" />
          <div className="relative grid gap-8 md:gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Let's Talk
                </span>
                <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08]">
                  Let's make something <span className="italic">amazing</span> together
                </h2>
                <p className="mt-4 sm:mt-5 text-white/85 text-base sm:text-lg max-w-lg">
                  Got questions? We have answers. Start a conversation that could change how your business shows up online.
                </p>
              </Reveal>

              <Reveal delay={1}>
                <ul className="mt-8 sm:mt-10 space-y-4 text-white">
                  <li className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Canada · General</div>
                      <a href={`mailto:${EMAIL}`} className="hover:underline break-all">
                        {EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Pakistan · Delivery ops</div>
                      <a href={PHONE_HREF} className="hover:underline">
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                      <Globe className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Web</div>
                      <a
                        href="https://www.digigrey.ca"
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.digigrey.ca
                      </a>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>

            <Reveal delay={2}>
              <form onSubmit={onSubmit} noValidate className="relative rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-lift space-y-4">
                <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" />
                  <Field label="Email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2"
                    >
                      Service Interested In<span className="text-brand">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 min-h-[48px] text-base text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 transition"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICES.map(s => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-ink focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 transition resize-none"
                    placeholder="Tell us about your project…"
                  />
                </div>

                {state === "error" && (
                  <div role="alert" className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive px-4 py-3 text-sm">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {state === "success" && (
                  <div role="status" className="flex items-start gap-2 rounded-xl bg-brand/10 text-brand px-4 py-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Thanks — your request landed. We'll be in touch shortly.</span>
                  </div>
                )}
                {state === "saved" && (
                  <div role="status" className="flex items-start gap-2 rounded-xl bg-brand/10 text-brand px-4 py-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>Request saved — we'll follow up soon.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 min-h-[48px] text-base font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : state === "success" || state === "saved" ? (
                    <>
                      Thank you! <CheckCircle2 className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Book My Free Consultation <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
