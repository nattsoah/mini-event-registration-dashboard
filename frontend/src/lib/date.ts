/**
 * Centralized date formatting utility to ensure consistency across the application.
 * Hardcoded to Asia/Bangkok to ensure "Real-time" display matching the user's requirement.
 */

const DEFAULT_LOCALE = 'en-US';
const TIMEZONE = 'Asia/Bangkok';

/**
 * Format a date string to a human-readable format.
 * Example: "Jan 01, 2024, 07:37 PM"
 */
export function formatDateTime(dateString: string | Date): string {
  if (!dateString) return 'N/A';
  
  try {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: TIMEZONE,
    }).format(new Date(dateString));
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Format a date string to a long, detailed format.
 * Example: "Monday, June 7, 2026, 7:37 PM"
 */
export function formatDateTimeLong(dateString: string | Date): string {
  if (!dateString) return 'N/A';

  try {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: TIMEZONE,
    }).format(new Date(dateString));
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Format a date string to a simple date format.
 * Example: "Jan 01, 2024"
 */
export function formatDateSimple(dateString: string | Date): string {
  if (!dateString) return 'N/A';

  try {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: TIMEZONE,
    }).format(new Date(dateString));
  } catch {
    return 'Invalid Date';
  }
}
