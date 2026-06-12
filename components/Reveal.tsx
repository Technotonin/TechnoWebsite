"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** When set, animates matching descendants with a stagger instead of the wrapper */
  selector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
};

/**
 * Scroll-triggered section reveal: fade + rise on the brand ease.
 * Fires once; content stays fully visible without JavaScript (SSR HTML).
 */
export default function Reveal({
  children,
  className,
  style,
  selector,
  stagger = 0.08,
  y = 28,
  duration = 0.7,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const targets = selector ? Array.from(el.querySelectorAll(selector)) : el;
      if (selector && (targets as Element[]).length === 0) return;
      // opacity + transform only — never visibility, so content stays
      // clickable even if an animation stalls (fail-open).
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "pawe",
        stagger: selector ? stagger : 0,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
