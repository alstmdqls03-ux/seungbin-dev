import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { SITE } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE.url}/posts/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date("2026-01-01"),
  }));

  return [
    { url: SITE.url, lastModified: new Date("2026-07-23") },
    { url: `${SITE.url}/posts`, lastModified: new Date("2026-07-23") },
    ...posts,
  ];
}
