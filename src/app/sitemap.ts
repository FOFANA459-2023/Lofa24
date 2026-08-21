import type { MetadataRoute } from "next";
import { getAllStories } from "@/lib/content";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const stories = getAllStories().map((story) => ({
    url: new URL(`/stories/${story.slug}`, site.url).toString(),
    lastModified: new Date(`${story.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...pages, ...stories];
}
