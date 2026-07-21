import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";

/**
 * Technical AEO: keep public content crawlable for search + AI answer engines,
 * while blocking the admin area from indexing.
 */
export default function robots(): MetadataRoute.Robots {
  const disallowAdmin = ["/admin/", "/admin"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowAdmin,
      },
      // OpenAI (ChatGPT search / retrieval)
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot"],
        allow: "/",
        disallow: disallowAdmin,
      },
      // Anthropic (Claude)
      {
        userAgent: ["ClaudeBot", "anthropic-ai", "Claude-User"],
        allow: "/",
        disallow: disallowAdmin,
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowAdmin,
      },
      // Google Gemini / AI features (do not block Google-Extended)
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: "/",
        disallow: disallowAdmin,
      },
      // Microsoft Copilot / Bing
      {
        userAgent: ["Bingbot", "bingbot"],
        allow: "/",
        disallow: disallowAdmin,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
