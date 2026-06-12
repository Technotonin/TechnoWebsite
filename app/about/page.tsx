import type { Metadata } from "next";
import AboutScreen from "./AboutScreen";
import { absoluteUrl, jsonLdScript, sharedOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  // Tab shows "PAWE - About"; the richer title stays on the social card.
  title: "About",
  description:
    "Who makes PAWE? Technotonin Industries, a Massachusetts assistive technology startup. Meet the team building it through above 100 interviews with wheelchair users.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...sharedOpenGraph,
    title: "About Technotonin — the team behind PAWE",
    description:
      "Who makes PAWE? Technotonin Industries, a Massachusetts assistive technology startup. Meet the team building it through above 100 interviews with wheelchair users.",
    url: "/about",
  },
};

// Page-level structured data: the about page itself plus the two founders.
// The Organization node lives in the root layout; reference it by @id.
const aboutGraph = jsonLdScript([
  {
    "@type": "AboutPage",
    name: "About Technotonin Industries",
    url: absoluteUrl("/about"),
    about: { "@id": absoluteUrl("/#organization") },
    description:
      "Technotonin Industries — a fusion of technology and serotonin — has spent four years building PAWE, guided by above 100 interviews with wheelchair users.",
  },
  {
    "@type": "Person",
    name: "Arav Tyagi",
    jobTitle: "Co-CEO & Co-founder",
    worksFor: { "@id": absoluteUrl("/#organization") },
    image: absoluteUrl("/assets/team/arav-tyagi.png"),
  },
  {
    "@type": "Person",
    name: "Antonio Marzoratti",
    jobTitle: "Co-CEO & Co-founder",
    worksFor: { "@id": absoluteUrl("/#organization") },
    image: absoluteUrl("/assets/team/antonio-marzoratti.jpeg"),
  },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutGraph }}
      />
      <AboutScreen />
    </>
  );
}
