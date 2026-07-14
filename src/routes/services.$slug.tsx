import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { LogoImage } from "@/components/landing/helpers";
import { preselectService } from "@/components/landing/constants";
import logoUrl from "@/assets/digigrey-logo.png";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    const title = service
      ? `${service.title} — DigiGrey Digital Visionaries`
      : "Service — DigiGrey Digital Visionaries";
    const description = service?.longDesc ?? service?.desc ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: logoUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: logoUrl },
      ],
      links: [{ rel: "canonical", href: `/services/${service?.slug ?? ""}` }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="border-b border-border bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <Link to="/" className="flex items-center" aria-label="DigiGrey home">
            <LogoImage className="h-11 w-auto object-contain" blend />
          </Link>
          <Link
            to="/"
            hash="contact"
            onClick={() => preselectService(service.title)}
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <Link to="/" hash="services" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> All services
        </Link>

        <div className="mt-8 flex items-start gap-5">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full gradient-brand text-white shadow-glow">
            <service.icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft leading-relaxed">{service.longDesc}</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 max-w-3xl">
          {service.bullets.map(b => (
            <li key={b} className="flex gap-3 rounded-xl border border-border bg-white px-4 py-3 text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full gradient-brand" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            hash="contact"
            onClick={() => preselectService(service.title)}
            className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 min-h-[48px] text-base font-semibold text-white shadow-glow"
          >
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            hash="services"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand/30 px-7 py-3.5 min-h-[48px] text-base font-semibold text-brand"
          >
            View all services
          </Link>
        </div>

        <aside className="mt-16 border-t border-border pt-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Other services</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SERVICES.filter(s => s.slug !== service.slug).map(s => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </main>
  );
}
