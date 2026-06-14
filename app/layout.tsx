import type { Metadata } from "next";
import { Inter_Tight, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { SITE_URL, organizationJsonLd, jsonLdScript, absoluteUrl } from "@/lib/seo";

// Brand stack is Söhne / Tiempos Headline / Berkeley Mono (paid licenses).
// Shipping the design system's documented substitutes.
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PAWE - Powering wheelchairs. Empowering lives.",
    template: "PAWE - %s",
  },
  description:
    "PAWE is a 15 lb electric attachment that turns the manual wheelchair you already own into a powered one in 10 seconds. By Technotonin Industries.",
  applicationName: "PAWE",
  publisher: "Technotonin Industries LLC",
  keywords: [
    "wheelchair power attachment",
    "motorized wheelchair attachment",
    "electric wheelchair attachment",
    "power assist device for manual wheelchair",
    "make manual wheelchair electric",
    "portable affordable wheelchair enhancer",
    "PAWE",
    "Technotonin",
  ],
  openGraph: {
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
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console verification. To verify via the HTML-tag method,
  // set GOOGLE_SITE_VERIFICATION in your Vercel env to the token Google gives
  // you and redeploy. (DNS-based verification needs no token here.)
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Sitewide structured data: the company and the site itself. Pages add
// their own page-level graphs (product, FAQs, video, people).
const siteGraph = jsonLdScript([
  organizationJsonLd,
  {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: "PAWE — Portable Affordable Wheelchair Enhancer",
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-US",
  },
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteGraph }}
        />
        <TopNav />
        {children}
        <Footer />
        {/* Privacy-friendly, same-origin (no cookie banner, no CSP changes).
            Data shows in the Vercel dashboard once enabled for the project. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
