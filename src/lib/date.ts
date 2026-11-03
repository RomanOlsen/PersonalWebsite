/** Parses a YYYY-MM-DD string as a local date, avoiding UTC off-by-one shifts. */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Formats a date as YYYY-MM-DD in the America/Boise timezone. */
export function toBoiseDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Boise",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Formats a date's local calendar fields as YYYY-MM-DD (no timezone reinterpretation). */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
