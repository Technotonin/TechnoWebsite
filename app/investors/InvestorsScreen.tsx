"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import Reveal from "@/components/Reveal";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

const whyNowRows = [
  {
    h: "The insurance window is opening",
    b: "Medicare recently revised its power-assist coverage to encompass devices that attach and detach quickly and let the chair revert to manual — exactly what PAWE is. We file for coverage as soon as we clear the FDA.",
  },
  {
    h: "Incumbent distribution is in flux",
    b: "Our only direct competitor's North American distribution is being restructured following an acquisition. The channel is open for a lighter, simpler, user-installed alternative.",
  },
  {
    h: "The demographic wave is beginning",
    b: "The oldest Americans — the highest wheelchair-use cohort — are the fastest-growing. We anchor on working-age users to earn insurance coverage first, then meet the wave with a covered product as it crests.",
  },
];

const seenInLogos = [
  { src: "/assets/logos/gbh-news.png", alt: "GBH News logo" },
  { src: "/assets/logos/boston25-news-logo.png", alt: "Boston 25 News logo" },
  { src: "/assets/logos/boston-news.png", alt: "Boston News logo" },
  { src: "/assets/logos/bellingham-bulletin.png", alt: "Bellingham Bulletin logo" },
  { src: "/assets/logos/wpi-logo.png", alt: "Worcester Polytechnic Institute logo" },
  { src: "/assets/logos/bu-logo.png", alt: "Boston University logo" },
  { src: "/assets/logos/efest-logo.png", alt: "e-Fest entrepreneurship competition logo" },
];

const founders = [
  {
    name: "Arav Tyagi",
    role: "Co-CEO & Co-founder · Computer Engineering, BU",
    photo: "/assets/team/arav-tyagi.png",
  },
  {
    name: "Antonio Marzoratti",
    role: "Co-CEO & Co-founder · Robotics Engineering, WPI",
    photo: "/assets/team/antonio-marzoratti.jpeg",
  },
];

const advisors = [
  {
    name: "Scott Harris",
    role: "Co-founder of SolidWorks and Onshape · Startup scaling",
    photo: "/assets/team/scott-harris.jpeg",
  },
  {
    name: "Paul Kalenian",
    role: "Inventor & serial entrepreneur · Hardware product development",
    photo: "/assets/team/paul-kalenian.jpg",
  },
  {
    name: "Ray Knox",
    role: "VP of Manufacturing, Terrestrial Bio · Regulatory manufacturing",
    photo: "/assets/team/ray-knox.jpg",
  },
];

