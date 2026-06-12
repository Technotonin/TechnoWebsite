"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHeading from "@/components/SectionHeading";
import FAQ from "@/components/FAQ";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

const attachSteps = [
  { n: "1", h: "Align", b: "Drop PAWE onto your chair's quick-attach poles." },
  { n: "2", h: "Snap", b: "Controller locks in place. No tools. No help needed." },
  { n: "3", h: "Go", b: "Joystick or push-assist. Ready in 10 seconds." },
];

const specStats = [
  { v: 15, u: "lbs", h: "Featherweight", b: "Lifts off in one hand in seconds" },
  { v: 6, u: "mph", h: "Capped top speed", b: "Change your speed cap on the controller" },
  { v: 10, u: "mi", h: "Range per charge", b: "Swappable battery for longer journeys." },
];

const challengeCards = [
  { tag: "Swappable Battery", h: "Pop in a new battery when you run out on longer trips", b: "~Ten miles per battery." },
  { tag: "Hills", h: "Up the hill without help", b: "Clears most ADA grades." },
  { tag: "Modular Controller", h: "Use a Control system that works for you", b: "" },
];

const testimonials = [
  {
    name: "Beta user family member",
    quote: "My sister can get around on her own now; Outdoors, at our temple, everywhere.",
  },
  {
    name: "Beta user family member",
    quote: "We'd finally be able to bring my father out of the senior living home without a Wheelchair Accessible Vehicle. I can pack this in my sedan!",
  },
  {
    name: "Beta user",
    quote: "Using and helping this device come to be is the best thing I've done in the past 8 years.",
  },
];

const featuredLogos = [
  { src: "/assets/logos/boston25-news-logo.png", alt: "Boston 25 News" },
  { src: "/assets/logos/gbh-news.png", alt: "GBH News" },
  { src: "/assets/logos/boston-news.png", alt: "Boston News" },
  { src: "/assets/logos/bellingham-bulletin.png", alt: "Bellingham Bulletin" },
  { src: "/assets/logos/wpi-logo.png", alt: "WPI" },
  { src: "/assets/logos/bu-logo.png", alt: "Boston University" },
  { src: "/assets/logos/efest-logo.png", alt: "e-Fest Undergraduate Entrepreneurship Competition" },
];

const faqItems = [
  {
    q: "What wheelchairs does PAWE fit?",
    a: "Most folding-frame manual wheelchairs with a 16–22 inch seat width, including Invacare, Drive, Karman, and Medline. We are also working on having it attach to rigid frames as well, to make it truly universal. If you want to help guide our design, and make the PAWE better for everyone, contact us!",
  },
  {
    q: "What does a swappable battery mean?",
    a: "PAWE uses a removable battery pack that pops out and clicks back in by hand — no tools, no cables. You can carry a second pack in a backpack and swap it in the middle of a longer trip, charge one indoors while a fresh one's on the chair, or replace a tired cell down the road without sending the whole unit back to us.",
  },
  {
    q: "Where is the current development of the PAWE?",
    a: "We have working prototypes that we are using for gathering user feedback and getting prepared for being FDA Cleared. Currently, we are fundraising to support our journey through getting FDA Cleared. If you are or know someone who is interested in joining our mission, contact us!",
  },
];

const DEMO_VIDEO = "/assets/photos/FullHypeVideoDemo.mp4";
// Demo video timestamps: 0–7s shows step 1 (Align), 7–14s step 2 (Snap),
// 14–21s step 3 (Go). Past 21s the last step stays highlighted.
const STEP_SECONDS = 7;

