import { TODO_COPY } from "@/content/site";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthDayYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function utcDate(iso: string): Date {
  if (!isIsoDate(iso)) {
    throw new Error(`Expected YYYY-MM-DD, got ${iso}`);
  }
  return new Date(`${iso}T00:00:00Z`);
}

export function formatMonthYear(iso: string): string {
  return monthYear.format(utcDate(iso));
}

export function formatPostDate(iso: string): string {
  return monthDayYear.format(utcDate(iso));
}

export function formatRfc822(iso: string): string {
  return utcDate(iso).toUTCString();
}

/** True when a string still carries the TODO_COPY marker (bare or hinted). */
export function isPlaceholder(value: string): boolean {
  return value.includes(TODO_COPY);
}

/** Prefer real copy; never return a TODO_COPY string to metadata or feeds. */
export function publicText(value: string, fallback: string): string {
  const trimmed = value.trim();
  if (!trimmed || isPlaceholder(trimmed)) {
    return fallback;
  }
  return trimmed;
}
