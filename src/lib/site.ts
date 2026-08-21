/**
 * On GitHub Pages the site lives under /<repo>/, so every absolute URL needs
 * that prefix. `new URL("/stories/x", origin)` would silently drop it, which
 * is why absoluteUrl() below concatenates instead.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const origin = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://lofa24.org"
).replace(/\/$/, "");

export const site = {
  name: "Lofa24",
  tagline: "Our Stories. Our People. Our Lofa.",
  description:
    "Lofa24 is a youth-led community media platform telling the stories, experiences, and concerns of people across Lofa County, Liberia.",
  mission:
    "Lofa24 is a youth-led community media platform dedicated to telling the stories, experiences, and concerns of people across Lofa County, Liberia. We create space for young people and communities to share their voices, engage with local leaders, and bring attention to issues that matter to them. Through community stories, conversations, and digital media, Lofa24 seeks to amplify underrepresented voices, particularly those of young people and adolescent girls, while promoting informed community engagement and positive social change.",
  /** Public root of the deployed site, including any base path. */
  url: `${origin}${basePath}`,
  basePath,
  /* Placeholders until Lofa24 supplies the real details. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "Voinjama, Lofa County, Liberia",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

/** Absolute URL for a root-relative path, base path included. */
export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
] as const;
