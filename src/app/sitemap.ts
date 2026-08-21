import type { MetadataRoute } from "next";
import { getAllStories } from "@/lib/content";
import { absoluteUrl, nav } from "@/lib/site";
/* Required by `output: "export"`, and a no-op for the server build. */
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: absoluteUrl(item.href),
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const stories = getAllStories().map((story) => ({
    url: absoluteUrl(`/stories/${story.slug}`),
    lastModified: new Date(`${story.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...pages, ...stories];
}
