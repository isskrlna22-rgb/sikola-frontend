import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Use this everywhere instead of raw template strings for className.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split("@");

  if (!username || !domain) {
    return email;
  }

  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }

  return `${username.slice(0, 2)}***@${domain}`;
}