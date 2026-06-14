import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy.
//
// This is a fully static marketing site: no user input is ever rendered, no
// auth, no cookies, no backend. We deliberately use a header-based CSP (not a
// nonce-based one) because nonces force every page into dynamic rendering —
// which would throw away the static generation, CDN caching, and LCP work the
// site depends on, for a brochure with effectively zero XSS surface. This is
// Next's own documented recommendation for sites that don't require nonces.
//
// 'unsafe-inline' is required because the UI is built on inline style objects
// and React/Next emit inline bootstrap + RSC-payload scripts without a nonce.
// 'unsafe-eval' is dev-only (React uses eval for richer error stacks).
// If user input, auth, or third-party embeds are ever added, upgrade to a
// nonce CSP via proxy.ts (or experimental SRI) and drop 'unsafe-inline'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
]
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // HSTS: force HTTPS for two years, including subdomains, eligible for preload.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Belt-and-suspenders clickjacking protection alongside frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from MIME-sniffing responses away from their declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Leak only the origin (not full path/query) to cross-origin destinations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny powerful APIs the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  // Isolate the browsing context from cross-origin window references.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // `poweredByHeader: false` removes the `X-Powered-By: Next.js` version
  // disclosure (minor fingerprinting reduction).
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
