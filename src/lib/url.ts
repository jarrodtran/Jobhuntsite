import { site } from "@/content";

/**
 * GitHub Pages serves the site under `/Jobhuntsite`; a custom domain serves it
 * at `/`. `NEXT_PUBLIC_BASE_PATH` is the single switch (see next.config.ts).
 * This is the only module that reads it.
 */
export const basePath: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Canonical URL of the homepage, with trailing slash, e.g. https://host/Jobhuntsite/ */
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
