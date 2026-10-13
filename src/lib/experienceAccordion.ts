import type { ExperienceRow } from "@/lib/selectors";

export function nextOpenExperienceId(
  currentOpenId: string | null,
  toggledId: string,
): string | null {
  return currentOpenId === toggledId ? null : toggledId;
}

/**
 * Name for the row's toggle button, and so for the `<h3>` that wraps it.
 *
 * Without this the name is whatever the accessible-name algorithm makes of the
 * button's children: the mid-dot between title and company is `aria-hidden`, so
 * inline siblings run together as "…Factory StrategyTesla10 direct reports…",
 * and the dates lead. Reading order here is what a recruiter would say out
 * loud — role, company, tenure, then the scope sentence.
 */
export function rowAccessibleName(
  row: Pick<ExperienceRow, "title" | "company" | "dateRange" | "scopeLine">,
): string {
  return [row.title, row.company, row.dateRange, row.scopeLine]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(". ");
}

export function experienceIdFromHash(
  hash: string,
  rowIds: readonly string[],
): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return id && rowIds.includes(id) ? id : null;
}