export default function InvestorsScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  // Hero entrance: staggered line-by-line rise on the brand ease.
  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = heroRef.current;
      if (!el) return;
      gsap.from(el.querySelectorAll("[data-hero-line]"), {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "pawe",
        stagger: 0.09,
        clearProps: "transform,opacity",
      });
    },
    { scope: heroRef }
  );

  return (
    <main style={{ paddingTop: 72 }}>
      {/* ============================= 1. HERO — dark ============================= */}
      <section style={inv.hero} className="inv-hero">
        <div style={inv.innerWide}>
          <div style={inv.heroInner} ref={heroRef}>
            <div style={inv.eyebrowAmberOnDark} data-hero-line>
              <span style={inv.dotAmber}></span>For investors
            </div>
            <h1 style={inv.heroH1} className="inv-hero-h1" data-hero-line>
              Making mobility, PAWE-ssible.
            </h1>
            <p style={inv.heroLede} data-hero-line>
              3.75&nbsp;million Americans use manual wheelchairs. When pushing
              fails, every option today breaks their car, their home, or their
              bank account. PAWE turns any manual chair into a powered one in
              seconds &mdash; no dealer, no tools, no new chair.
            </p>
            <div style={inv.heroCtas} data-hero-line>
              <button
                style={inv.ctaPrimary}
                className="inv-cta-primary"
                onClick={scrollToForm}
              >
                Request the pitch deck
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= 2. WHY NOW — cream ============================= */}
      <section style={inv.whyNowSection} className="inv-section">
        <div style={inv.innerWide}>
          <Reveal style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={inv.eyebrowAmber}>
              <span style={inv.dotAmber}></span>Why now
            </div>
            <h2 style={inv.h2} className="inv-h2">
              The market is opening.
              <br />
              PAWE is built for the moment.
            </h2>
          </Reveal>
          <Reveal selector=":scope > *" stagger={0.1} style={inv.whyList}>
            {whyNowRows.map((r, i) => (
              <div key={i} style={inv.whyRow} className="inv-why-row">
                <div style={inv.whyH}>{r.h}</div>
                <div style={inv.whyB}>{r.b}</div>
              </div>
            ))}
          </Reveal>

          {/* As seen in */}
          <Reveal style={inv.seenInWrap}>
            <div style={inv.seenInLabel}>As seen in</div>
            <div style={inv.seenInRow} className="inv-seen-row">
              {seenInLogos.map((l) => (
                <img
                  key={l.src}
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  decoding="async"
                  style={inv.seenLogo}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================= 3. THE TEAM — dark ============================= */}
      <section style={inv.teamSection} className="inv-section">
        <div style={inv.innerWide}>
          <Reveal style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={inv.eyebrowAmberOnDark}>
              <span style={inv.dotAmber}></span>The team
            </div>
            <h2 style={inv.h2Dark} className="inv-h2-dark">
              The team.
            </h2>
            <p style={inv.ledeDark}>
              We started PAWE in 2022 after watching one of Antonio&rsquo;s
              family members navigate life in a manual wheelchair &mdash;
              needing a new chair every few months, requiring an accessible
              vehicle just to transport that wheelchair. We didn&rsquo;t like
              the available solutions. So we built one.
            </p>
          </Reveal>
          <Reveal
            selector=":scope > *"
            stagger={0.1}
            style={inv.teamPair}
            className="inv-team-pair"
          >
            {founders.map((t) => (
              <div key={t.name} style={inv.teamCardLarge}>
                <div
                  style={{
                    ...inv.teamPhotoLarge,
                    backgroundImage: `url('${t.photo}')`,
                  }}
                ></div>
                <div style={inv.teamNameLarge}>{t.name}</div>
                <div style={inv.teamRoleLarge}>{t.role}</div>
              </div>
            ))}
          </Reveal>

          <Reveal
            style={{ textAlign: "center", marginTop: 96, marginBottom: 48 }}
            className="inv-advisors-head"
          >
            <h2 style={inv.h2Dark} className="inv-h2-dark">
              Mentors &amp; advisors.
            </h2>
          </Reveal>
          <Reveal
            selector=":scope > *"
            stagger={0.1}
            style={inv.teamRowGrid}
            className="inv-team-grid"
          >
            {advisors.map((t) => (
              <div key={t.name} style={inv.teamCardLarge}>
                <div
                  style={{
                    ...inv.teamPhotoLarge,
                    backgroundImage: `url('${t.photo}')`,
                  }}
                ></div>
                <div style={inv.teamNameLarge}>{t.name}</div>
                <div style={inv.teamRoleLarge}>{t.role}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================= 4. THE ASK — cream ============================= */}
      <section style={inv.askSection} className="inv-section">
        <div style={inv.innerWide}>
          <Reveal style={inv.askGrid} className="inv-ask-grid">
            <div>
              <div style={inv.eyebrowAmber}>
                <span style={inv.dotAmber}></span>The ask
              </div>
              <h2 style={inv.h2} className="inv-h2">
                We are raising our seed round.
                <br />
                Let&rsquo;s talk.
              </h2>
            </div>
            <div style={inv.askBody}>
              <p style={inv.askP}>
                PAWE is raising a seed round to re-engineer the product to FDA
                standards with our contracted development partner, carry it
                through safety testing and our FDA submission, and prepare a
                commercial launch. The round is structured in milestone-gated
                tranches &mdash; terms, amounts, and the full financial model
                are in the deck.
              </p>
              <p style={inv.askP}>
                We have built this without venture capital &mdash; funded
                through grants, competition awards, and an accelerator program.
                Every dollar has gone into the product and the users. We are
                looking for our first institutional partner: someone who
                understands hardware, healthcare, or accessibility, and who
                wants to back a team that has already proven it can execute on
                a shoestring budget.
              </p>
              <div style={inv.askCtas}>
                <button
                  style={inv.ctaPrimary}
                  className="inv-cta-primary"
                  onClick={scrollToForm}
                >
                  Request the pitch deck
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================= 5. REQUEST THE DECK — dark ============================= */}
      <section style={inv.contactSection} className="inv-section" ref={formRef}>
        <div style={inv.innerNarrow}>
          <Reveal>
            <div style={inv.eyebrowAmberOnDark}>
              <span style={inv.dotAmber}></span>Get in touch
            </div>
            <h2 style={inv.h2Dark} className="inv-h2-dark">
              Request the pitch deck.
            </h2>
            <p style={inv.ledeDark}>
              Fill in the form and we&rsquo;ll follow up with the deck and
              availability for a call within 24 hours.
            </p>

            {!submitted && (
              <form style={inv.formCard} className="inv-form-card" onSubmit={submit}>
                <div style={inv.formGrid2} className="inv-form-grid2">
                  <div style={inv.formRow}>
                    <label htmlFor="inv-name" style={inv.formLabel}>Full name</label>
                    <input
                      id="inv-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => upd("name", e.target.value)}
                      placeholder="Maria Lopez"
                      style={inv.formInput}
                    />
                  </div>
                  <div style={inv.formRow}>
                    <label htmlFor="inv-email" style={inv.formLabel}>Email</label>
                    <input
                      id="inv-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => upd("email", e.target.value)}
                      placeholder="you@firm.com"
                      style={inv.formInput}
                    />
                  </div>
                </div>
                <div style={inv.formRow}>
                  <label htmlFor="inv-role" style={inv.formLabel}>
                    Role at firm <span style={inv.optional}>(optional)</span>
                  </label>
                  <input
                    id="inv-role"
                    name="role"
                    type="text"
                    value={form.role}
                    onChange={(e) => upd("role", e.target.value)}
                    placeholder="Partner, Principal, Analyst, etc."
                    style={inv.formInput}
                  />
                </div>
                <div style={inv.formRow}>
                  <label htmlFor="inv-category" style={inv.formLabel}>What best describes you</label>
                  <select
                    id="inv-category"
                    name="category"
                    value={form.category}
                    onChange={(e) => upd("category", e.target.value)}
                    style={inv.formInput}
                  >
                    <option value="">Please select…</option>
                    <option value="institutional">
                      Institutional VC / hardware fund
                    </option>
                    <option value="healthcare">
                      Healthcare / medical-device investor
                    </option>
                    <option value="impact">
                      Impact / accessibility-focused fund
                    </option>
                    <option value="angel">Angel or family office</option>
                    <option value="strategic">Strategic / DME / OEM</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={inv.formRow}>
                  <label htmlFor="inv-message" style={inv.formLabel}>
                    Message <span style={inv.optional}>(optional)</span>
                  </label>
                  <textarea
                    id="inv-message"
                    name="message"
                    value={form.message}
                    onChange={(e) => upd("message", e.target.value)}
                    placeholder="What drew you to PAWE? Anything specific you’d like to see in the deck?"
                    style={inv.formTextarea}
                    rows={4}
                  />
                </div>
                <div style={inv.formActions}>
                  <button
                    type="submit"
                    style={inv.ctaPrimary}
                    className="inv-cta-primary"
                  >
                    Send request
                  </button>
                  <div style={inv.formInline}>
                    or email{" "}
                    <a href="mailto:invest@technotonin.com" style={inv.formMail}>
                      invest@technotonin.com
                    </a>
                  </div>
                </div>
              </form>
            )}

            {submitted && (
              <div style={inv.successCard}>
                <div style={inv.successTick}>
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
                <h3 style={inv.successH}>Thanks &mdash; request received.</h3>
                <p style={inv.successP}>
                  We&rsquo;ll follow up to{" "}
                  <strong>{form.email || "your email"}</strong>{" "}
                  within 48&nbsp;hours with the deck and a few times to talk. Want it
                  sooner? Call{" "}
                  <a
                    href="tel:5083331435"
                    style={{
                      color: "var(--color-primary)",
                      textDecoration: "none",
                    }}
                  >
                    508 · 333 · 1435
                  </a>
                  .
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Responsive overrides (the prototype is desktop-only) */}
      <style>{`
        @media (max-width: 1024px) {
          .inv-hero-h1 { font-size: 56px !important; }
        }
        @media (max-width: 900px) {
          .inv-why-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .inv-ask-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .inv-team-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .inv-team-pair { gap: 56px !important; }
          .inv-why-row > *, .inv-ask-grid > *, .inv-team-grid > * { min-width: 0; }
        }
        @media (max-width: 640px) {
          .inv-hero { padding: 72px 0 56px !important; }
          .inv-section { padding: 64px 0 !important; }
          .inv-hero-h1 { font-size: 42px !important; letter-spacing: -1.2px !important; }
          .inv-h2 { font-size: 36px !important; }
          .inv-h2-dark { font-size: 38px !important; }
          .inv-form-grid2 { grid-template-columns: 1fr !important; }
          .inv-form-grid2 > * { min-width: 0; }
          .inv-form-card { padding: 28px 20px !important; }
          .inv-seen-row { gap: 20px !important; }
          .inv-team-pair { flex-direction: column !important; align-items: center !important; gap: 40px !important; }
          .inv-advisors-head { margin-top: 64px !important; }
          .inv-cta-primary { width: 100% !important; max-width: 360px !important; }
        }
      `}</style>
    </main>
  );
}

const inv: Record<string, CSSProperties> = {
  innerWide: { maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  innerNarrow: { maxWidth: 880, margin: "0 auto", padding: "0 32px" },
  eyebrowAmber: { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 16 },
  eyebrowAmberOnDark: { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 16 },
  dotAmber: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },
  h2: { fontFamily: "var(--font-serif)", fontSize: 48, fontWeight: 400, lineHeight: 1.08, letterSpacing: "-1.2px", color: "var(--color-ink)", margin: "0 0 24px", textWrap: "balance" },
  h2Dark: { fontFamily: "var(--font-serif)", fontSize: 52, fontWeight: 300, lineHeight: 1.06, letterSpacing: "-1.4px", color: "var(--color-on-dark)", margin: "0 0 24px", textWrap: "balance" },
  ledeDark: { fontFamily: "var(--font-sans)", fontSize: 17, color: "rgba(245,244,240,0.75)", lineHeight: 1.65, margin: "0 0 24px", textWrap: "pretty", maxWidth: 640 },

  // 1. Hero (dark)
  hero: { background: "var(--color-ink)", padding: "120px 0 96px" },
  heroInner: { textAlign: "center", maxWidth: 880, margin: "0 auto" },
  heroH1: { fontFamily: "var(--font-serif)", fontSize: 64, fontWeight: 300, lineHeight: 1.05, letterSpacing: "-2px", color: "var(--color-on-dark)", margin: "0 0 24px", textWrap: "balance" },
  heroLede: { fontFamily: "var(--font-sans)", fontSize: 18, color: "rgba(245,244,240,0.75)", lineHeight: 1.6, margin: "0 auto 36px", maxWidth: 600, textWrap: "pretty" },
  heroCtas: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },

  ctaPrimary: { height: 50, padding: "0 28px", borderRadius: 6, border: 0, background: "var(--color-primary)", color: "var(--color-on-primary)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "var(--shadow-cta-rest)" },
  ctaGhostOnDark: { display: "inline-flex", alignItems: "center", justifyContent: "center", height: 50, padding: "0 26px", borderRadius: 6, border: "1px solid rgba(245,244,240,0.35)", background: "transparent", color: "var(--color-on-dark)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" },
  ctaGhostOnLight: { display: "inline-flex", alignItems: "center", justifyContent: "center", height: 50, padding: "0 26px", borderRadius: 6, border: "1px solid var(--color-ink)", background: "transparent", color: "var(--color-ink)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, cursor: "pointer", textDecoration: "none" },

  // 2. Why now (cream)
  whyNowSection: { padding: "120px 0", background: "var(--color-canvas)" },
  whyList: { borderTop: "1px solid var(--color-hairline)" },
  whyRow: { display: "grid", gridTemplateColumns: "340px 1fr", gap: 48, padding: "36px 0", borderBottom: "1px solid var(--color-hairline)", alignItems: "start" },
  whyH: { fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 400, color: "var(--color-ink)", lineHeight: 1.2, letterSpacing: "-0.3px", textWrap: "balance" },
  whyB: { fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--color-body)", lineHeight: 1.6, maxWidth: 640 },

  seenInWrap: { marginTop: 56, paddingTop: 8 },
  seenInLabel: { fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-muted)", textAlign: "center", marginBottom: 28 },
  seenInRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 56 },
  seenLogo: { height: 36, maxWidth: 160, objectFit: "contain", filter: "grayscale(1) brightness(0.55)", opacity: 0.85 },

  // 3. Team (dark)
  teamSection: { padding: "120px 0", background: "var(--color-ink)" },
  teamPair: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 96, maxWidth: 760, margin: "0 auto" },
  teamRowGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 980, margin: "0 auto" },
  teamCardLarge: { textAlign: "center" },
  teamPhotoLarge: { width: 140, height: 140, borderRadius: "50%", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "var(--color-surface-strong)", margin: "0 auto 20px", border: "1px solid rgba(245,244,240,0.08)" },
  teamNameLarge: { fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 600, color: "var(--color-on-dark)", lineHeight: 1.3, marginBottom: 6 },
  teamRoleLarge: { fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(245,244,240,0.65)", lineHeight: 1.45, textWrap: "balance", maxWidth: 240, margin: "0 auto" },

  // 4. Ask (cream)
  askSection: { padding: "120px 0", background: "var(--color-canvas)" },
  askGrid: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start" },
  askBody: {},
  askP: { fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--color-body)", lineHeight: 1.7, margin: "0 0 20px", textWrap: "pretty" },
  askCtas: { display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" },

  // 5. Contact form (dark)
  contactSection: { padding: "120px 0", background: "var(--color-ink)", scrollMarginTop: 96 },
  formCard: { marginTop: 32, background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", borderRadius: 16, padding: 36, boxShadow: "var(--shadow-card-rest)", display: "flex", flexDirection: "column", gap: 18 },
  formGrid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  formRow: { display: "flex", flexDirection: "column", gap: 6 },
  formLabel: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--color-ink)", letterSpacing: 0.3 },
  optional: { fontWeight: 400, color: "var(--color-muted)", letterSpacing: 0 },
  formInput: { height: 48, borderRadius: 6, border: "1px solid var(--color-hairline)", padding: "0 16px", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--color-ink)", outline: 0, background: "var(--color-canvas)" },
  formTextarea: { borderRadius: 6, border: "1px solid var(--color-hairline)", padding: "12px 16px", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--color-ink)", outline: 0, background: "var(--color-canvas)", resize: "vertical", minHeight: 100 },
  formActions: { display: "flex", gap: 16, alignItems: "center", marginTop: 8, flexWrap: "wrap" },
  formInline: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-muted)" },
  formMail: { color: "var(--color-primary)", textDecoration: "none" },

  // Success
  successCard: { marginTop: 32, background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", borderRadius: 16, padding: "48px 36px", boxShadow: "var(--shadow-card-rest)", textAlign: "center" },
  successTick: { width: 56, height: 56, borderRadius: "50%", background: "var(--color-success-soft)", color: "var(--color-success)", display: "grid", placeItems: "center", margin: "0 auto 20px" },
  successH: { fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, color: "var(--color-ink)", margin: "0 0 12px", lineHeight: 1.15 },
  successP: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-body)", lineHeight: 1.6, margin: "0 auto", maxWidth: 360 },
};
