"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

// =============================== ABOUT ===============================
export default function AboutScreen() {
  const team = [
    { name: "Arav Tyagi", role: "Co-CEO & Co-founder", photo: "/assets/team/arav-tyagi.png" },
    { name: "Antonio Marzoratti", role: "Co-CEO & Co-founder", photo: "/assets/team/antonio-marzoratti.jpeg" },
  ];

  const mentorsRow1 = [
    { name: "Scott Harris", role: "Co-founder of Solidworks and Onshape", photo: "/assets/team/scott-harris.jpeg" },
    { name: "Paul Kalenian", role: "Serial Inventor & entrepreneur, founder of Kalenian Coffee Group", photo: "/assets/team/paul-kalenian.jpg" },
    { name: "Ray Knox", role: "Founder of KBDG", photo: "/assets/team/ray-knox.jpg" },
  ];

  const mentorsRow2 = [
    { name: "Gordon Hull", role: "Co-owner of GS Enterprises LLC", photo: "/assets/team/gordon-hull.jpg" },
    { name: "Susan Conrad", role: "Co-owner of GS Enterprises LLC", photo: "/assets/team/susan-conrad.jpg" },
  ];

  // Hero load entrance: eyebrow → headline → sub rise in sequence.
  const heroRef = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (prefersReducedMotion()) return;
      gsap.from("[data-hero-rise]", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "pawe",
        stagger: 0.14,
        delay: 0.15,
        clearProps: "transform,opacity",
      });
    },
    { scope: heroRef }
  );

  return (
    <main>
      {/* ============================= 0. HERO (full-bleed) ============================= */}
      <section ref={heroRef} className="about-hero" style={hero.shell}>
        <div
          style={{
            ...hero.image,
            backgroundImage: "url('/assets/photos/about-us-team.jpg')",
            backgroundPosition: "center 30%",
          }}
        ></div>
        <div style={hero.scrim}></div>
        <div className="about-hero-wrap" style={hero.contentWrap}>
          <div style={hero.content}>
            <div style={hero.eyebrow} data-hero-rise>
              <span style={hero.dot}></span>About
            </div>
            <h1 className="about-hero-h1" style={hero.h1} data-hero-rise>
              About us.
            </h1>
            <p className="about-hero-sub" style={hero.sub} data-hero-rise>
              Building mobility tools in the real world, side by side with the people who use them.
            </p>
          </div>
        </div>
      </section>

      {/* ============================= 1. THE MISSION ============================= */}
      <section className="about-section" style={as.editorialSection}>
        <div style={as.innerWide}>
          <Reveal
            className="about-mission-grid"
            style={as.missionGrid}
            selector=":scope > *"
            stagger={0.12}
          >
            <div style={as.missionImageWrap}>
              <img
                src="/assets/photos/about-pawe-wheelchair.jpg"
                alt="PAWE power attachment mounted on the front of a manual wheelchair"
                loading="lazy"
                decoding="async"
                style={as.missionImage}
              />
            </div>
            <div>
              <div style={as.eyebrow}>
                <span style={as.dot}></span>Our mission
              </div>
              <h2 className="about-h2" style={as.h2}>The mission.</h2>
              <p style={as.bodyP}>
                At <strong>Technotonin Industries</strong>, we believe mobility should never be a barrier to
                independence. Our mission is to empower wheelchair users with affordable, portable, and
                intuitive technology that seamlessly integrates into their lives. PAWE, the{" "}
                <strong>Portable Affordable Wheelchair Enhancer</strong>, was born out of a deep understanding
                of the real challenges people with mobility impairments face every day — challenges that
                traditional electric wheelchairs fail to solve. We created PAWE because we saw firsthand how
                mobility limitations impact lives.
              </p>
              <p style={as.bodyP}>
                For the past <strong>four years</strong>, we&rsquo;ve worked tirelessly to develop and refine PAWE,
                gathering insights from <strong>above 100 interviews</strong>{" "}
                with wheelchair users and working with industry experts, mentors, and medical professionals to ensure our solution truly meets their needs.
                We&rsquo;ve built PAWE <strong>not in a lab, but in the real world</strong>, side by side with the
                people who will use it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================= 2. THE TEAM ============================= */}
      <section className="about-section" style={as.darkSection}>
        <div style={as.innerWide}>
          <Reveal className="about-band-heading" style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="about-h2-dark" style={as.h2Dark}>The team.</h2>
          </Reveal>
          <Reveal className="about-team-pair" style={as.teamPair} selector=":scope > *">
            {team.map((t) => (
              <div key={t.name} style={as.teamCardDark}>
                <div
                  role="img"
                  aria-label={t.name}
                  className="about-team-photo"
                  style={{ ...as.teamPhotoLarge, backgroundImage: `url('${t.photo}')` }}
                ></div>
                <div style={as.teamNameDark}>{t.name}</div>
                <div style={as.teamRoleDark}>{t.role}</div>
              </div>
            ))}
          </Reveal>

          {/* Mentors */}
          <Reveal
            className="about-band-heading about-mentors-heading"
            style={{ textAlign: "center", marginTop: 96, marginBottom: 64 }}
          >
            <h2 className="about-h2-dark" style={as.h2Dark}>Mentors.</h2>
          </Reveal>
          <Reveal className="about-team-row" style={as.teamRow} selector=":scope > *">
            {mentorsRow1.map((t) => (
              <div key={t.name} style={as.teamCardDark}>
                <div
                  role="img"
                  aria-label={t.name}
                  className="about-team-photo"
                  style={{ ...as.teamPhotoLarge, backgroundImage: `url('${t.photo}')` }}
                ></div>
                <div style={as.teamNameDark}>{t.name}</div>
                <div style={as.teamRoleDark}>{t.role}</div>
              </div>
            ))}
          </Reveal>
          <Reveal
            className="about-team-pair"
            style={{ ...as.teamPair, marginTop: 48 }}
            selector=":scope > *"
          >
            {mentorsRow2.map((t) => (
              <div key={t.name} style={as.teamCardDark}>
                <div
                  role="img"
                  aria-label={t.name}
                  className="about-team-photo"
                  style={{ ...as.teamPhotoLarge, backgroundImage: `url('${t.photo}')` }}
                ></div>
                <div style={as.teamNameDark}>{t.name}</div>
                <div style={as.teamRoleDark}>{t.role}</div>
              </div>
            ))}
          </Reveal>

          {/* Closing line + CTA */}
          <Reveal className="about-family-block" style={as.familyBlock}>
            <p style={as.familyP}>
              And countless others who are part of the <strong>Technotonin Family</strong>, helping shape
              PAWE into a solution that empowers millions.
            </p>
            <p style={as.familyP}>
              If you or someone you know can help us with our mission, contact us now — and let&rsquo;s make
              mobility <em>PAWE-ssible.</em>
            </p>
            <Link
              href="/waitlist"
              className="about-contact-btn"
              style={{ ...as.contactBtn, display: "inline-flex", alignItems: "center" }}
            >
              Contact us →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================= 3. WHY OUR NAME ============================= */}
      <section className="about-section" style={as.editorialSection}>
        <div style={as.innerWide}>
          <Reveal
            className="about-name-grid"
            style={as.nameGrid}
            selector=":scope > *"
            stagger={0.12}
          >
            <div>
              <div style={as.eyebrow}>
                <span style={as.dot}></span>The name
              </div>
              <h2 className="about-h2" style={as.h2}>Why our name?</h2>
              <p style={as.bodyP}>
                <strong>Technotonin</strong> is a fusion of <strong>&ldquo;Technology&rdquo;</strong> and{" "}
                <strong>&ldquo;Serotonin&rdquo;</strong>, representing our mission to create innovative assistive
                technology that enhances mobility, independence, and overall well-being. Just as serotonin
                plays a crucial role in improving mood and quality of life, our technology is designed to{" "}
                <strong>empower wheelchair users</strong>, giving them the freedom to move with confidence
                and ease.
              </p>
              <p style={as.bodyP}>
                At <strong>Technotonin Industries</strong>, we believe that{" "}
                <strong>mobility should not be a limitation</strong>, and through smart, user-centric
                solutions like PAWE, we are redefining what&rsquo;s possible in assistive technology.
              </p>
            </div>
            <div className="about-name-visual" style={as.nameVisual}>
              <div style={as.nameChipTop}>Why our name?</div>
              <div className="about-name-wordmark" style={as.nameWordmark}>
                <span style={as.nameWordmarkBlack}>Techno</span>
                <span style={as.nameWordmarkAmber}>tonin</span>
              </div>
              <div className="about-name-formula" style={as.nameFormulaRow}>
                <span style={as.nameChipPart}>Technology</span>
                <span style={as.namePlus}>+</span>
                <span style={as.nameChipPart}>Serotonin</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Page-scoped responsive overrides (prototype is desktop-only) */}
      <style>{`
        .about-contact-btn:hover {
          background: var(--color-primary-hover) !important;
          box-shadow: var(--shadow-cta-hover) !important;
          text-decoration: none;
        }
        .about-contact-btn:active {
          background: var(--color-primary-active) !important;
          box-shadow: none !important;
        }
        /* Mobile browsers: size the hero to the small viewport (URL bar visible).
           Browsers without svh support drop these rules and keep the inline 100vh. */
        .about-hero { min-height: 100svh !important; }
        .about-hero-wrap { min-height: 100svh !important; }
        @media (max-width: 1024px) {
          .about-mission-grid, .about-name-grid { gap: 56px !important; }
        }
        @media (max-width: 900px) {
          .about-hero-h1 { font-size: 60px !important; letter-spacing: -1.8px !important; }
          .about-mission-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-name-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-team-row { grid-template-columns: 1fr !important; row-gap: 48px !important; }
          .about-team-pair { gap: 48px !important; }
          .about-section { padding: 96px 0 !important; }
        }
        @media (max-width: 640px) {
          .about-hero-h1 { font-size: 44px !important; letter-spacing: -1.4px !important; }
          .about-hero-sub { font-size: 17px !important; }
          .about-hero-wrap { padding: 0 32px 56px !important; }
          .about-h2 { font-size: 36px !important; letter-spacing: -0.8px !important; }
          .about-h2-dark { font-size: 36px !important; letter-spacing: -0.9px !important; }
          .about-section { padding: 72px 0 !important; }
          .about-band-heading { margin-bottom: 40px !important; }
          .about-mentors-heading { margin-top: 64px !important; }
          .about-team-pair { flex-direction: column; align-items: center; gap: 40px !important; }
          .about-team-row { row-gap: 40px !important; }
          .about-team-photo { width: 120px !important; height: 120px !important; }
          .about-family-block { margin-top: 64px !important; }
          .about-name-visual { padding: 36px 24px !important; gap: 28px !important; }
          .about-name-wordmark { font-size: 44px !important; letter-spacing: -1.2px !important; }
          .about-name-formula { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </main>
  );
}

// Full-bleed photo hero — ported from the prototype's HeroFull component
// (components.jsx), inlined with height=100vh / position="center 30%".
const hero: Record<string, CSSProperties> = {
  shell: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background: "var(--color-ink)",
    minHeight: "100vh",
  },
  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
  },
  scrim: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(26,22,18,0.85) 0%, rgba(26,22,18,0.45) 35%, rgba(26,22,18,0.12) 60%, rgba(26,22,18,0) 100%)",
  },
  contentWrap: {
    position: "relative",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    minHeight: "100vh",
  },
  content: { maxWidth: 760 },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    // alpha baked into the color (not `opacity`) so the hero tween's
    // clearProps can't permanently strip it
    color: "rgba(245,244,240,0.95)",
    marginBottom: 24,
  },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },
  h1: {
    fontFamily: "var(--font-serif)",
    fontSize: 76,
    fontWeight: 300,
    lineHeight: 1.02,
    letterSpacing: "-2.2px",
    color: "var(--color-on-dark)",
    margin: 0,
    textWrap: "balance",
  },
  sub: {
    fontFamily: "var(--font-sans)",
    fontSize: 19,
    fontWeight: 400,
    lineHeight: 1.55,
    color: "rgba(245,244,240,0.88)",
    margin: "24px 0 0",
    maxWidth: 580,
    textWrap: "pretty",
  },
};

const as: Record<string, CSSProperties> = {
  innerWide: { maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  innerNarrow: { maxWidth: 880, margin: "0 auto", padding: "0 32px" },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    marginBottom: 16,
  },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },
  h2: {
    fontFamily: "var(--font-serif)",
    fontSize: 48,
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "-1.2px",
    color: "var(--color-ink)",
    margin: "0 0 24px",
    textWrap: "balance",
  },
  h2Dark: {
    fontFamily: "var(--font-serif)",
    fontSize: 52,
    fontWeight: 300,
    lineHeight: 1.06,
    letterSpacing: "-1.4px",
    color: "var(--color-on-dark)",
    margin: 0,
    textWrap: "balance",
  },
  bodyP: {
    fontFamily: "var(--font-sans)",
    fontSize: 17,
    color: "var(--color-body)",
    lineHeight: 1.7,
    margin: "0 0 20px",
    textWrap: "pretty",
  },

  // 1. Mission editorial
  editorialSection: { padding: "120px 0", background: "var(--color-canvas)" },
  missionGrid: { display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "center" },
  missionImageWrap: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    aspectRatio: "4/5",
    background: "var(--color-surface-strong)",
  },
  missionImage: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  // 2. Team — dark band
  darkSection: { background: "var(--color-ink)", padding: "120px 0" },
  teamRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 32,
    maxWidth: 980,
    margin: "0 auto",
  },
  teamPair: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 96,
    maxWidth: 760,
    margin: "0 auto",
  },
  teamCardDark: { textAlign: "center" },
  teamPhotoLarge: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "var(--color-surface-strong)",
    margin: "0 auto 20px",
    border: "1px solid rgba(245,244,240,0.08)",
  },
  teamNameDark: {
    fontFamily: "var(--font-sans)",
    fontSize: 19,
    fontWeight: 600,
    color: "var(--color-on-dark)",
    lineHeight: 1.3,
    marginBottom: 6,
  },
  teamRoleDark: {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "rgba(245,244,240,0.65)",
    lineHeight: 1.45,
    textWrap: "balance",
    maxWidth: 240,
    margin: "0 auto",
  },

  familyBlock: { maxWidth: 720, margin: "96px auto 0", textAlign: "center" },
  familyP: {
    fontFamily: "var(--font-serif)",
    fontSize: 19,
    fontWeight: 300,
    fontStyle: "italic",
    lineHeight: 1.55,
    color: "rgba(245,244,240,0.85)",
    margin: "0 0 18px",
    textWrap: "pretty",
  },
  contactBtn: {
    marginTop: 20,
    height: 48,
    padding: "0 28px",
    borderRadius: 6,
    border: 0,
    background: "var(--color-primary)",
    color: "var(--color-on-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.2,
    cursor: "pointer",
    boxShadow: "var(--shadow-cta-rest)",
  },

  // 3. Why our name
  nameGrid: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "center" },
  nameVisual: {
    background: "var(--color-canvas)",
    border: "1px solid var(--color-hairline)",
    borderRadius: 16,
    padding: "72px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 36,
    boxShadow: "var(--shadow-card-rest)",
  },
  nameChipTop: {
    background: "var(--color-horizon-soft)",
    color: "var(--color-horizon)",
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1.6px",
    textTransform: "uppercase",
    padding: "10px 22px",
    borderRadius: "var(--radius-full)",
  },
  nameWordmark: {
    fontFamily: "var(--font-sans)",
    fontSize: 64,
    fontWeight: 700,
    letterSpacing: "-2px",
    lineHeight: 1,
    textWrap: "balance",
  },
  nameWordmarkBlack: { color: "var(--color-ink)" },
  nameWordmarkAmber: { color: "var(--color-primary)" },
  nameFormulaRow: { display: "flex", alignItems: "center", gap: 16 },
  nameChipPart: {
    background: "var(--color-horizon-soft)",
    color: "var(--color-horizon)",
    fontFamily: "var(--font-sans)",
    fontSize: 17,
    fontWeight: 500,
    padding: "14px 28px",
    borderRadius: "var(--radius-full)",
  },
  namePlus: {
    fontFamily: "var(--font-sans)",
    fontSize: 22,
    fontWeight: 400,
    color: "var(--color-muted)",
  },
};
