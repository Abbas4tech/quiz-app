import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getUpdatedTimeString(
  updatedAt: number | string | Date,
  prefix = "updated"
): string {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMs = now.getTime() - updated.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 30) {
    return `${prefix} moments ago`;
  }
  if (diffSec < 90) {
    return `${prefix} about a minute ago`;
  }
  if (diffMin < 60) {
    return `${prefix} ${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  }

  if (diffHr < 24) {
    return `${prefix} ${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  }

  if (diffDay === 1) {
    return "${prefix} yesterday";
  }
  if (diffDay < 7) {
    return `${prefix} ${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  }

  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${prefix} ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  // For older timestamps, show date with month name
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = updated.toLocaleDateString(undefined, options);
  return `${prefix} on ${formattedDate}`;
}
