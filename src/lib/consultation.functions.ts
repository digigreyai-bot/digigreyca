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

type Lead = z.infer<typeof schema>;

function buildHtml(data: Lead): string {
  return `
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
}

async function tryPersistToSupabase(data: Lead): Promise<boolean> {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return false;

  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { error: insertError } = await (supabase as any)
      .from("consultation_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        message: data.message || null,
      });

    if (insertError) {
      console.error("[consultation] insert failed:", insertError.message || insertError);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[consultation] insert threw:", err);
    return false;
  }
}

/**
 * Railway blocks outbound Gmail SMTP (ETIMEDOUT on :465/:587).
 * FormSubmit delivers over HTTPS to the inbox — first use needs one Confirm click in Gmail.
 */
async function sendViaFormSubmit(data: Lead, to: string): Promise<"ok" | "activate" | "fail"> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || "—",
        service: data.service,
        message: data.message || "—",
        _subject: SUBJECT,
        _template: "table",
        _replyto: data.email,
        _captcha: "false",
      }),
    });

    const body = (await res.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
      error?: string;
    };
    const text = `${body.message || ""} ${body.error || ""} ${body.success || ""}`.toLowerCase();

    if (!res.ok || body.error || text.includes("activate") || text.includes("confirm")) {
      console.error("[consultation] FormSubmit response:", res.status, body);
      if (text.includes("activate") || text.includes("confirm") || res.status === 200) {
        // FormSubmit often returns 200 with activation instructions on first use
        if (text.includes("activate") || text.includes("confirm") || text.includes("make sure")) {
          return "activate";
        }
      }
      if (!res.ok || body.error) return "fail";
    }

    return "ok";
  } catch (err) {
    console.error("[consultation] FormSubmit failed:", err);
    return "fail";
  } finally {
    clearTimeout(timer);
  }
}

async function sendViaResend(opts: {
  to: string;
  from: string;
  replyTo: string;
  html: string;
}): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      reply_to: opts.replyTo,
      subject: SUBJECT,
      html: opts.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[consultation] Resend send failed [${res.status}]: ${body}`);
    return false;
  }
  return true;
}

export const submitConsultation = createServerFn({ method: "POST" })
  .validator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    if (data.website && data.website.trim().length > 0) {
      return { ok: true, emailed: false };
    }

    const gmailUser = process.env.GMAIL;
    const TO_EMAIL =
      process.env.CONSULTATION_TO_EMAIL || gmailUser || "info@digigrey.ca";
    const FROM_EMAIL =
      process.env.CONSULTATION_FROM_EMAIL ||
      (gmailUser ? `DigiGrey Website <${gmailUser}>` : "DigiGrey Website <onboarding@resend.dev>");

    console.info("[consultation] lead:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      to: TO_EMAIL,
    });

    const saved = await tryPersistToSupabase(data);
    const html = buildHtml(data);

    let emailed = false;

    // Prefer Resend (HTTPS) if configured
    try {
      emailed = await sendViaResend({
        to: TO_EMAIL,
        from: FROM_EMAIL,
        replyTo: data.email,
        html,
      });
    } catch (err) {
      console.error("[consultation] Resend send failed:", err);
    }

    // Fallback: FormSubmit HTTPS → GMAIL inbox (SMTP blocked on Railway)
    if (!emailed) {
      const result = await sendViaFormSubmit(data, TO_EMAIL);
      if (result === "activate") {
        throw new Error(
          `Check ${TO_EMAIL} for a FormSubmit activation email, click Confirm, then submit again.`,
        );
      }
      emailed = result === "ok";
    }

    if (!saved && !emailed) {
      throw new Error("We couldn't save your request. Please try again.");
    }

    return { ok: true, emailed, saved };
  });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
