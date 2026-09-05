/** True only for strings with visible characters. Guards optional copy fields. */
export function hasText(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Drop blank strings from a list so lists never render empty items. */
export function visible(values: ReadonlyArray<string | undefined | null>): string[] {
  return values.filter(hasText);
}

/** Join fragments with a separator, dropping blanks so no dangling dots render. */
export function joinMeta(
  parts: ReadonlyArray<string | undefined | null>,
  separator = " · ",
): string {
  return visible(parts).join(separator);
}