export default function HomeScreen() {
  // The hero photo is the LCP element — start fetching it immediately.
  preload("/assets/photos/hero-wheelchair-sunset.jpg", { as: "image" });

  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  // Intro card: click-to-play the full hype demo with sound + controls.
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const [introStarted, setIntroStarted] = useState(false);

  // Sound-on video shouldn't keep talking once scrolled away; pause it
  // off-screen and leave resuming to the user (it was user-initiated).
  useEffect(() => {
    const v = introVideoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Attach card: the same video runs inline (muted) and drives which step
  // is highlighted; clicking a step seeks the video to that step's segment.
  const attachVideoRef = useRef<HTMLVideoElement | null>(null);
  const [attachPlaying, setAttachPlaying] = useState(false);
  // An explicit pause from the toggle must stick — the viewport observer
  // may not override it (WCAG 2.2.2).
  const userPausedRef = useRef(false);
  // Step clicked before video metadata loaded; applied in onLoadedMetadata.
  const pendingSeekRef = useRef<number | null>(null);

  // Auto-play the attach demo only while it's actually on screen, tracking
  // the OS reduced-motion setting live.
  useEffect(() => {
    const v = attachVideoRef.current;
    if (!v) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io: IntersectionObserver | null = null;
    const apply = () => {
      io?.disconnect();
      io = null;
      if (mql.matches) {
        v.pause();
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !userPausedRef.current) v.play().catch(() => {});
          else if (!entry.isIntersecting) v.pause();
        },
        { threshold: 0.35 }
      );
      io.observe(v);
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      io?.disconnect();
    };
  }, []);

  const seekTo = (v: HTMLVideoElement, i: number) => {
    // The browser clamps currentTime to the real duration natively.
    v.currentTime = i * STEP_SECONDS + 0.05;
  };

  const goToStep = (i: number) => {
    setActiveStep(i);
    userPausedRef.current = false;
    const v = attachVideoRef.current;
    if (!v) return;
    try {
      seekTo(v, i);
      pendingSeekRef.current = null;
    } catch {
      // metadata not loaded yet — seek once it is
      pendingSeekRef.current = i;
    }
    v.play().catch(() => {});
  };

  // Load entrance (NOT scroll-triggered): wordmark → acronym → tagline → CTA.
  useGSAP(
    () => {
      const gsap = ensureGsap();
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "pawe", duration: 0.8 } })
        .from("[data-hero-seq]", {
          opacity: 0,
          y: 34,
          stagger: 0.1,
          clearProps: "transform,opacity",
        });
    },
    { scope: heroRef }
  );

  return (
    <main>
      {/* ============================= 1. HERO ============================= */}
      <section ref={heroRef} className="home-hero" style={hsl.heroShell}>
        <div
          style={{
            ...hsl.heroImage,
            backgroundImage: "url('/assets/photos/hero-wheelchair-sunset.jpg')",
          }}
        ></div>
        <div style={hsl.heroScrim}></div>
        <div style={hsl.heroContent}>
          {/* Both lines live in the h1 so the page's top heading reads
              "PAWE Portable Affordable Wheelchair Enhancer" to crawlers */}
          <h1 style={{ margin: 0, display: "contents" }}>
            <span style={{ ...hsl.heroWordmark, display: "block" }} data-hero-seq>
              PAWE
            </span>
            <span className="home-hero-acronym" style={{ ...hsl.heroExpand, display: "block" }} data-hero-seq>
              Portable Affordable Wheelchair Enhancer
            </span>
          </h1>
          <div style={hsl.heroTagline} data-hero-seq>
            Powering wheelchairs. Empowering lives.
          </div>
          <div className="home-hero-ctas" style={hsl.heroCtas} data-hero-seq>
            <Link
              href="/waitlist"
              className="home-hero-cta"
              style={{
                ...hsl.heroCtaWhite,
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== 2. BIG TYPE INTRO + VIDEO ===================== */}
      <section className="home-intro-section" style={hsl.introSection}>
        <div style={hsl.innerWide}>
          <div className="home-intro-grid" style={hsl.introGrid}>
            <Reveal selector=".bh-line" stagger={0.1} style={hsl.bigHeadlineWrap}>
              <h2 style={hsl.bigHeadline}>
                <span className="bh-line" style={hsl.bhMuted}>
                  Make your
                </span>
                <span className="bh-line" style={hsl.bhAmber}>
                  Manual Wheelchair
                </span>
                <span className="bh-line" style={hsl.bhElectricRow}>
                  <span
                    style={{
                      ...hsl.bhElectric,
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(56px, 6.5vw, 96px)",
                      color: "var(--color-horizon)",
                    }}
                  >
                    Motorized
                  </span>
                </span>
                <span className="bh-line" style={hsl.bhSeconds}>
                  <em style={hsl.bhSecondsIn}>in</em>
                  <span style={hsl.bhSecondsNum}>10 Seconds.</span>
                </span>
              </h2>
              <p className="bh-line" style={hsl.bigSubcopy}>
                PAWE is a 15 lbs device that attaches onto the manual wheelchair
                you already own, gives it power the moment you need it, and lifts
                off when you want to fold the chair into a car.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={hsl.videoCard}>
                <video
                  ref={introVideoRef}
                  src={DEMO_VIDEO}
                  poster="/assets/photos/antonio-on-pawe-poster.jpg"
                  preload="metadata"
                  playsInline
                  controls={introStarted}
                  style={{
                    ...hsl.videoTag,
                    // cover the portrait card while idle; letterbox once
                    // playing so the full frame is visible
                    objectFit: introStarted ? "contain" : "cover",
                  }}
                  aria-label="PAWE demo video"
                />
                {!introStarted && (
                  <button
                    type="button"
                    aria-label="Play demo"
                    className="home-video-play"
                    style={hsl.videoPlay}
                    onClick={() => {
                      setIntroStarted(true);
                      introVideoRef.current?.play().catch(() => {});
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
              </div>
            </Reveal>
          </div>

          {/* ========================= 3. SPEC STRIP ========================= */}
          <Reveal>
            <div className="home-spec-strip" style={hsl.specStrip}>
              {specStats.map((s, i, a) => (
                <div
                  key={i}
                  className="home-spec-cell"
                  style={{ ...hsl.specCard, ...(i === a.length - 1 ? { borderRight: 0 } : null) }}
                >
                  <div style={hsl.specNumRow}>
                    <CountUp value={s.v} style={hsl.specNum} />
                    <span style={hsl.specUnit}>{s.u}</span>
                  </div>
                  <div style={hsl.specHead}>{s.h}</div>
                  <div style={hsl.specBody}>{s.b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================== 4. THREE-STEP ATTACH + VIDEO ================== */}
      <section className="home-attach-section" style={hsl.attachSection}>
        <div style={hsl.innerWide}>
          <Reveal style={hsl.attachHeading}>
            <div style={hsl.eyebrow}>
              <span style={hsl.eyebrowDot}></span>How it attaches
            </div>
            <h2 style={{ ...hsl.attachH2, fontWeight: 400 }}>
              <span style={{ color: "var(--color-ink)" }}>3 Steps.</span>{" "}
              <span style={{ color: "var(--color-primary)", fontStyle: "italic" }}>10 Seconds.</span>
            </h2>
          </Reveal>
          <div className="home-attach-grid" style={hsl.attachGrid}>
            <Reveal selector=":scope li" stagger={0.08}>
              <ol style={hsl.attachList}>
                {attachSteps.map((s, i) => {
                  const isActive = activeStep === i;
                  return (
                    <li key={s.n}>
                      <button
                        type="button"
                        aria-current={isActive || undefined}
                        style={{
                          ...hsl.attachItem,
                          ...(isActive ? hsl.attachItemActive : null),
                        }}
                        onClick={() => goToStep(i)}
                      >
                        <div style={hsl.attachNum}>{s.n}</div>
                        <div style={hsl.attachH}>{s.h}</div>
                        <div style={hsl.attachB}>{s.b}</div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
            <div className="home-attach-video" style={hsl.attachVideoCard}>
              <video
                ref={attachVideoRef}
                src={DEMO_VIDEO}
                muted
                loop
                playsInline
                preload="metadata"
                style={hsl.videoTag}
                aria-label="PAWE attach demo — three steps in ten seconds"
                onPlay={() => setAttachPlaying(true)}
                onPause={() => setAttachPlaying(false)}
                onLoadedMetadata={(e) => {
                  if (pendingSeekRef.current !== null) {
                    seekTo(e.currentTarget, pendingSeekRef.current);
                    pendingSeekRef.current = null;
                  }
                }}
                onTimeUpdate={(e) => {
                  const step = Math.min(
                    attachSteps.length - 1,
                    Math.floor(e.currentTarget.currentTime / STEP_SECONDS)
                  );
                  setActiveStep(step);
                }}
              />
              <button
                type="button"
                aria-label={attachPlaying ? "Pause attach demo" : "Play attach demo"}
                style={hsl.attachVideoToggle}
                onClick={() => {
                  const v = attachVideoRef.current;
                  if (!v) return;
                  if (v.paused) {
                    userPausedRef.current = false;
                    v.play().catch(() => {});
                  } else {
                    userPausedRef.current = true;
                    v.pause();
                  }
                }}
              >
                {attachPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div style={hsl.attachVideoLabel}>
                {`Step ${activeStep + 1} · ${attachSteps[activeStep].h}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= 5. DIVIDER ========================= */}
      <div style={hsl.innerWide}>
        <hr style={{ border: 0, borderTop: "1px solid var(--color-hairline)", margin: 0 }} />
      </div>
      <div style={{ height: 32 }}></div>

      {/* ====================== 6. CHALLENGE CARDS ====================== */}
      <section className="home-challenge-section" style={hsl.challengeSection}>
        <div style={hsl.innerWide}>
          <Reveal style={{ maxWidth: 600, marginBottom: 48 }}>
            <h2
              className="home-challenge-h2"
              style={{ ...hsl.h2Editorial, textAlign: "left", marginBottom: 12 }}
            >
              Move on your schedule.
              <br />
              Regain your{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-primary)" }}>
                freedom
              </em>{" "}
              and{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-primary)" }}>
                independence
              </em>
              .
            </h2>
          </Reveal>
          <Reveal selector=":scope > article" stagger={0.08} className="home-challenge-grid" style={hsl.challengeGrid}>
            {challengeCards.map((c, i) => (
              <article key={i} style={hsl.challengeCard}>
                <div style={hsl.challengeBody}>
                  <div style={hsl.challengeTag}>{c.tag}</div>
                  <h3 style={hsl.challengeH}>{c.h}</h3>
                  {c.b ? <p style={hsl.challengeP}>{c.b}</p> : null}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================== 7. DARK BAND — BUILT WITH USERS ================== */}
      <section className="home-dark-band" style={hsl.darkBand2}>
        <div style={hsl.innerWide}>
          <Reveal style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", marginBottom: 64 }}>
            <h2 className="home-dark-h2" style={{ ...hsl.h2EditorialDark, fontSize: 52 }}>
              Built with Wheelchair users.
            </h2>
            <p style={hsl.ledeDark}>
              We&rsquo;ve done above 100 interviews with wheelchair users in designing and building the PAWE
            </p>
            <Link
              href="/waitlist"
              style={{
                ...hsl.darkCta,
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              Join the waitlist &rarr;
            </Link>
          </Reveal>
          <Reveal selector=":scope > article" stagger={0.08} className="home-real-grid" style={hsl.realGrid}>
            {testimonials.map((t, i) => (
              <article key={i} style={hsl.realCard}>
                <div style={hsl.realQuoteMark}>&ldquo;</div>
                <p style={hsl.realQuote}>{t.quote}</p>
                <div style={hsl.realAttr}>
                  <div style={hsl.realName}>&mdash; {t.name}</div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================== 8. AS FEATURED IN (marquee) ================== */}
      <section className="home-featured-section" style={hsl.featuredSection}>
        <div style={hsl.innerWide}>
          <Reveal>
            <div style={hsl.featuredEyebrow}>As featured in</div>
          </Reveal>
        </div>
        <div style={hsl.marqueeViewport}>
          <div className="home-marquee-track" style={hsl.marqueeTrack}>
            {[...Array(2)].map((_, dup) => (
              <div key={dup} style={hsl.marqueeGroup} aria-hidden={dup === 1 ? "true" : undefined}>
                {featuredLogos.map((l) => (
                  <img
                    key={l.src}
                    src={l.src}
                    alt={dup === 1 ? "" : l.alt}
                    loading="lazy"
                    decoding="async"
                    style={hsl.featuredLogo}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= 9. FAQ ============================= */}
      <section className="home-faq-section" style={hsl.faqSection}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <SectionHeading
              title="FAQ"
              lede={
                <>
                  If yours isn&rsquo;t here, write us, and we&rsquo;ll get back to you ASAP!
                  <span
                    className="home-fda-note"
                    style={{
                      display: "block",
                      marginTop: 24,
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTop: "2px solid var(--color-error)",
                      borderBottom: "2px solid var(--color-error)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      color: "var(--color-error)",
                      lineHeight: 1.35,
                      textWrap: "balance",
                    }}
                  >
                    DISCLAIMER: THIS PRODUCT IS NOT FOR SALE, AND IT IS NOT CLEARED BY THE FDA
                  </span>
                </>
              }
              align="center"
              maxWidth={680}
            />
          </Reveal>

          <div style={{ marginTop: 56 }}>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* Responsive overrides (prototype is desktop-only) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .home-marquee-track { animation: none !important; }
        }
        @media (max-width: 1024px) {
          .home-intro-grid { gap: 40px !important; }
        }
        @media (max-width: 900px) {
          /* Mobile browser chrome makes 100vh jumpy; svh tracks the visible viewport. */
          .home-hero { min-height: 100vh !important; min-height: 100svh !important; }
          .home-intro-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .home-spec-strip { grid-template-columns: minmax(0, 1fr) !important; }
          .home-spec-cell { border-right: 0 !important; border-bottom: 1px solid var(--color-hairline-soft); }
          .home-spec-cell:last-child { border-bottom: 0; }
          .home-attach-grid { grid-template-columns: minmax(0, 1fr) !important; }
          /* Demo video leads on mobile; the steps scroll beneath it. */
          .home-attach-video { position: static !important; order: -1; }
          .home-challenge-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .home-real-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
        @media (max-width: 640px) {
          /* Section rhythm: 56-72px vertical on phones. */
          .home-intro-section { padding: 64px 0 56px !important; }
          .home-attach-section { padding: 64px 0 0 !important; }
          .home-challenge-section { padding: 0 0 64px !important; }
          .home-dark-band { padding: 72px 0 !important; }
          .home-featured-section { padding: 56px 0 !important; }
          .home-faq-section { padding: 72px 0 !important; }
          .home-spec-strip { margin-top: 64px !important; }
          .home-spec-cell { padding: 28px 24px !important; }
          /* Hero: full-width thumb-reach CTA, tighter acronym tracking (2 clean lines). */
          .home-hero-ctas { width: 100% !important; }
          .home-hero-cta { width: 100% !important; max-width: 360px !important; justify-content: center !important; }
          .home-hero-acronym { letter-spacing: 0.22em !important; }
          .home-video-play { width: 64px !important; height: 64px !important; }
          /* Sticky demo card: pins below the header while the three steps scroll
             under it, so the playback-synced highlight reads like a storyboard.
             (Wins over the 900px static rule — later source order, same specificity.) */
          .home-attach-video {
            position: sticky !important;
            top: 84px !important;
            z-index: 5;
            box-shadow: 0 26px 50px -18px rgba(26,22,18,0.4), 0 10px 24px -10px rgba(26,22,18,0.25) !important;
          }
          .home-challenge-h2 { font-size: 36px !important; }
          .home-dark-h2 { font-size: 38px !important; }
          .home-fda-note { font-size: 17px !important; }
        }
      `}</style>
    </main>
  );
}

const hsl: Record<string, CSSProperties> = {
  innerWide: { maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  h2Editorial: { fontFamily: "var(--font-serif)", fontSize: 48, fontWeight: 400, lineHeight: 1.08, letterSpacing: "-1.2px", color: "var(--color-ink)", margin: 0, textWrap: "balance" },
  h2EditorialDark: { fontFamily: "var(--font-serif)", fontSize: 56, fontWeight: 300, lineHeight: 1.06, letterSpacing: "-1.6px", color: "var(--color-on-dark)", margin: 0, textWrap: "balance" },
  lede: { fontFamily: "var(--font-sans)", fontSize: 18, color: "var(--color-body)", lineHeight: 1.6, margin: "20px auto 0", maxWidth: 600, textWrap: "pretty" },
  ledeDark: { fontFamily: "var(--font-sans)", fontSize: 17, color: "rgba(245,244,240,0.7)", lineHeight: 1.6, margin: "20px auto 0", maxWidth: 540, textWrap: "pretty" },

  // 1. Full-bleed hero
  heroShell: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    isolation: "isolate",
  },
  heroImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 55%",
    backgroundRepeat: "no-repeat",
    // Deliberate crop: pushes a watermark off the right edge. Never animate this.
    transform: "scale(1.12)",
    transformOrigin: "left center",
    zIndex: -2,
  },
  heroScrim: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.45) 100%)",
    zIndex: -1,
  },
  heroContent: {
    width: "100%",
    maxWidth: 1400,
    padding: "0 32px",
    textAlign: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroWordmark: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(120px, 18vw, 260px)",
    fontWeight: 800,
    lineHeight: 0.9,
    letterSpacing: "-0.04em",
    color: "#fff",
    margin: 0,
    textShadow: "0 4px 30px rgba(0,0,0,0.25)",
  },
  heroExpand: {
    marginTop: 28,
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(15px, 1.25vw, 19px)",
    fontWeight: 800,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "#ffffff",
    textShadow: "0 2px 16px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4)",
  },
  heroTagline: {
    marginTop: 14,
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: "clamp(18px, 1.5vw, 24px)",
    fontWeight: 500,
    color: "#ffffff",
    letterSpacing: "0.01em",
    textShadow: "0 2px 16px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4)",
  },
  heroCtas: {
    marginTop: 40,
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heroCtaWhite: {
    height: 58, padding: "0 34px", borderRadius: 6, border: 0, cursor: "pointer",
    background: "#fff", color: "var(--color-primary)",
    fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700,
    boxShadow: "0 18px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.22)",
    letterSpacing: "0.01em",
  },

  // 2. Intro
  introSection: { padding: "120px 0 96px" },
  introGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 56, alignItems: "center" },

  // Big mixed-type headline
  bigHeadlineWrap: { textAlign: "left", minWidth: 0 },
  bigHeadline: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "clamp(6px, 0.6vw, 14px)",
    color: "var(--color-ink)",
  },
  bhMuted: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(28px, 3.4vw, 52px)",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
    color: "var(--color-muted)",
  },
  bhAmber: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(34px, 4.4vw, 68px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    lineHeight: 1.0,
    color: "var(--color-primary)",
  },
  bhElectricRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 18px)",
    marginLeft: "-0.04em",
    lineHeight: 1.0,
  },
  bhElectric: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: "clamp(96px, 13vw, 220px)",
    lineHeight: 0.95,
    letterSpacing: "-0.04em",
    color: "var(--color-ink)",
  },
  bhSeconds: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 14,
    lineHeight: 1.0,
    flexWrap: "wrap",
  },
  bhSecondsIn: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(28px, 3.4vw, 52px)",
    color: "var(--color-muted-soft)",
  },
  bhSecondsNum: {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: "clamp(28px, 3.6vw, 56px)",
    letterSpacing: "-0.02em",
    color: "var(--color-ink)",
  },
  bigSubcopy: {
    fontFamily: "var(--font-sans)",
    fontSize: 19,
    lineHeight: 1.55,
    color: "var(--color-body)",
    maxWidth: 520,
    marginTop: 32,
    textWrap: "pretty",
  },

  // Video card on the right
  videoCard: {
    position: "relative",
    width: "100%",
    aspectRatio: "4/5",
    borderRadius: 18,
    overflow: "hidden",
    background: "var(--color-ink)",
    border: "1px solid var(--color-hairline)",
    boxShadow: "0 30px 60px -20px rgba(26,22,18,0.28), 0 8px 24px -10px rgba(26,22,18,0.18)",
  },
  videoEl: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    background: "#1A1612",
  },
  videoTag: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    background: "#1A1612",
  },
  videoPlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 84,
    height: 84,
    borderRadius: "50%",
    border: 0,
    cursor: "pointer",
    background: "rgba(255,255,255,0.95)",
    color: "var(--color-primary)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
    transition: "opacity 200ms ease, transform 200ms ease",
    paddingLeft: 4,
  },

  // 3. Three-stat strip below intro — lifted bubble
  specStrip: {
    marginTop: 96,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 0,
    background: "var(--color-surface-card)",
    borderRadius: 20,
    border: "1px solid var(--color-hairline)",
    boxShadow: "0 30px 60px -20px rgba(26,22,18,0.22), 0 12px 24px -12px rgba(26,22,18,0.12), 0 2px 4px rgba(26,22,18,0.04)",
    overflow: "hidden",
  },
  specCard: {
    padding: "40px 36px 36px",
    borderRight: "1px solid var(--color-hairline-soft)",
    background: "transparent",
  },
  specNumRow: { display: "flex", alignItems: "baseline", gap: 8 },
  specNum: {
    fontFamily: "var(--font-sans)",
    fontWeight: 800,
    fontSize: "clamp(56px, 6vw, 88px)",
    lineHeight: 0.95,
    letterSpacing: "-0.04em",
    color: "var(--color-ink)",
  },
  specUnit: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "clamp(18px, 1.6vw, 24px)",
    color: "var(--color-primary)",
    letterSpacing: "-0.01em",
  },
  specHead: {
    fontFamily: "var(--font-sans)",
    fontSize: 17,
    fontWeight: 700,
    color: "var(--color-ink)",
    marginTop: 16,
    letterSpacing: "-0.01em",
  },
  specBody: {
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.5,
    color: "var(--color-body)",
    marginTop: 6,
    textWrap: "pretty",
  },

  // 4. Three-step attach + video
  attachSection: { padding: "96px 0 0" },
  attachHeading: { maxWidth: 760, marginBottom: 56 },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
    letterSpacing: "1.4px", textTransform: "uppercase",
    color: "var(--color-ink)", marginBottom: 14,
  },
  eyebrowDot: { width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)" },
  attachH2: {
    fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4.4vw, 56px)",
    fontWeight: 300, lineHeight: 1.08, letterSpacing: "-1.2px",
    color: "var(--color-ink)", margin: 0, textWrap: "balance",
  },
  attachGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
    gap: 48,
    alignItems: "start",
  },
  attachList: {
    listStyle: "none", margin: 0, padding: 0,
    display: "flex", flexDirection: "column", gap: 16,
  },
  attachItem: {
    // applied to a <button> inside each <li>, so reset UA button styles
    position: "relative",
    display: "block",
    width: "100%",
    textAlign: "left",
    fontFamily: "var(--font-sans)",
    fontSize: "inherit",
    padding: "28px 28px 28px 32px",
    borderRadius: "var(--radius-md)",
    border: 0,
    borderLeft: "3px solid var(--color-hairline)",
    background: "transparent",
    cursor: "pointer",
    transition: "background var(--duration-med) var(--ease-out), border-color var(--duration-med) var(--ease-out), box-shadow var(--duration-med) var(--ease-out), color var(--duration-med) var(--ease-out)",
    color: "var(--color-muted)",
  },
  attachItemActive: {
    background: "var(--color-surface-card)",
    borderLeft: "3px solid var(--color-primary)",
    boxShadow: "var(--shadow-card-rest)",
    color: "var(--color-body)",
  },
  attachNum: {
    width: 40, height: 40, borderRadius: "50%",
    background: "var(--color-ink)", color: "var(--color-on-ink)",
    display: "grid", placeItems: "center",
    fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700,
    marginBottom: 16,
  },
  attachH: {
    fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700,
    letterSpacing: "-0.02em", color: "var(--color-ink)",
    marginBottom: 6, lineHeight: 1.2,
  },
  attachB: {
    fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 400,
    lineHeight: 1.5, color: "inherit", textWrap: "pretty",
  },
  attachVideoCard: {
    position: "sticky",
    top: 24,
    width: "100%",
    aspectRatio: "16/10",
    borderRadius: "var(--radius-lg)",
    background: "var(--color-ink)",
    overflow: "hidden",
    border: "1px solid var(--color-hairline)",
    boxShadow: "var(--shadow-card-rest)",
  },
  attachPlay: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: 88, height: 88, borderRadius: "50%",
    border: "2px solid var(--color-on-ink)",
    background: "transparent", color: "var(--color-on-ink)",
    display: "grid", placeItems: "center",
    cursor: "pointer", paddingLeft: 4,
    transition: "transform var(--duration-fast) var(--ease-out)",
  },
  attachVideoLabel: {
    position: "absolute", bottom: 20, left: 24,
    fontFamily: "var(--font-mono)", fontSize: 12,
    color: "rgba(245,244,240,0.9)",
    letterSpacing: "0.04em",
    background: "rgba(26,22,18,0.55)",
    padding: "6px 12px",
    borderRadius: 9999,
  },
  attachVideoToggle: {
    position: "absolute", bottom: 16, right: 16,
    width: 40, height: 40, borderRadius: "50%",
    border: "1px solid rgba(245,244,240,0.4)",
    background: "rgba(26,22,18,0.55)",
    color: "var(--color-on-ink)",
    display: "grid", placeItems: "center",
    cursor: "pointer",
    paddingLeft: 2,
  },

  // 6. Challenge cards — compact horizontal
  challengeSection: { padding: "0 0 120px", background: "var(--color-canvas)" },
  challengeGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 },
  challengeCard: {
    background: "var(--color-surface-card)",
    border: "1px solid var(--color-hairline)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-card-rest)",
    padding: "20px 24px",
    overflow: "hidden",
  },
  challengeTag: {
    display: "inline-block",
    fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
    letterSpacing: "1.2px", textTransform: "uppercase",
    color: "var(--color-primary-ink)",
    background: "var(--color-primary-soft)",
    borderRadius: "var(--radius-full)",
    padding: "2px 10px",
    marginBottom: 6,
  },
  challengeBody: { minWidth: 0 },
  challengeH: { fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--color-ink)", margin: "0 0 2px", lineHeight: 1.3 },
  challengeP: { fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-muted)", margin: 0, lineHeight: 1.4 },

  // 7. Dark band — validated
  darkBand2: { background: "#0E0B08", padding: "120px 0" },
  darkCta: { marginTop: 28, height: 44, padding: "0 22px", borderRadius: 6, border: "1px solid rgba(245,244,240,0.35)", background: "transparent", color: "var(--color-on-dark)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, cursor: "pointer" },

  // Testimonials
  realGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" },
  realCard: { background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", borderRadius: 10, padding: "32px 28px", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-card-rest)" },
  realQuoteMark: { fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 0.6, color: "var(--color-primary)", marginBottom: 14, height: 24 },
  realQuote: { fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 300, fontStyle: "italic", lineHeight: 1.35, color: "var(--color-ink)", margin: 0, flex: 1, textWrap: "pretty" },
  realAttr: { display: "flex", alignItems: "center", gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--color-hairline)" },
  realName: { fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-ink)" },

  // 8. Featured-in marquee
  featuredSection: { padding: "80px 0 80px", background: "var(--color-canvas)", borderTop: "1px solid var(--color-hairline-soft)" },
  featuredEyebrow: { fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-muted)", textAlign: "center", marginBottom: 40 },
  marqueeViewport: { width: "100%", overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)" },
  marqueeTrack: { display: "flex", width: "max-content", animation: "pawe-marquee 36s linear infinite" },
  marqueeGroup: { display: "flex", alignItems: "center", gap: 72, paddingRight: 72, flexShrink: 0 },
  featuredLogo: { height: 36, maxWidth: 180, objectFit: "contain", filter: "grayscale(1) brightness(0.55)", opacity: 0.8 },

  // 9. FAQ
  faqSection: { padding: "120px 0", background: "var(--color-surface-soft)" },
};
