/** Prefix a public-folder path with basePath. Use only on raw <a> and metadata URLs, never with next/link. */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
