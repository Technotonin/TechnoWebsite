"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import SectionHeading from "@/components/SectionHeading";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

// =============================== FOR PROVIDERS ===============================
// Horizon-blue scoped page — the only page where horizon blue is the accent.

const ROLES = [
  { id: "pt", label: "PT" },
  { id: "ot", label: "OT" },
  { id: "atp", label: "ATP" },
  { id: "dme", label: "DME" },
];

const FAQ_ITEMS = [
  {
    q: "Who is PAWE appropriate for?",
    a: "Manual-wheelchair users with functional upper-body strength for joystick control and a folding-frame chair with 16–22 inch seat width. We’ll walk through the fit checklist with you on our call.",
  },
  {
    q: "Does PAWE replace a Group 3 powered chair?",
    a: "No — and we’d never claim it does. PAWE is an option for the much larger population currently in a manual chair who could benefit from powered mobility but doesn’t meet Group 3 criteria, or who is functional in a manual chair on flat ground but loses independence on hills or longer routes.",
  },
  {
    q: "Can I buy one for my clinic right now?",
    a: "Not yet. PAWE is pre-clearance — it has not been cleared by the FDA and is not currently available for purchase. Getting in touch adds you to our clinician & DME list so we can update you as we move through clearance.",
  },
  {
    q: "Will there be a loaner / evaluation program?",
    a: "Yes, once we’re ready to put units in clinical and supplier hands. Clinicians and DMEs on the list are first in line when it opens — we’ll cover the details on our call.",
  },
  {
    q: "How do I reach a founder?",
    a: "Email Info@technotonin.com or call 508 333 1435 — that line goes straight to a founder.  Call any time!",
  },
];

