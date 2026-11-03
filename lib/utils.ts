import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateFromObj(input: Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

/** "Oct 2024 — Present" style range for projects and roles. */
export function formatDateRange(start: Date, end: Date | "Present"): string {
  const from = monthYear.format(new Date(start));
  const to = end === "Present" ? "Present" : monthYear.format(new Date(end));
  return `${from} — ${to}`;
}

/** "2024 — Present" style range. */
export function formatYearRange(start: Date, end: Date | "Present"): string {
  const from = new Date(start).getFullYear();
  const to = end === "Present" ? "Present" : new Date(end).getFullYear();
  return from === to ? `${from}` : `${from} — ${to}`;
}
