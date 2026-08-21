/**
 * Custom next/image loader for the GitHub Pages static export.
 *
 * `unoptimized: true` returns the raw `src` untouched, which means images keep
 * root-relative paths like /assets/images/... and 404 once the site is served
 * from /<repo>/. A custom loader is the documented way to do image handling in
 * a static export, and it lets us apply the base path in one place instead of
 * at every call site.
 *
 * There is no image optimisation here — Pages has no server to do it — so the
 * original file is returned, just correctly prefixed.
 */
export default function imageLoader({ src }: { src: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