export default function ProvidersScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    clinic: "",
    role: "pt",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const upd = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: 72, background: "var(--color-canvas)" }}>
      {/* Hero — horizon-toned */}
      <section style={ps.hero} className="providers-hero">
        <div style={ps.heroInner} className="providers-hero-grid">
          <Reveal style={ps.heroLeft} selector=":scope > *" stagger={0.1}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <span style={ps.horizonChip}>For clinicians &amp; DMEs</span>
              <span style={ps.horizonChipQuiet}>PT · OT · ATP · DME</span>
            </div>
            <h1 style={ps.heroH1} className="providers-hero-h1">
              Interested in PAWE for your patients or customers?
            </h1>
            <p style={ps.heroLede}>
              PAWE is a 15&nbsp;lb electric attachment that turns most
              folding-frame manual wheelchairs into powered ones — for roughly
              one tenth the cost of a new powered chair. We&rsquo;re
              pre-clearance and not yet for sale, but we&rsquo;d love to share
              what we have so far with the clinicians and DME suppliers who
              would fit it.
            </p>
            <p style={ps.heroLede}>
              Drop your email and we&rsquo;ll contact you soon to see how the
              PAWE would fit your situation.
            </p>
          </Reveal>

          <Reveal style={ps.heroRight} delay={0.15}>
            <div style={ps.requestCard} className="providers-request-card">
              <div style={ps.requestEyebrow}>
                <span style={ps.dotHorizon}></span>
              </div>
              <div style={ps.requestTitle}>
                {submitted
                  ? "Thanks — we’ll be in touch."
                  : "Get in touch with us!"}
              </div>

              {!submitted && (
                <form style={ps.formBody} onSubmit={submit}>
                  <div style={ps.formRow}>
                    <label htmlFor="pv-name" style={ps.formLabel}>Full name</label>
                    <input
                      id="pv-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => upd("name", e.target.value)}
                      placeholder="Maria Lopez, DPT"
                      style={ps.formInput}
                    />
                  </div>
                  <div style={ps.formRow}>
                    <label htmlFor="pv-email" style={ps.formLabel}>Clinical / supplier email</label>
                    <input
                      id="pv-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => upd("email", e.target.value)}
                      placeholder="you@clinic.org"
                      style={ps.formInput}
                    />
                  </div>
                  <div style={ps.formRow}>
                    <label htmlFor="pv-clinic" style={ps.formLabel}>
                      Clinic, practice, or supplier{" "}
                      <span style={ps.optional}>(optional)</span>
                    </label>
                    <input
                      id="pv-clinic"
                      name="organization"
                      autoComplete="organization"
                      type="text"
                      value={form.clinic}
                      onChange={(e) => upd("clinic", e.target.value)}
                      placeholder="Worcester Rehab Associates"
                      style={ps.formInput}
                    />
                  </div>
                  <div style={ps.formRow}>
                    <span id="pv-role-label" style={ps.formLabel}>I am a…</span>
                    <div style={ps.toggleRow} role="group" aria-labelledby="pv-role-label">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          className="pv-toggle-btn"
                          aria-pressed={form.role === r.id}
                          onClick={() => upd("role", r.id)}
                          style={{
                            ...ps.toggleBtn,
                            background:
                              form.role === r.id
                                ? "var(--color-horizon)"
                                : "transparent",
                            color:
                              form.role === r.id
                                ? "var(--color-on-horizon)"
                                : "var(--color-ink)",
                            borderColor:
                              form.role === r.id
                                ? "var(--color-horizon)"
                                : "var(--color-hairline)",
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={ps.formRow}>
                    <label htmlFor="pv-comment" style={ps.formLabel}>
                      Anything specific you&rsquo;d like to know?{" "}
                      <span style={ps.optional}>(optional)</span>
                    </label>
                    <textarea
                      id="pv-comment"
                      name="comment"
                      value={form.comment}
                      onChange={(e) => upd("comment", e.target.value)}
                      placeholder="A patient profile you’re trying to fit, a chair compatibility question, etc."
                      style={ps.formTextarea}
                      rows={3}
                    />
                  </div>
                  <button type="submit" style={ps.formCta}>
                    Send
                  </button>
                  <div style={ps.formNote}>
                    No payment, no sales pitch. A founder reads every request.
                  </div>
                </form>
              )}

              {submitted && (
                <div style={ps.successBody}>
                  <div style={ps.successTick}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={ps.successH}>Request received.</h3>
                  <p style={ps.successP}>
                    We&rsquo;ll be in touch with{" "}
                    <strong>{form.email || "your email"}</strong>{" "}
                    within a few business days to set up a call. Questions in the meantime?
                    Call{" "}
                    <a
                      href="tel:5083331435"
                      style={{
                        color: "var(--color-horizon)",
                        textDecoration: "none",
                      }}
                    >
                      508 · 333 · 1435
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section style={ps.faqSection} className="providers-faq">
        <Reveal>
          <div style={ps.innerNarrow}>
            <SectionHeading
              eyebrow="Clinician & DME FAQ"
              title="Common questions."
              align="center"
              maxWidth={680}
            />

            <div style={{ marginTop: 48 }}>
              <FAQ items={FAQ_ITEMS} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Responsive overrides (prototype is desktop-only) */}
      <style>{`
        @media (max-width: 1024px) {
          .providers-hero-grid { gap: 48px !important; }
        }
        @media (max-width: 900px) {
          .providers-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .providers-hero-grid > * { min-width: 0; }
        }
        @media (max-width: 640px) {
          .providers-hero { padding: 56px 0 64px !important; }
          .providers-hero-h1 { font-size: 40px !important; letter-spacing: -1.2px !important; }
          .providers-request-card { padding: 24px 20px !important; }
          .providers-faq { padding: 72px 0 !important; }
          .pv-toggle-btn { height: 44px !important; }
        }
      `}</style>
    </main>
  );
}

const ps: Record<string, CSSProperties> = {
  innerNarrow: { maxWidth: 880, margin: "0 auto", padding: "0 32px" },

  // Hero
  hero: { padding: "80px 0 96px", borderBottom: "1px solid var(--color-hairline-soft)" },
  heroInner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" },
  heroLeft: { paddingTop: 16 },
  heroH1: { fontFamily: "var(--font-serif)", fontSize: 56, fontWeight: 300, lineHeight: 1.04, letterSpacing: "-1.6px", color: "var(--color-ink)", margin: 0, textWrap: "balance" },
  heroLede: { fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--color-body)", lineHeight: 1.65, marginTop: 24, maxWidth: 520, textWrap: "pretty" },

  horizonChip: { display: "inline-flex", alignItems: "center", height: 28, padding: "0 14px", background: "var(--color-horizon-soft)", color: "var(--color-horizon-ink)", borderRadius: 9999, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 },
  horizonChipQuiet: { display: "inline-flex", alignItems: "center", height: 28, padding: "0 14px", background: "transparent", color: "var(--color-horizon)", border: "1px solid var(--color-horizon)", borderRadius: 9999, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500 },

  // Request card
  heroRight: { position: "relative" },
  requestCard: { background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", borderRadius: 16, padding: 32, boxShadow: "var(--shadow-card-rest)" },
  requestEyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--color-horizon)", marginBottom: 8 },
  dotHorizon: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-horizon)" },
  requestTitle: { fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.2, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--color-hairline)" },

  formBody: { display: "flex", flexDirection: "column", gap: 16 },
  formRow: { display: "flex", flexDirection: "column", gap: 6 },
  formLabel: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--color-ink)", letterSpacing: 0.3 },
  optional: { fontWeight: 400, color: "var(--color-muted)", letterSpacing: 0 },
  formInput: { height: 48, borderRadius: 6, border: "1px solid var(--color-hairline)", padding: "0 16px", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--color-ink)", outline: 0, background: "var(--color-canvas)" },
  formTextarea: { borderRadius: 6, border: "1px solid var(--color-hairline)", padding: "12px 16px", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--color-ink)", outline: 0, background: "var(--color-canvas)", resize: "vertical", minHeight: 84 },
  toggleRow: { display: "flex", gap: 8 },
  toggleBtn: { flex: 1, height: 42, borderRadius: 6, border: "1px solid var(--color-hairline)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "0 8px", letterSpacing: 0.4 },
  formCta: { marginTop: 8, height: 50, borderRadius: 6, border: 0, background: "var(--color-horizon)", color: "var(--color-on-horizon)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, cursor: "pointer" },
  formNote: { fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-muted)", marginTop: 4, textAlign: "center", lineHeight: 1.5 },

  // Success
  successBody: { padding: "8px 0 8px", textAlign: "center" },
  successTick: { width: 56, height: 56, borderRadius: "50%", background: "var(--color-success-soft)", color: "var(--color-success)", display: "grid", placeItems: "center", margin: "0 auto 20px" },
  successH: { fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, color: "var(--color-ink)", margin: "0 0 12px", lineHeight: 1.15 },
  successP: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-body)", lineHeight: 1.6, margin: "0 auto", maxWidth: 320 },

  faqSection: { padding: "120px 0", background: "var(--color-surface-soft)" },
};
