export function nextOpenExperienceId(
  currentOpenId: string | null,
  toggledId: string,
): string | null {
  return currentOpenId === toggledId ? null : toggledId;
}

export function experienceIdFromHash(
  hash: string,
  rowIds: readonly string[],
): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return id && rowIds.includes(id) ? id : null;
}
