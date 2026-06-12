import type { Metadata } from "next";
import { absoluteUrl, jsonLdScript, sharedOpenGraph } from "@/lib/seo";
import WaitlistScreen from "./WaitlistScreen";

export const metadata: Metadata = {
  // Tab shows "PAWE - Join the waitlist"; the richer title stays on the
  // social card.
  title: "Join the waitlist",
  description:
    "Join the PAWE waitlist for our wheelchair power attachment. Pre-FDA clearance, no payment — just quarterly updates and first priority when units ship.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Join the wheelchair power attachment waitlist",
    description:
      "Join the PAWE waitlist for our wheelchair power attachment. Pre-FDA clearance, no payment — just quarterly updates and first priority when units ship.",
    url: "/waitlist",
  },
};

// FAQ text below is copied VERBATIM from FAQ_ITEMS in ./WaitlistScreen.tsx —
// Google requires FAQPage schema text to match the visible page text. If the
// on-page FAQ changes, update this graph to match.
const graph = jsonLdScript([
  {
    "@type": "WebPage",
    "@id": absoluteUrl("/waitlist"),
    name: "Join the PAWE waitlist",
    url: absoluteUrl("/waitlist"),
    about: { "@id": absoluteUrl("/#organization") },
    description:
      "Interest form for PAWE, a wheelchair power attachment in development. No payment is taken — PAWE is pre-FDA clearance and not for sale. Signing up gets you one short progress update per quarter.",
  },
  {
    "@type": "FAQPage",
    "@id": absoluteUrl("/waitlist#faq"),
    mainEntity: [
      {
        "@type": "Question",
        name: "Is PAWE available to buy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not yet. PAWE is pre-clearance — it has not been cleared by the FDA and is not currently available for purchase. The interest form just adds you to our list so we can update you as we move through testing and clearance.",
        },
      },
      {
        "@type": "Question",
        name: "Am I being charged anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We can’t accept payment for PAWE yet. The interest form is free and there’s no obligation. If you don’t want to hear from us, write us back any time and we’ll remove you from the list.",
        },
      },
      {
        "@type": "Question",
        name: "What if my chair isn’t compatible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We’ll let you know within about a week. Most folding-frame chairs are yes; rigid frames are a work in progress. If we can’t fit your chair today, we’ll keep you on the list and let you know when we can.",
        },
      },
      {
        "@type": "Question",
        name: "How often will you email me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once a quarter, max. Progress, what we shipped, what we learned. If something urgent changes — a clearance milestone, an ordering window — we’ll send a separate note.",
        },
      },
      {
        "@type": "Question",
        name: "Can a clinician or family member sign up on someone’s behalf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pick “Family member” or “Clinician” on the form and write the user’s chair details and routes in the comment field. We follow up with both of you.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get hold of a founder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Write us at Info@technotonin.com or call 508 · 333 · 1435 — that line goes to a real founder. Mon–Fri, 9 am–6 pm ET.",
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
        dangerouslySetInnerHTML={{ __html: graph }}
      />
      <WaitlistScreen />
    </>
  );
}
