// Lead capture — provider-agnostic core types.
//
// The whole point of this module is that forms and the API route never know
// HOW a lead is stored or sent. They build a `Lead` and call `saveLead()`.
// Today that writes to Resend (email). To move to Supabase later, you add a
// sink that implements `LeadSink` and register it in ./index.ts — no changes
// to any form or the API route.

export type LeadType = "subscribe" | "waitlist" | "provider" | "investor";

export interface Lead {
  type: LeadType;
  email: string;
  name?: string;
  /** Form-specific fields, normalized to strings (phone, city, role, …). */
  data: Record<string, string>;
  /** Page path the lead came from, for context. */
  source?: string;
  /** ISO timestamp, set on the server when the lead is received. */
  receivedAt: string;
}

/**
 * A destination for captured leads. Resend (email) implements this today; a
 * Supabase (DB insert) implementation has the exact same shape. `save`
 * resolves on success and rejects on failure.
 */
export interface LeadSink {
  readonly name: string;
  save(lead: Lead): Promise<void>;
}

/** Human-readable label per lead type — used in email subjects, DB rows, etc. */
export const LEAD_LABELS: Record<LeadType, string> = {
  subscribe: "Newsletter signup",
  waitlist: "Waitlist / interest form",
  provider: "Clinician & DME inquiry",
  investor: "Investor — pitch deck request",
};
