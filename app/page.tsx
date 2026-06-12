import type { Metadata } from "next";
import HomeScreen from "./HomeScreen";
import { absoluteUrl, jsonLdScript, sharedOpenGraph } from "@/lib/seo";

const HOME_TITLE = "PAWE — motorized attachment for manual wheelchairs";
const HOME_DESCRIPTION =
  "PAWE is a 15 lb wheelchair power attachment that makes your manual wheelchair electric in 10 seconds — no tools, no new chair. Join the waitlist.";

export const metadata: Metadata = {
  // Tab shows "PAWE - Home" (absolute: the layout's title template doesn't
  // apply to the page in its own segment). The keyword-rich HOME_TITLE
  // stays on the social card via openGraph below.
  title: { absolute: "PAWE - Home" },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    // Page-level openGraph replaces the root layout's openGraph wholesale
    // (metadata merging is shallow), so the shared fields are spread in
    // to keep the OG card image intact.
    ...sharedOpenGraph,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
};

// Page-level structured data. The Organization and WebSite nodes live in the
// root layout; the org is referenced here by @id only. FAQ text is copied
// VERBATIM from HomeScreen's faqItems — Google requires FAQPage schema text
// to match the visible page text, so keep the two in sync.
const homeGraph = jsonLdScript([
  {
    "@type": "Product",
    name: "PAWE — Portable Affordable Wheelchair Enhancer",
    brand: { "@type": "Brand", name: "PAWE" },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    description:
      "A 15 lb electric attachment that turns a manual wheelchair into a powered one. It attaches in 10 seconds, tops out at a capped 6 mph, runs about 10 miles per swappable battery, and fits most folding-frame manual wheelchairs with 16–22 inch seat widths.",
    image: absoluteUrl("/og-image.jpg"),
    category: "Assistive technology",
  },
  {
    "@type": "VideoObject",
    name: "PAWE demo — attach and go in 10 seconds",
    description:
      "Shows aligning, snapping, and driving the PAWE attachment on a manual wheelchair.",
    contentUrl: absoluteUrl("/assets/photos/FullHypeVideoDemo.mp4"),
    thumbnailUrl: absoluteUrl("/assets/photos/antonio-on-pawe-poster.jpg"),
    uploadDate: "2026-05-27",
    duration: "PT20S",
  },
  {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What wheelchairs does PAWE fit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most folding-frame manual wheelchairs with a 16–22 inch seat width, including Invacare, Drive, Karman, and Medline. We are also working on having it attach to rigid frames as well, to make it truly universal. If you want to help guide our design, and make the PAWE better for everyone, contact us!",
        },
      },
      {
        "@type": "Question",
        name: "What does a swappable battery mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PAWE uses a removable battery pack that pops out and clicks back in by hand — no tools, no cables. You can carry a second pack in a backpack and swap it in the middle of a longer trip, charge one indoors while a fresh one's on the chair, or replace a tired cell down the road without sending the whole unit back to us.",
        },
      },
      {
        "@type": "Question",
        name: "Where is the current development of the PAWE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We have working prototypes that we are using for gathering user feedback and getting prepared for being FDA Cleared. Currently, we are fundraising to support our journey through getting FDA Cleared. If you are or know someone who is interested in joining our mission, contact us!",
        },
      },
    ],
  },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homeGraph }}
      />
      <HomeScreen />
    </>
  );
}
