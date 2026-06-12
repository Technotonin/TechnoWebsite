import type { Metadata } from "next";
import InvestorsScreen from "./InvestorsScreen";
import { absoluteUrl, jsonLdScript, sharedOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  // Tab shows "PAWE - Investors"; the richer title stays on the social card.
  title: "Investors",
  description:
    "Technotonin is raising a med tech seed round for PAWE, a wheelchair hardware startup in assistive technology and mobility tech. Request the pitch deck.",
  alternates: { canonical: "/investors" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Investors — seed round in mobility & medical device tech",
    description:
      "Technotonin is raising a med tech seed round for PAWE, a wheelchair hardware startup in assistive technology and mobility tech. Request the pitch deck.",
    url: "/investors",
  },
};

// Page-level structured data: the investors page itself, scoped to its
// investor audience. The Organization node lives in the root layout.
const investorsGraph = jsonLdScript([
  {
    "@type": "WebPage",
    name: "Investors — seed round in mobility & medical device tech",
    url: absoluteUrl("/investors"),
    about: { "@id": absoluteUrl("/#organization") },
    audience: {
      "@type": "Audience",
      audienceType:
        "Venture capital, angel, and strategic investors in mobility and medical device technology",
    },
    description:
      "Technotonin Industries is raising a seed round for PAWE, the Portable Affordable Wheelchair Enhancer. Request the pitch deck.",
  },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: investorsGraph }}
      />
      <InvestorsScreen />
    </>
  );
}
