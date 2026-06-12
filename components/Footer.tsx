"use client";

import { type CSSProperties } from "react";
import WaitlistBar from "@/components/WaitlistBar";
import Reveal from "@/components/Reveal";

const InstagramIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm7 0h3.84v1.57h.05c.54-.95 1.85-1.95 3.81-1.95 4.08 0 4.83 2.5 4.83 5.74V21h-4v-5.36c0-1.28-.02-2.93-1.9-2.93-1.9 0-2.19 1.39-2.19 2.83V21h-4V9.5z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer style={footStyles.shell}>
      <div style={footStyles.ctaBand}>
        <Reveal className="pawe-footer-cta-inner" selector=":scope > *" stagger={0.12}>
          <div style={footStyles.ctaLeft}>
            <div style={footStyles.featureEyebrow}>
              <span style={footStyles.dot}></span>
              Power on demand
            </div>
            <h2 style={footStyles.featureH}>
              Your Wheelchair.
              <br />
              Powered.
            </h2>
            <div style={{ marginTop: 28 }}>
              <WaitlistBar />
            </div>
          </div>
          <div style={footStyles.ctaRight}>
            <div style={footStyles.phoneCard}>
              <div style={footStyles.phoneEyebrow}>Got questions?</div>
              <div style={footStyles.phoneLine}>Phone a founder</div>
              <a href="tel:5083331435" style={footStyles.phoneNumber}>
                508&nbsp;·&nbsp;333&nbsp;·&nbsp;1435
              </a>
              <div style={footStyles.phoneNote}>Call any time!</div>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={footStyles.footerBottom}>
        <div className="pawe-footer-grid">
          <div style={footStyles.brandCol}>
            <div style={footStyles.brand}>PAWE</div>
            <div style={footStyles.brandSub}>
              <span style={{ color: "var(--color-horizon)", fontWeight: 600 }}>Powering</span> Wheelchairs,{" "}
              <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>Empowering</span> Lives
            </div>
          </div>
          <div style={footStyles.contactCol}>
            <div style={footStyles.colHead}>Contact</div>
            <a href="mailto:Info@technotonin.com" style={footStyles.contactLine}>
              Info@technotonin.com
            </a>
            <a href="tel:5083331435" style={footStyles.contactLine}>
              508 · 333 · 1435
            </a>
          </div>
          <div style={footStyles.socialCol}>
            <div style={footStyles.colHead}>Follow along</div>
            <div style={footStyles.socialList}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="pawe-social-link">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={footStyles.legal}>
          <span>© 2026 Technotonin Industries LLC</span>
          <span style={{ flex: 1 }}></span>
          <span style={footStyles.disclaimer}>
            PAWE is pre-clearance. Not currently available for purchase. This site is for informational purposes.
          </span>
        </div>
      </div>
    </footer>
  );
}

const footStyles: Record<string, CSSProperties> = {
  shell: { background: "var(--color-canvas)", marginTop: 0 },
  footerBottom: { background: "var(--color-surface-soft)", borderTop: "1px solid var(--color-hairline)" },
  ctaBand: {
    background: "var(--color-canvas)",
    borderTop: "1px solid var(--color-hairline-soft)",
    borderBottom: "1px solid var(--color-hairline-soft)",
  },
  ctaLeft: { display: "flex", flexDirection: "column" },
  ctaRight: { display: "flex", justifyContent: "flex-end" },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },
  phoneCard: {
    background: "var(--color-surface-card)",
    border: "1px solid var(--color-hairline)",
    borderRadius: "var(--radius-lg)",
    padding: "32px 36px",
    boxShadow: "var(--shadow-card-rest)",
    width: "100%",
    maxWidth: 380,
  },
  phoneEyebrow: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    marginBottom: 10,
  },
  phoneLine: {
    fontFamily: "var(--font-serif)",
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1.15,
    letterSpacing: "-0.4px",
    color: "var(--color-ink)",
    marginBottom: 14,
  },
  phoneNumber: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: "0.5px",
    color: "var(--color-primary)",
    textDecoration: "none",
    marginBottom: 12,
  },
  phoneNote: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-muted)", lineHeight: 1.5 },
  featureEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    marginBottom: 20,
  },
  featureH: {
    fontFamily: "var(--font-serif)",
    fontSize: 48,
    fontWeight: 300,
    lineHeight: 1.06,
    letterSpacing: "-1.4px",
    color: "var(--color-ink)",
    margin: 0,
    textWrap: "balance",
    maxWidth: 560,
  },
  brandCol: { display: "flex", flexDirection: "column", gap: 10 },
  contactCol: { display: "flex", flexDirection: "column", gap: 10 },
  contactLine: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-ink)", textDecoration: "none" },
  brand: {
    fontFamily: "var(--font-serif)",
    fontSize: 36,
    fontWeight: 400,
    letterSpacing: "-0.4px",
    color: "var(--color-ink)",
    lineHeight: 1,
  },
  brandSub: { fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-body)", maxWidth: 260, lineHeight: 1.55 },
  colHead: {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--color-ink)",
    marginBottom: 6,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
  },
  socialCol: { display: "flex", flexDirection: "column", gap: 12 },
  socialList: { display: "flex", gap: 12 },
  legal: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "20px 32px 40px",
    borderTop: "1px solid var(--color-hairline-soft)",
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    color: "var(--color-muted)",
    flexWrap: "wrap",
  },
  disclaimer: { maxWidth: 520, textAlign: "right", color: "var(--color-muted)", fontSize: 12 },
};
