# PAWE site — implementation conventions

This Next.js 16 (App Router, Turbopack) site implements the Claude Design handoff bundle at
`C:\Users\aravt_4u59l5d\Desktop\ClaudeLimitWidget\pawe-website\project\`.
The prototypes there (screen-*.jsx) are the visual ground truth: **recreate them pixel-faithfully**,
but write idiomatic Next.js — don't copy prototype internals where they don't fit.

## Stack & files

- Design tokens: `app/globals.css` (already done — same `--*` names as the prototype's colors_and_type.css).
  Fonts are loaded via next/font in `app/layout.tsx`; `var(--font-sans|serif|mono)` work everywhere.
- Shared chrome (already done, rendered by `app/layout.tsx` — do NOT render these in pages):
  - `components/TopNav.tsx` — fixed nav, translucent over dark heroes ("/" and "/about"), solid cream elsewhere.
  - `components/Footer.tsx` — CTA band ("Your Wheelchair. Powered." + WaitlistBar + phone card) + bottom grid + legal.
- Shared components for pages:
  - `components/SectionHeading.tsx` — `{ eyebrow?, title, lede?, align?, maxWidth?, dark? }`
  - `components/FAQ.tsx` — `{ items: { q: string; a: ReactNode }[] }` (accordion, first item open)
  - `components/WaitlistBar.tsx` — pill email bar `{ tone?, placeholder?, label?, sub? }`
  - `components/Reveal.tsx` — GSAP scroll reveal wrapper:
    `{ selector?, stagger?, y?, duration?, delay?, start?, className?, style? }`.
    Without `selector` it fades/rises the wrapper; with `selector` (e.g. `":scope > *"`) it staggers matching descendants.
  - `components/CountUp.tsx` — `{ value, decimals?, duration? }` counts a number up on scroll into view.
  - `lib/motion.ts` — `ensureGsap()`, `useGSAP`, `prefersReducedMotion()`, brand ease registered as `"pawe"`.

## Page pattern

Each route = a thin **server** `page.tsx` exporting `metadata` and rendering a **client** screen component:

```tsx
// app/providers/page.tsx
import type { Metadata } from "next";
import ProvidersScreen from "./ProvidersScreen";
export const metadata: Metadata = { title: "For providers", description: "…" };
export default function Page() { return <ProvidersScreen />; }
```

```tsx
// app/providers/ProvidersScreen.tsx
"use client";
…full screen implementation…
```

- Navigation between pages: `next/link` `<Link href="/waitlist">` (the prototype's `onNav("waitlist")` becomes links or `useRouter().push`). Routes: `/`, `/providers`, `/about`, `/investors`, `/waitlist`.
- **Top offset:** the nav is fixed and 72px tall. Pages with a dark full-bleed hero (`/` home, `/about`) get NO top padding — the hero bleeds behind the translucent nav. All other pages MUST start with `<main style={{ paddingTop: 72 }}>`.
- Port the prototype's style objects directly as `const xx: Record<string, CSSProperties> = {…}` (import `type { CSSProperties } from "react"`). Keep values exact.
- Images: plain `<img>` or CSS `background-image`, exactly as the prototype. Asset paths change from `assets/…` to `/assets/…` (they're in `public/assets/`).
- Escape apostrophes/quotes in JSX text (`&rsquo;` or `'` inside expressions) to satisfy react/no-unescaped-entities.

## Responsiveness (the prototype is desktop-only — you add this)

Use a small `<style>{`…`}</style>` block or a page-level `.module.css` with media queries for grid collapses. Conventions:
- Breakpoints: 1024px (tighten), 900px (2-col grids → 1-col), 640px (type ramps down).
- Multi-column grids collapse to 1 column on ≤900px. Stat strips go 3-up → 1-up directly (NEVER 2-up — design rule).
- Big display type already uses clamp() in the prototype — keep it.
- Forms: 2-col field grids → 1 col at ≤640px.
- Sticky form/video cards: drop `position: sticky` at ≤900px.
Simplest robust approach: give responsive-critical containers a className (e.g. `hero-grid`) and override the inline grid with `!important` inside the media query, or move that one property into the CSS class entirely (preferred).

## Motion (GSAP — where it looks good, never gimmicky)

The design system's motion rules are binding: mechanical-precise easing (`"pawe"` ease), durations ~0.4–0.8s,
**no spring bounces, no scale-up reveals, no parallax**. Respect `prefersReducedMotion()` (Reveal/CountUp already do).

- Default move: wrap sections in `<Reveal>` (fade + 28px rise, once). Use `selector` + `stagger` for card grids, team grids, list rows.
- Numbers (spec stats) use `<CountUp>`.
- Custom timelines: `useGSAP(() => { const gsap = ensureGsap(); … }, { scope: ref })` from `@/lib/motion` — used for hero entrances (staggered line-by-line rise), and the home marquee already runs on CSS (`pawe-marquee` keyframes in globals).
- Anything animated must remain visible/correct without JS (SSR HTML shows final state; `gsap.from` handles that).

## Copy rules (binding)

- Sentence case everywhere; the product is **PAWE**, the company is **Technotonin**.
- Copy text comes from the prototype VERBATIM except these deliberate fixes:
  - "hte" → "the", "truely" → "truly" (typos).
  - Third home testimonial reads: "Using and helping this device come to be is the best thing I've done in the past 8 years." — "— Beta user".
- The FDA disclaimer on the home FAQ keeps its exact uppercase text and red bordered treatment.
- No emoji, no "transformative/life-changing/miraculous" vocabulary.

## Color discipline

- Amber `var(--color-primary)` = consumer accent; max two amber moments per fold.
- Horizon blue = ONLY on the providers page (chips, form CTA) + the two existing exceptions
  (home "Motorized" headline word, about "Why our name" chips, footer "Powering" word).
- Canvas is cream; pure white only on cards. Ink `#1A1612`, never `#000`.
