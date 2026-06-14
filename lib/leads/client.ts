import type { LeadType } from "./types";

// Client-side helper every form uses to submit a lead. Type-only import above
// means none of the server sink code (Resend/Supabase) is bundled into the
// client. Forms stay decoupled from the backend entirely.

export type SubmitLeadInput = {
  type: LeadType;
  email: string;
  name?: string;
  data?: Record<string, string>;
  source?: string;
  /** Honeypot — leave empty; bots that fill it are silently dropped. */
  company_website?: string;
};

export async function submitLead(
  input: SubmitLeadInput
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error — please check your connection and try again.",
    };
  }
}
