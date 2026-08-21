import type { ComponentType } from "react";

type MdxModule = { default: ComponentType };

/**
 * Story bodies are loaded lazily so that pages showing only story metadata
 * (the home page, the stories index) never pull in the prose.
 */
export const storyBodies: Record<string, () => Promise<MdxModule>> = {
  "fifty-years-of-selling-water": () =>
    import("./fifty-years-of-selling-water.mdx"),
  "the-booth-he-built-himself": () => import("./the-booth-he-built-himself.mdx"),
  "a-family-that-listens-together": () =>
    import("./a-family-that-listens-together.mdx"),
  "eighteen-and-three-babies": () => import("./eighteen-and-three-babies.mdx"),
};
