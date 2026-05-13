/**
 * Centralized admin identity. Used by:
 * - `src/app/admin/page.tsx` to gate access to the admin dashboard.
 * - `src/components/analytics/page-tracker.tsx` to flag the current session as internal.
 * - `src/app/api/analytics/track/route.ts` to validate `isInternal` server-side.
 *
 * Add or remove emails here to change who has admin privileges.
 */
export const ADMIN_EMAILS: readonly string[] = [
  "danielzf1818@gmail.com",
  "fleischmann606@gmail.com",
];

/**
 * isAdminEmail
 * @param email - email string from a Firebase user (or any other source); may be null/undefined.
 * @returns `true` if the email is present in `ADMIN_EMAILS`, `false` otherwise.
 */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}

/**
 * Key used in `localStorage` to mark the browser session as belonging to an admin.
 * Set when an admin signs in (in `PageTracker`) and cleared on sign-out.
 * Allows tagging anonymous page views (e.g. admin browsing logged out) as internal.
 */
export const INTERNAL_FLAG_KEY = "tc_internal";
