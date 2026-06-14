import type { Lead, LeadSink } from "./types";
import { resendSink } from "./resend-sink";

// ============================================================================
// Active lead destinations.
//
// MIGRATION TO SUPABASE (later):
//   1. Add lib/leads/supabase-sink.ts exporting a `supabaseSink: LeadSink`
//      whose save() inserts a row (the Lead shape maps cleanly: type, email,
//      name, data -> jsonb, source, receivedAt).
//   2. Add it to the array below. Keep resendSink too if you still want the
//      email notification, or remove it to go DB-only.
// Nothing else in the app changes — forms and the API route only call saveLead.
// ============================================================================
const sinks: LeadSink[] = [resendSink];

/**
 * Persist/deliver a lead through every configured sink. Resolves if at least
 * one sink succeeds; rejects only if they ALL fail (so a future DB insert
 * succeeding still counts as captured even if the email notification fails).
 */
export async function saveLead(lead: Lead): Promise<void> {
  const results = await Promise.allSettled(sinks.map((s) => s.save(lead)));
  const rejected = results.filter(
    (r): r is PromiseRejectedResult => r.status === "rejected"
  );
  for (const r of rejected) {
    console.error("[leads] sink failed:", r.reason);
  }
  if (rejected.length === sinks.length) {
    throw rejected[0]?.reason ?? new Error("All lead sinks failed");
  }
}

export type { Lead, LeadType, LeadSink } from "./types";
