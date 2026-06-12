import type { Metadata } from "next";

// Shared SEO configuration.
//
// IMPORTANT: set NEXT_PUBLIC_SITE_URL (or edit the fallback below) to the
// real production domain before launch — canonical URLs, Open Graph images,
// the sitemap, and structured data all derive from it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.technotonin.com";

export const SITE_NAME = "PAWE";
export const ORG_NAME = "Technotonin Industries LLC";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Shared Open Graph fields. Next.js merges metadata SHALLOWLY: a page-level
 * `openGraph` object replaces the root layout's wholesale, dropping the
 * image/type/siteName/locale. Every page that sets `openGraph` must spread
 * this first: `openGraph: { ...sharedOpenGraph, title, description, url }`.
 */
export const sharedOpenGraph = {
  type: "website",
  siteName: "PAWE by Technotonin",
  locale: "en_US",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "A PAWE user riding a manual wheelchair with the PAWE power attachment down a park path at sunset",
    },
  ],
} satisfies Metadata["openGraph"];

/** Organization shared by every page's structured data. */
export const organizationJsonLd = {
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: ORG_NAME,
  alternateName: ["Technotonin", "PAWE"],
  url: SITE_URL,
  logo: absoluteUrl("/assets/logos/technotonin-logo.png"),
  email: "Info@technotonin.com",
  telephone: "+1-508-333-1435",
  description:
    "Technotonin Industries builds PAWE, the Portable Affordable Wheelchair Enhancer — a 15 lb electric attachment that turns a manual wheelchair into a powered one in 10 seconds.",
  foundingDate: "2022",
  founder: [
    { "@type": "Person", name: "Arav Tyagi", jobTitle: "Co-CEO & Co-founder" },
    { "@type": "Person", name: "Antonio Marzoratti", jobTitle: "Co-CEO & Co-founder" },
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "MA",
    addressCountry: "US",
  },
  knowsAbout: [
    "wheelchair power attachments",
    "electric wheelchair conversion",
    "power assist devices for manual wheelchairs",
    "assistive technology",
    "mobility technology",
  ],
};

/** Serialize a schema.org graph for a JSON-LD script tag. */
export function jsonLdScript(graph: object | object[]) {
  return JSON.stringify(
    { "@context": "https://schema.org", "@graph": Array.isArray(graph) ? graph : [graph] },
    null,
    0
  );
}
