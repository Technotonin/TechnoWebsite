"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

let registered = false;

/**
 * Registers GSAP plugins and the brand ease once on the client.
 * Design-system motion rules: mechanical-precise easing, no spring bounces,
 * no scale-up reveals, no parallax.
 */
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
    // cubic-bezier(0.16, 0.84, 0.44, 1) — the system's --ease-out token
    CustomEase.create("pawe", "0.16, 0.84, 0.44, 1");
    registered = true;
    // Console access for debugging (harmless in prod)
    (window as unknown as Record<string, unknown>).gsap = gsap;
    (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;

    // rAF watchdog: a VISIBLE tab can still have requestAnimationFrame
    // throttled or suspended (battery/energy-saver modes, low-power
    // renderers). GSAP's ticker is rAF-driven, so a stalled rAF freezes
    // tweens at their start state — for reveal animations that means
    // content stuck at opacity 0. Pump the ticker (and ScrollTrigger's
    // scroll sync) whenever rAF goes quiet, driven by a timer plus real
    // user events, so anyone interacting with the page sees animations
    // resolve. (Fully hidden tabs stay mostly frozen — gsap's lagSmoothing
    // caps catch-up — which is fine; they resume when shown.)
    // The install handle lives on window so dev HMR re-evaluation of this
    // module can't stack duplicate intervals/listeners.
    const w = window as unknown as Record<string, unknown>;
    if (!w.__paweMotionWatchdog) {
      let lastTick = performance.now();
      gsap.ticker.add(() => {
        lastTick = performance.now();
      });
      const pump = () => {
        if (performance.now() - lastTick > 250) {
          ScrollTrigger.update();
          gsap.ticker.tick();
        }
      };
      const intervalId = window.setInterval(pump, 300);
      window.addEventListener("scroll", pump, { passive: true });
      window.addEventListener("pointerdown", pump, { passive: true });
      window.addEventListener("pointermove", pump, { passive: true });
      document.addEventListener("visibilitychange", pump);
      w.__paweMotionWatchdog = { intervalId, pump };
    }
  }
  return gsap;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const PAWE_EASE = "pawe";
export { gsap, ScrollTrigger, useGSAP };
