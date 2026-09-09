import { site } from "@/content";

/**
 * Production (jarrodtran.com apex) serves at `/`. The project-pages path
 * `/Jobhuntsite` is still available via NEXT_PUBLIC_BASE_PATH for local
 * previews. This is the only module that reads the env var.
 */
export const basePath: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Canonical URL of the homepage, with trailing slash. */
export const siteUrl: URL = new URL(`${site.origin}${basePath}/`);

/**
 * Prefix a public-folder path with basePath. Use on raw <a href>, <img src>,
 * and metadata paths. Never wrap `next/link` hrefs; Next prefixes those itself.
 */
export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

/** Absolute URL for a public-folder path, for OG/Twitter images and JSON-LD. */
export function absoluteAsset(path: string): string {
  return new URL(asset(path), site.origin).href;
}

export function mailto(email: string): string {
  return `mailto:${email}`;
}
