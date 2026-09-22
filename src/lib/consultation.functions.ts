import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  /** Honeypot — bots fill this; humans leave it empty. */
  website: z.string().max(200).optional().or(z.literal("")),
});

const SUBJECT = "New Consultation Request — DigiGrey Website";

export const submitConsultation = createServerFn({ method: "POST" })
  .validator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    // Bot sink: pretend success, do not persist or email
    if (data.website && data.website.trim().length > 0) {
      return { ok: true, emailed: false };
    }

    const SUPABASE_URL = process.env.SUPABASE_URL!;
    const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONSULTATION_TO_EMAIL || "info@digigrey.ca";
    const FROM_EMAIL =
      process.env.CONSULTATION_FROM_EMAIL || "DigiGrey Website <onboarding@resend.dev>";

    // 1) Persist to database (backup) using publishable/anon client
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const insertPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      message: data.message || null,
    };

    const { error: insertError } = await (supabase as any)
      .from("consultation_submissions")
      .insert(insertPayload);

    if (insertError) {
      console.error("[consultation] insert failed:", insertError);
      throw new Error("We couldn't save your request. Please try again.");
    }

    // 2) Send email via Resend (only if key is configured)
    if (!RESEND_API_KEY) {
      console.warn("[consultation] RESEND_API_KEY not set — submission stored but email not sent.");
      return { ok: true, emailed: false };
    }

    const html = `
      <div style="font-family:Manrope,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
        <h2 style="color:#4A0E6E;margin:0 0 16px">New Consultation Request</h2>
        <p style="color:#555;margin:0 0 24px">A new lead just came in via the DigiGrey website.</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:600;width:180px">Name</td><td style="padding:8px 0">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:600">Phone</td><td style="padding:8px 0">${escapeHtml(data.phone || "—")}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600">Service Interested In</td><td style="padding:8px 0">${escapeHtml(data.service)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(data.message || "—")}</td></tr>
        </table>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email,
        subject: SUBJECT,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[consultation] Resend send failed [${res.status}]: ${body}`);
      return { ok: true, emailed: false, warning: "Saved, but email delivery failed." };
    }

    return { ok: true, emailed: true };
  });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
