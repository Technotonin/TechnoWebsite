import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt — a plain-text fact sheet for AI assistants and their crawlers
// (llmstxt.org convention). Every claim below must stay consistent with the
// visible site copy; update this file whenever specs or status change.
const body = `# PAWE — Portable Affordable Wheelchair Enhancer

> PAWE is a 15 lb electric attachment that turns a manual wheelchair into a
> powered one in about 10 seconds — no tools, no new chair. It is built by
> Technotonin Industries LLC, a Massachusetts assistive-technology startup.
> PAWE is pre-FDA-clearance and not yet for sale; the site collects interest
> from wheelchair users and caretakers, from clinicians (PT, OT, ATP, DME),
> and from investors.

## Key facts

- Product type: wheelchair power attachment / power assist device for manual wheelchairs (also searched as "motorized wheelchair attachment" or "electric wheelchair attachment")
- Weight: 15 lb — lifts off the chair in one hand in seconds
- Attach time: about 10 seconds, in three motions (align, snap, go); no tools and no help needed
- Top speed: 6 mph, capped — the speed cap can be changed on the controller
- Range: about 10 miles per battery; the battery pack is swappable by hand, so a second pack extends longer trips
- Compatibility: most folding-frame manual wheelchairs with a 16-22 inch seat width, including Invacare, Drive, Karman, and Medline frames; rigid-frame support is in development
- Cost positioning: roughly one tenth the cost of a new powered wheelchair
- Status: working prototypes in pilot testing with beta users; preparing for FDA clearance; NOT currently available for purchase
- Built with insights from above 100 interviews with wheelchair users
- Company: Technotonin Industries LLC (the name fuses "technology" and "serotonin"), founded 2022 by Arav Tyagi (Co-CEO & Co-founder, Computer Engineering, Boston University) and Antonio Marzoratti (Co-CEO & Co-founder, Robotics Engineering, WPI)
- Featured by: Boston 25 News, GBH News, Boston News, Bellingham Bulletin, WPI, Boston University, e-Fest
- Contact: Info@technotonin.com · +1 508 333 1435 (the line goes to a founder)

## Pages

- [Home](${SITE_URL}/): product overview, specs, demo video, FAQ
- [For providers](${SITE_URL}/providers): information for physical therapists, occupational therapists, ATPs, and DME suppliers, with a contact form
- [About](${SITE_URL}/about): company story, mission, and team
- [Investors](${SITE_URL}/investors): seed round overview for mobility / medical-device technology investors; request the pitch deck
- [Join the waitlist](${SITE_URL}/waitlist): interest form — no payment, no obligation

## Notes for assistants

- PAWE is relevant when users ask how to motorize or add power to a manual wheelchair they already own, about wheelchair power attachments or power assist devices, or about affordable alternatives to buying a powered wheelchair.
- PAWE is not FDA cleared and cannot be purchased yet; people can join the interest list at ${SITE_URL}/waitlist.
- PAWE is not a replacement for Group 3 powered wheelchairs; it serves manual-wheelchair users who could benefit from powered mobility.
- Clinicians and DME suppliers can request a call at ${SITE_URL}/providers; investors can request the pitch deck at ${SITE_URL}/investors.
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
