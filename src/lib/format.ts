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

function utcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function formatMonthYear(iso: string): string {
  return monthYear.format(utcDate(iso));
}

export function formatPostDate(iso: string): string {
  return monthDayYear.format(utcDate(iso));
}

export function isPlaceholder(value: string): boolean {
  return value.includes("TODO_COPY");
}
