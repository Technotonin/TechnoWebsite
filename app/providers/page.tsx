import type { Metadata } from "next";
import { absoluteUrl, jsonLdScript, sharedOpenGraph } from "@/lib/seo";
import ProvidersScreen from "./ProvidersScreen";

const TITLE = "Wheelchair power assist for clinicians — PT, OT, ATP & DME";
const DESCRIPTION =
  "PAWE is a 15 lb power assist attachment for manual wheelchairs. Pre-FDA clearance — PTs, OTs, ATPs and DME suppliers can connect with a founder today.";

export const metadata: Metadata = {
  // Tab shows "PAWE - For providers"; the keyword-rich TITLE stays on the
  // social card via openGraph below.
  title: "For providers",
  description: DESCRIPTION,
  alternates: { canonical: "/providers" },
  openGraph: {
    ...sharedOpenGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: "/providers",
  },
};

// FAQ text below is copied verbatim from FAQ_ITEMS in ProvidersScreen.tsx —
// Google requires FAQPage schema text to match the visible page text. If the
// on-page FAQ changes, update this graph to match.
const graph = jsonLdScript([
  {
    "@type": "WebPage",
    name: TITLE,
    url: absoluteUrl("/providers"),
    about: { "@id": absoluteUrl("/#organization") },
    audience: {
      "@type": "Audience",
      audienceType:
        "Physical therapists, occupational therapists, ATPs, and DME suppliers",
    },
  },
  {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is PAWE appropriate for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Manual-wheelchair users with functional upper-body strength for joystick control and a folding-frame chair with 16–22 inch seat width. We’ll walk through the fit checklist with you on our call.",
        },
      },
      {
        "@type": "Question",
        name: "Does PAWE replace a Group 3 powered chair?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — and we’d never claim it does. PAWE is an option for the much larger population currently in a manual chair who could benefit from powered mobility but doesn’t meet Group 3 criteria, or who is functional in a manual chair on flat ground but loses independence on hills or longer routes.",
        },
      },
      {
        "@type": "Question",
        name: "Can I buy one for my clinic right now?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not yet. PAWE is pre-clearance — it has not been cleared by the FDA and is not currently available for purchase. Getting in touch adds you to our clinician & DME list so we can update you as we move through clearance.",
        },
      },
      {
        "@type": "Question",
        name: "Will there be a loaner / evaluation program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once we’re ready to put units in clinical and supplier hands. Clinicians and DMEs on the list are first in line when it opens — we’ll cover the details on our call.",
        },
      },
      {
        "@type": "Question",
        name: "How do I reach a founder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email Info@technotonin.com or call 508 333 1435 — that line goes straight to a founder.  Call any time!",
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
      <ProvidersScreen />
    </>
  );
}
