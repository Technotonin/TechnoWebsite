"use client";

import { useState, type ReactNode } from "react";

type FAQItem = { q: string; a: ReactNode };

/**
 * Accordion with the system's mechanical 240ms ease. The open panel
 * animates via the CSS grid-rows trick so height transitions stay smooth.
 */
export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                background: "none",
                border: 0,
                cursor: "pointer",
                padding: "24px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--font-sans)",
                fontSize: 18,
                fontWeight: 500,
                color: "var(--color-ink)",
                textAlign: "left",
                lineHeight: 1.4,
              }}
            >
              <span>{it.q}</span>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1px solid var(--color-hairline)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  marginLeft: 24,
                  background: isOpen ? "var(--color-ink)" : "transparent",
                  color: isOpen ? "var(--color-on-dark)" : "var(--color-ink)",
                  transition: "all var(--duration-fast) var(--ease-out)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  {isOpen ? (
                    <path d="M5 12h14" />
                  ) : (
                    <>
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </>
                  )}
                </svg>
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows var(--duration-med) var(--ease-out)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 0 28px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    color: "var(--color-body)",
                    lineHeight: 1.6,
                    maxWidth: 720,
                  }}
                >
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
