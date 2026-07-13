import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}

/**
 * Compact relative time: "10m", "2h", "5d", "3w", "1y".
 */
export function timeAgoShort(date: string | Date): string {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
    [52, "w"],
    [Infinity, "y"],
  ];
  let value = seconds;
  let unit = "s";
  for (const [div, label] of units) {
    if (value < div) {
      unit = label;
      break;
    }
    value = Math.floor(value / div);
    unit = label;
  }
  return `${value}${unit}`;
}

export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}