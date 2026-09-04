import { experience, type ExperienceEntry } from "@/content";

/** True only for strings with visible characters. Guards optional copy fields. */
export function hasText(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Join meta fragments with a separator, dropping blanks so no dangling dots render. */
export function joinMeta(
  parts: Array<string | undefined | null>,
  separator = " · ",
): string {
  return parts.filter(hasText).join(separator);
}

/** Resolve `Role.experienceIds` to entries, preserving the order given. */
export function experienceByIds(ids: string[] | undefined): ExperienceEntry[] {
  if (!ids || ids.length === 0) return [];
  return ids
    .map((id) => experience.find((entry) => entry.id === id))
    .filter((entry): entry is ExperienceEntry => entry !== undefined);
}
