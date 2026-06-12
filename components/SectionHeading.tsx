import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  maxWidth?: number;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  maxWidth = 720,
  dark = false,
}: SectionHeadingProps) {
  const ink = dark ? "var(--color-on-dark)" : "var(--color-ink)";
  const body = dark ? "rgba(245,244,240,0.78)" : "var(--color-body)";
  const muted = dark ? "rgba(245,244,240,0.55)" : "var(--color-muted)";

  return (
    <div style={{ maxWidth, marginInline: align === "center" ? "auto" : 0, textAlign: align }}>
      {eyebrow && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            color: muted,
            marginBottom: 16,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" }}></span>
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(32px, 8.5vw, 44px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: ink,
          margin: 0,
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      {lede && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            color: body,
            lineHeight: 1.55,
            margin: "20px 0 0",
            textWrap: "pretty",
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
