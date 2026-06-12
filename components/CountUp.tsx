"use client";

import { useRef, type CSSProperties } from "react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

type CountUpProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Counts a stat up from 0 when scrolled into view.
 * Server-rendered HTML shows the final value, so the number is
 * always correct without JavaScript.
 */
export default function CountUp({
  value,
  decimals = 0,
  duration = 1.4,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const counter = { v: 0 };
      el.textContent = (0).toFixed(decimals);
      gsap.to(counter, {
        v: value,
        duration,
        ease: "pawe",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals);
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} style={style}>
      {value.toFixed(decimals)}
    </span>
  );
}
