"use client";

import { useState, type CSSProperties } from "react";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// =============================== JOIN THE WAITLIST ===============================

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  chair: string;
  comment: string;
  role: string;
};

const BENEFITS = [
  { h: "No payment", b: "We can’t sell yet — this is interest only." },
  { h: "One short note per quarter", b: "Progress, milestones, and pilot updates." },
  { h: "First in line", b: "Pilot users get priority when units ship." },
  { h: "Real founders, real phone", b: "A founder will call you back if you ask." },
];

const ROLES = [
  { id: "user", label: "Wheelchair user" },
  { id: "family", label: "Caretaker" },
  { id: "clinician", label: "Clinician" },
];

const FAQ_ITEMS = [
  {
    q: "Is PAWE available to buy?",
    a: "Not yet. PAWE is pre-clearance — it has not been cleared by the FDA and is not currently available for purchase. The interest form just adds you to our list so we can update you as we move through testing and clearance.",
  },
  {
    q: "Am I being charged anything?",
    a: "No. We can’t accept payment for PAWE yet. The interest form is free and there’s no obligation. If you don’t want to hear from us, write us back any time and we’ll remove you from the list.",
  },
  {
    q: "What if my chair isn’t compatible?",
    a: "We’ll let you know within about a week. Most folding-frame chairs are yes; rigid frames are a work in progress. If we can’t fit your chair today, we’ll keep you on the list and let you know when we can.",
  },
  {
    q: "How often will you email me?",
    a: "Once a quarter, max. Progress, what we shipped, what we learned. If something urgent changes — a clearance milestone, an ordering window — we’ll send a separate note.",
  },
  {
    q: "Can a clinician or family member sign up on someone’s behalf?",
    a: "Yes. Pick “Family member” or “Clinician” on the form and write the user’s chair details and routes in the comment field. We follow up with both of you.",
  },
  {
    q: "How do I get hold of a founder?",
    a: "Write us at Info@technotonin.com or call 508 · 333 · 1435 — that line goes to a real founder. Mon–Fri, 9 am–6 pm ET.",
  },
];

