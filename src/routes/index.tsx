import { createFileRoute } from "@tanstack/react-router";
import DigiGreyLanding from "@/components/DigiGreyLanding";
import logoUrl from "@/assets/digigrey-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiGrey Digital Visionaries — AI Automation, Web & App Development, Social Media & Design" },
      {
        name: "description",
        content:
          "Canadian-registered digital agency with delivery teams in Pakistan. AI automation, web & app development, social media, graphic design, and ad management for global brands.",
      },
      { property: "og:title", content: "DigiGrey Digital Visionaries" },
      {
        property: "og:description",
        content:
          "One partner for your entire digital presence — AI automation, web & app development, social media, design, and advertising.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: logoUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: logoUrl },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: DigiGreyLanding,
});
