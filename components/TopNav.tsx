"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/providers", label: "For providers" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors" },
];

// Pages with a dark, full-bleed hero behind the nav.
const DARK_HERO_ROUTES = new Set(["/", "/about"]);

export default function TopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjustment during render),
  // and lock body scroll while open.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!menuOpen || prefersReducedMotion()) return;
      const gsap = ensureGsap();
      gsap.from(".pawe-mobile-link", {
        opacity: 0,
        y: 18,
        duration: 0.4,
        ease: "pawe",
        stagger: 0.05,
      });
    },
    { scope: menuRef, dependencies: [menuOpen] }
  );

  // Translucent mode is active only on dark-hero pages at the top of the scroll.
  const overDarkHero = DARK_HERO_ROUTES.has(pathname) && !scrolled;

  const barStyle = overDarkHero ? navStyles.barTransparent : navStyles.bar;
  const brandColor = overDarkHero ? "var(--color-on-dark)" : "var(--color-ink)";
  const linkRest = overDarkHero ? "rgba(245,244,240,0.7)" : "var(--color-muted)";
  const linkActive = overDarkHero ? "var(--color-on-dark)" : "var(--color-ink)";
  const ghostColor = overDarkHero ? "var(--color-on-dark)" : "var(--color-ink)";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <header style={barStyle}>
        <div style={navStyles.inner}>
          <Link href="/" style={{ ...navStyles.brand, color: brandColor }}>
            <span style={{ ...navStyles.brandWord, color: brandColor }}>PAWE</span>
          </Link>

          <nav className="pawe-nav-links">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  ...navStyles.link,
                  color: pathname === l.href ? linkActive : linkRest,
                  fontWeight: pathname === l.href ? 600 : 500,
                }}
              >
                {l.label}
                {pathname === l.href && <span style={navStyles.activeBar}></span>}
              </Link>
            ))}
          </nav>

          <div style={navStyles.right}>
            <Link href="/providers" className="pawe-nav-ghost" style={{ color: ghostColor }}>
              Clinicians
            </Link>
            <Link href="/waitlist" className="pawe-nav-cta">
              Join the waitlist
            </Link>
            <button
              type="button"
              className="pawe-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{ color: menuOpen ? "var(--color-ink)" : ghostColor }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6 6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="pawe-mobile-menu" ref={menuRef}>
          <div style={navStyles.mobileTop}>
            <Link href="/" style={{ ...navStyles.brandWord, color: "var(--color-ink)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
              PAWE
            </Link>
            <button
              type="button"
              className="pawe-burger"
              style={{ display: "inline-flex", color: "var(--color-ink)" }}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav style={navStyles.mobileNav}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="pawe-mobile-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/waitlist" className="pawe-mobile-link" style={{ color: "var(--color-primary)" }} onClick={() => setMenuOpen(false)}>
              Join the waitlist
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

const navStyles: Record<string, CSSProperties> = {
  bar: {
    background: "var(--color-canvas)",
    borderBottom: "1px solid var(--color-hairline)",
    transition:
      "background var(--duration-med) var(--ease-out), border-color var(--duration-med) var(--ease-out)",
  },
  barTransparent: {
    background: "transparent",
    borderBottom: "1px solid rgba(245,244,240,0)",
    transition:
      "background var(--duration-med) var(--ease-out), border-color var(--duration-med) var(--ease-out)",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    height: 72,
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textDecoration: "none",
  },
  brandWord: {
    fontFamily: "var(--font-serif)",
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.2px",
    transition: "color var(--duration-med) var(--ease-out)",
  },
  link: {
    position: "relative",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    lineHeight: 1.25,
    padding: "26px 0",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "color var(--duration-med) var(--ease-out)",
  },
  activeBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
    background: "var(--color-primary)",
  },
  right: { display: "flex", alignItems: "center", gap: 14 },
  mobileTop: {
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    marginTop: 24,
  },
};
