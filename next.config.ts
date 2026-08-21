import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * The site builds two ways:
 *
 *  - default            a normal Next server build (Vercel, `next dev`), with
 *                       image optimisation and no path prefix.
 *  - GITHUB_PAGES=true  a fully static export for GitHub Pages, served from
 *                       https://<user>.github.io/<repo>/, so it needs a
 *                       basePath and cannot use the image optimiser.
 *
 * NEXT_PUBLIC_BASE_PATH is the single source of truth for the prefix and is
 * also read by src/lib/site.ts when building absolute URLs.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const staticExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  ...(staticExport
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath || undefined,
        // Pages has no server, so every route needs its own index.html.
        trailingSlash: true,
        // Pages has no server to optimise images. The custom loader ships
        // the originals and applies basePath, which `unoptimized: true`
        // does not do — it would leave every src pointing at the domain root.
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/image-loader.ts",
        },
      }
    : {}),
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
