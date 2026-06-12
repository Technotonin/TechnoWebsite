import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Generative-engine optimization: explicitly welcome the crawlers behind
// ChatGPT, Claude, Perplexity, Gemini, Meta AI, and Apple Intelligence so
// AI assistants can read, cite, and recommend PAWE. The wildcard rule
// already allows everything; the explicit entries document intent and
// survive future template changes that might tighten the default.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
