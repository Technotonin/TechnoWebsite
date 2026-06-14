"use client";

import { useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { submitLead } from "@/lib/leads/client";
import Honeypot from "@/components/Honeypot";

type WaitlistBarProps = {
  tone?: "amber" | "horizon";
  placeholder?: string;
  label?: string;
  sub?: string;
};

export default function WaitlistBar({ tone = "amber", placeholder, label, sub }: WaitlistBarProps) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || pending) return;
    setPending(true);
    setError(null);
    const res = await submitLead({
      type: "subscribe",
      email,
      source: pathname,
      company_website: hp,
    });
    setPending(false);
    if (res.ok) setSubmitted(true);
    else setError(res.error ?? "Something went wrong.");
  };

  const accent = tone === "horizon" ? "var(--color-horizon)" : "var(--color-primary)";
  const glow = tone === "horizon" ? "none" : "var(--shadow-cta-rest)";
  const lbl = label || (tone === "horizon" ? "Request an evaluation kit" : "Get notified with our progress");
  const subL = sub || (tone === "horizon" ? "For licensed clinicians" : "One short note per quarter");
  const ph = placeholder || (tone === "horizon" ? "you@clinic.org" : "you@email.com");

  if (submitted) {
    return (
      <div className="pawe-wl-bar" style={{ ...waitStyles.bar, padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-success)", display: "grid", placeItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>You&rsquo;re on the list.</div>
            <div style={{ fontSize: 13, color: "var(--color-muted)" }}>We&rsquo;ll write when we ship.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="pawe-wl-bar" style={waitStyles.bar} onSubmit={onSubmit}>
      <div className="pawe-wl-left" style={waitStyles.left}>
        <div style={waitStyles.label}>{lbl}</div>
        <div style={waitStyles.sub}>{error ?? subL}</div>
      </div>
      <Honeypot value={hp} onChange={setHp} />
      <input
        className="pawe-wl-input"
        type="email"
        aria-label="Email address"
        placeholder={ph}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={waitStyles.input}
        disabled={pending}
      />
      <button
        type="submit"
        aria-label="Submit"
        className="pawe-wl-orb"
        style={{ ...waitStyles.orb, background: accent, boxShadow: glow, opacity: pending ? 0.7 : 1 }}
        disabled={pending}
      >
        {pending ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ animation: "pawe-spin 0.7s linear infinite" }}>
            <path d="M21 12a9 9 0 1 1-6.2-8.6" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>
    </form>
  );
}

const waitStyles: Record<string, CSSProperties> = {
  bar: {
    display: "flex",
    alignItems: "center",
    background: "var(--color-surface-card)",
    border: "1px solid var(--color-hairline)",
    borderRadius: 9999,
    padding: "8px 8px 8px 24px",
    height: 72,
    boxShadow: "var(--shadow-card-rest)",
    width: "100%",
    maxWidth: 540,
  },
  left: { flex: 1.2 },
  label: { fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-ink)" },
  sub: { fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-muted)", marginTop: 2 },
  input: {
    flex: 1.2,
    height: 36,
    border: 0,
    outline: 0,
    padding: "0 18px",
    background: "transparent",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    color: "var(--color-ink)",
    borderLeft: "1px solid var(--color-hairline)",
    minWidth: 0,
  },
  orb: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: 0,
    cursor: "pointer",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
};
