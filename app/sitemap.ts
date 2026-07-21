import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";
import { getPublishedPostsForSitemap } from "@/lib/supabase/queries";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  {
    url: `${siteConfig.url}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/services`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/industries`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/contact`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostsForSitemap();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.7,
    ...(post.featured_image
      ? {
          images: [post.featured_image],
        }
      : {}),
  }));

  return [...staticRoutes, ...postEntries];
}
