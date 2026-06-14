import type { Lead, LeadSink } from "./types";
import { LEAD_LABELS } from "./types";

// Resend lead sink — formats a lead into an email and sends it via the Resend
// REST API. Isolated here so swapping/adding Supabase later touches nothing
// else. Uses fetch (no SDK dependency) so it runs on any server runtime.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Inbox that receives lead notifications.
const TO = process.env.LEADS_TO_EMAIL || "technotonin@gmail.com";

// Sender. Until a domain is verified in Resend, this MUST stay
// onboarding@resend.dev, and TO must be the Resend account's own email.
// After verifying wheelchairattachment.com in Resend, set RESEND_FROM to
// e.g. "PAWE <leads@wheelchairattachment.com>" to send from your domain.
const FROM = process.env.RESEND_FROM || "PAWE website <onboarding@resend.dev>";

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function rows(lead: Lead): [string, string][] {
  return (
    [
      ["Type", LEAD_LABELS[lead.type]],
      ...(lead.name ? [["Name", lead.name] as [string, string]] : []),
      ["Email", lead.email],
      ...Object.entries(lead.data),
      ...(lead.source ? [["Source", lead.source] as [string, string]] : []),
      ["Received", lead.receivedAt],
    ] as [string, string][]
  ).filter(([, v]) => v && v.trim() !== "");
}

function renderEmail(lead: Lead): { html: string; text: string } {
  const data = rows(lead);
  const text = data.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1A1612;background:#F5F4F0;padding:24px">
    <h2 style="margin:0 0 16px;font-size:18px">New ${escapeHtml(LEAD_LABELS[lead.type])}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px;background:#fff;border:1px solid #E0DED8;border-radius:10px;overflow:hidden">
      ${data
        .map(
          ([k, v], i) =>
            `<tr style="${i % 2 ? "background:#FBF9F5" : ""}">
              <td style="padding:10px 14px;font-weight:600;border-bottom:1px solid #EAE7E1;width:140px;vertical-align:top">${escapeHtml(k)}</td>
              <td style="padding:10px 14px;border-bottom:1px solid #EAE7E1;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`
        )
        .join("")}
    </table>
    <p style="color:#6B6B6B;font-size:12px;margin-top:16px">Reply directly to this email to reach ${escapeHtml(lead.email)}.</p>
  </body></html>`;
  return { html, text };
}

export const resendSink: LeadSink = {
  name: "resend",
  async save(lead) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set — add it to .env.local (local) and your Vercel project env (production).");
    }
    const { html, text } = renderEmail(lead);
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: lead.email,
        subject: `New ${LEAD_LABELS[lead.type]}${lead.name ? ` — ${lead.name}` : ""}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend send failed (${res.status}): ${detail.slice(0, 300)}`);
    }
  },
};
