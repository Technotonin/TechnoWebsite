import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Bump this when page content meaningfully changes — a build timestamp
  // would mark every deploy as "fresh" and teach Google to ignore lastmod.
  const lastModified = new Date("2026-06-12");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/providers`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/waitlist`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/investors`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