export default function WaitlistScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    city: "",
    chair: "",
    comment: "",
    role: "user",
  });
  const upd = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: 72 }}>
      {/* HERO + FORM */}
      <section className="wl-hero" style={ws.hero}>
        <div className="wl-hero-grid" style={ws.heroInner}>
          <Reveal selector=":scope > *" stagger={0.1} style={ws.heroLeft}>
            <div style={ws.eyebrow}>
              <span style={ws.dot}></span>Pilot 01 &middot; Pre-clearance &middot; summer 2026
            </div>
            <h1 style={ws.heroH1}>
              Join the waitlist.
              <br />
              Help us build PAWE.
            </h1>
            <p style={ws.heroLede}>
              PAWE is pre-clearance and not yet for sale. Share a few details and we&rsquo;ll keep you
              posted as we move through testing and FDA clearance. Pilot users help shape the product
              before it ships.
            </p>
            <div className="wl-benefits" style={ws.heroBenefits}>
              {BENEFITS.map((b) => (
                <div key={b.h} style={ws.benefit}>
                  <span style={ws.benefitTick}>
                    <svg
                      width="14"
                      height="14"
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
                  </span>
                  <div>
                    <div style={ws.benefitH}>{b.h}</div>
                    <div style={ws.benefitB}>{b.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* RIGHT — single-step interest form */}
          <Reveal className="wl-sticky" delay={0.2}>
            <div className="wl-form-card" style={ws.formCard}>
              <div style={ws.formHeader}>
                <div>
                  <div style={ws.formStepLabel}>Interest form</div>
                  <div style={ws.formTitle}>
                    {submitted ? "Thanks — we’ve got you." : "Tell us about you"}
                  </div>
                </div>
              </div>

              {!submitted && (
                <form style={ws.formBody} onSubmit={submit}>
                  <div style={ws.formRow}>
                    <label style={ws.formLabel} htmlFor="wl-name">
                      Full name
                    </label>
                    <input
                      id="wl-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => upd("name", e.target.value)}
                      placeholder="Maria Lopez"
                      className="pawe-input"
                    />
                  </div>
                  <div className="wl-form-grid2" style={ws.formGrid2}>
                    <div style={ws.formRow}>
                      <label style={ws.formLabel} htmlFor="wl-email">
                        Email
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => upd("email", e.target.value)}
                        placeholder="you@email.com"
                        className="pawe-input"
                      />
                    </div>
                    <div style={ws.formRow}>
                      <label style={ws.formLabel} htmlFor="wl-phone">
                        Phone
                      </label>
                      <input
                        id="wl-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => upd("phone", e.target.value)}
                        placeholder="(508) 555-0199"
                        className="pawe-input"
                      />
                    </div>
                  </div>
                  <div style={ws.formRow}>
                    <label style={ws.formLabel} htmlFor="wl-city">
                      City &amp; state
                    </label>
                    <input
                      id="wl-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => upd("city", e.target.value)}
                      placeholder="Worcester, MA"
                      className="pawe-input"
                    />
                  </div>
                  <div style={ws.formRow}>
                    <span id="wl-role-label" style={ws.formLabel}>I am a&hellip;</span>
                    <div className="wl-toggle-row" style={ws.toggleRow} role="group" aria-labelledby="wl-role-label">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => upd("role", r.id)}
                          aria-pressed={form.role === r.id}
                          style={{
                            ...ws.toggleBtn,
                            background:
                              form.role === r.id ? "var(--color-ink)" : "transparent",
                            color:
                              form.role === r.id
                                ? "var(--color-on-dark)"
                                : "var(--color-ink)",
                            borderColor:
                              form.role === r.id
                                ? "var(--color-ink)"
                                : "var(--color-hairline)",
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={ws.formRow}>
                    <label style={ws.formLabel} htmlFor="wl-chair">
                      Wheelchair manufacturer &amp; model <span style={ws.optional}>(optional)</span>
                    </label>
                    <input
                      id="wl-chair"
                      type="text"
                      value={form.chair}
                      onChange={(e) => upd("chair", e.target.value)}
                      placeholder="e.g. Quickie Q7, 2021"
                      className="pawe-input"
                    />
                    <div style={ws.formHint}>
                      If you don&rsquo;t know, write &ldquo;not sure&rdquo; &mdash; we&rsquo;ll figure it out.
                    </div>
                  </div>
                  <div style={ws.formRow}>
                    <label style={ws.formLabel} htmlFor="wl-comment">
                      Anything you&rsquo;d like us to know? <span style={ws.optional}>(optional)</span>
                    </label>
                    <textarea
                      id="wl-comment"
                      value={form.comment}
                      onChange={(e) => upd("comment", e.target.value)}
                      placeholder="Tell us about your daily routes, what's tough about your current chair, or anything you want PAWE to solve."
                      className="pawe-textarea"
                      style={{ minHeight: 96 }}
                      rows={4}
                    />
                  </div>
                  <button type="submit" className="wl-cta" style={ws.formCta}>
                    Submit interest &rarr;
                  </button>
                  <div style={ws.formNote}>
                    No payment. No spam. One short note per quarter, max.
                  </div>
                </form>
              )}

              {submitted && (
                <div style={ws.successBody}>
                  <div style={ws.successTick}>
                    <svg
                      width="32"
                      height="32"
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
                  <h2 style={ws.successH}>We&rsquo;ve got you.</h2>
                  <p style={ws.successP}>
                    We&rsquo;ll send a quick confirmation to <strong>{form.email || "your email"}</strong>{" "}
                    shortly. A founder reads every submission personally &mdash; expect a note from us within a few
                    business days.
                  </p>
                  <div style={ws.successDetails}>
                    <div style={ws.successRow}>
                      <span style={ws.successLab}>Got urgent questions?</span>
                      <a
                        href="tel:5083331435"
                        style={{
                          ...ws.successVal,
                          color: "var(--color-primary)",
                          textDecoration: "none",
                        }}
                      >
                        508 &middot; 333 &middot; 1435
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="wl-band" style={ws.faqSection}>
        <div style={ws.innerNarrow}>
          <Reveal className="wl-faq-head" style={{ marginBottom: 48, maxWidth: 640 }}>
            <SectionHeading
              eyebrow="Waitlist FAQ"
              title="Common questions about the interest list."
              maxWidth={640}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>

      {/* SOCIAL PROOF FOOTER */}
      <section className="wl-band" style={ws.socialSection}>
        <div style={ws.innerNarrow}>
          <Reveal>
            <div className="wl-social-card" style={ws.socialCard}>
              <div style={ws.socialQuoteMark} aria-hidden="true">
                &ldquo;
              </div>
              <p className="wl-social-quote" style={ws.socialQuote}>
                I signed up on a Tuesday. A founder called me on Friday. We talked for an hour about my
                chair and my commute. That&rsquo;s not a thing a $30,000 powered-chair company does.
              </p>
              <div style={ws.socialAttr}>
                <div>
                  <div style={ws.socialName}>Beta user family member</div>
                  <div style={ws.socialLoc}>Pilot 01 &middot; Providence, RI</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Page-scoped responsive rules (prototype is desktop-only) */}
      <style>{`
        .wl-hero-grid { grid-template-columns: 1.1fr 1fr; }
        .wl-benefits { grid-template-columns: 1fr 1fr; }
        .wl-form-grid2 { grid-template-columns: 1fr 1fr; }
        .wl-sticky { position: sticky; top: 104px; }
        .wl-cta:hover { background: var(--color-primary-hover) !important; box-shadow: var(--shadow-cta-hover) !important; }
        .wl-cta:active { background: var(--color-primary-active) !important; box-shadow: none !important; }

        @media (max-width: 1024px) {
          .wl-hero-grid { gap: 48px !important; }
        }

        @media (max-width: 900px) {
          .wl-hero-grid { grid-template-columns: 1fr; }
          .wl-benefits { grid-template-columns: 1fr; }
          .wl-sticky { position: static; }
          .wl-hero { padding: 56px 0 88px !important; }
          .wl-band { padding: 88px 0 !important; }
        }

        @media (max-width: 640px) {
          .wl-hero-grid, .wl-band > div { padding-left: 20px !important; padding-right: 20px !important; }
          .wl-hero-grid h1 { font-size: 42px !important; letter-spacing: -1.2px !important; }
          .wl-faq-head h2 { font-size: 34px !important; letter-spacing: -0.7px !important; }
          .wl-form-grid2 { grid-template-columns: 1fr; }
          .wl-toggle-row { flex-direction: column; }
          .wl-form-card { padding: 28px 22px !important; }
          .wl-social-card { padding: 40px 28px !important; }
          .wl-social-quote { font-size: 22px !important; }
          .wl-hero { padding: 48px 0 72px !important; }
          .wl-band { padding: 72px 0 !important; }
        }
      `}</style>
    </main>
  );
}

const ws: Record<string, CSSProperties> = {
  innerNarrow: { maxWidth: 1040, margin: "0 auto", padding: "0 32px" },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },

  // Hero
  hero: { padding: "80px 0 120px", background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline-soft)" },
  heroInner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gap: 80, alignItems: "start" },
  heroLeft: { paddingTop: 24 },
  heroH1: { fontFamily: "var(--font-serif)", fontSize: 60, fontWeight: 300, lineHeight: 1.04, letterSpacing: "-1.8px", color: "var(--color-ink)", margin: 0, textWrap: "balance" },
  heroLede: { fontFamily: "var(--font-sans)", fontSize: 18, color: "var(--color-body)", lineHeight: 1.65, margin: "24px 0 0", maxWidth: 480, textWrap: "pretty" },
  heroBenefits: { marginTop: 40, display: "grid", gap: 16, maxWidth: 520 },
  benefit: { display: "flex", gap: 12, alignItems: "flex-start" },
  benefitTick: { width: 26, height: 26, borderRadius: "50%", background: "var(--color-primary-soft)", color: "var(--color-primary-ink)", display: "grid", placeItems: "center", flexShrink: 0 },
  benefitH: { fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.3 },
  benefitB: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-muted)", marginTop: 2 },

  // Form card (sticky lives on the .wl-sticky wrapper so it can drop at <=900px)
  formCard: { background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", borderRadius: 16, padding: 36, boxShadow: "var(--shadow-card-rest)" },
  formHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 24, marginBottom: 24, borderBottom: "1px solid var(--color-hairline)" },
  formStepLabel: { fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--color-muted)" },
  formTitle: { fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 400, color: "var(--color-ink)", marginTop: 6, lineHeight: 1.2 },
  formBody: { display: "flex", flexDirection: "column", gap: 18 },
  formGrid2: { display: "grid", gap: 12 },
  formRow: { display: "flex", flexDirection: "column", gap: 6 },
  formLabel: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--color-ink)", letterSpacing: 0.3 },
  optional: { fontWeight: 400, color: "var(--color-muted)", letterSpacing: 0 },
  formHint: { fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-muted)", marginTop: 2 },
  formCta: { marginTop: 12, height: 52, borderRadius: 6, border: 0, background: "var(--color-primary)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: "var(--shadow-cta-rest)", transition: "background var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)" },
  formNote: { fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-muted)", marginTop: 4, textAlign: "center", lineHeight: 1.5 },

  toggleRow: { display: "flex", gap: 8 },
  toggleBtn: { flex: 1, height: 44, borderRadius: 6, border: "1px solid var(--color-hairline)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "0 8px" },

  // Success
  successBody: { padding: "20px 0 20px", textAlign: "center" },
  successTick: { width: 64, height: 64, borderRadius: "50%", background: "var(--color-success-soft)", color: "var(--color-success)", display: "grid", placeItems: "center", margin: "0 auto 24px" },
  successH: { fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 400, color: "var(--color-ink)", margin: "0 0 12px", lineHeight: 1.15 },
  successP: { fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--color-body)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 360 },
  successDetails: { background: "var(--color-canvas)", border: "1px solid var(--color-hairline)", borderRadius: 10, padding: "18px 22px", textAlign: "left" },
  successRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", alignItems: "center" },
  successLab: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-muted)" },
  successVal: { fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-ink)" },

  // FAQ
  faqSection: { padding: "120px 0", background: "var(--color-canvas)" },

  // Social
  socialSection: { padding: "120px 0", background: "var(--color-surface-soft)" },
  socialCard: { background: "var(--color-ink)", borderRadius: 16, padding: 56, color: "var(--color-on-dark)" },
  socialQuoteMark: { fontFamily: "var(--font-serif)", fontSize: 80, lineHeight: 0.6, color: "var(--color-primary)", marginBottom: 24, height: 36 },
  socialQuote: { fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 300, fontStyle: "italic", lineHeight: 1.35, color: "var(--color-on-dark)", margin: "0 0 32px", maxWidth: 720, textWrap: "balance" },
  socialAttr: { display: "flex", alignItems: "center", gap: 16, paddingTop: 24, borderTop: "1px solid rgba(245,244,240,0.18)" },
  socialName: { fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--color-on-dark)" },
  socialLoc: { fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(245,244,240,0.6)", marginTop: 2 },
};
