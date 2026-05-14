/**
 * Google tag (gtag.js) helpers.
 *
 * The Google tag is loaded once in the root layout (`src/app/layout.tsx`) via
 * `next/script`. This file centralizes:
 *  - the public Google Ads ID,
 *  - the optional conversion label for the "Purchase" conversion action,
 *  - typed wrappers so feature code (PageTracker, /checkout/success) doesn't
 *    have to deal with `window.gtag` typings.
 *
 * The Google Ads ID is intentionally hard-coded because it is a public
 * identifier that is exposed in the served HTML anyway. It can still be
 * overridden at build time via `NEXT_PUBLIC_GOOGLE_TAG_ID` if you need to
 * point a staging environment to a different account.
 *
 * The conversion label is read from `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL`.
 * Set it on Vercel once you create the Purchase conversion action in Google
 * Ads (Tools → Conversions → New action). The full `send_to` value Google Ads
 * expects looks like `AW-18156553089/abcDEF12345`.
 */

export const GOOGLE_TAG_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || "AW-18156553089";

export const GOOGLE_ADS_PURCHASE_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL || "";

/**
 * `true` when the Google tag is configured (always true in production today,
 * but allows easy disabling per environment via env var override).
 */
export const isGtagEnabled = Boolean(GOOGLE_TAG_ID);

type GtagCommand = "config" | "event" | "set" | "consent" | "js";
type GtagFn = (command: GtagCommand, ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Safely call `window.gtag` from any component. No-ops on the server, when
 * the script hasn't loaded yet, or when the tag is disabled.
 *
 * @param command - gtag command (typically `"event"` or `"config"`).
 * @param args - Remaining gtag arguments.
 */
export function gtagSafe(command: GtagCommand, ...args: unknown[]): void {
  if (typeof window === "undefined") return;
  if (!isGtagEnabled) return;
  if (typeof window.gtag !== "function") return;
  window.gtag(command, ...args);
}

/**
 * Manually fire a `page_view` for the given path. Required for the App Router
 * because client-side navigations do not trigger a real page load and thus do
 * not auto-fire the Google tag.
 *
 * @param path - The pathname (e.g. `/dashboard`) plus optional querystring.
 */
export function trackPageView(path: string): void {
  gtagSafe("event", "page_view", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
  });
}

/**
 * Fire the Google Ads "Purchase" conversion event.
 *
 * Should be called exactly once per successful checkout, on the post-payment
 * confirmation page, after the Stripe session has been verified server-side.
 *
 * @param params.value - Purchase amount in major currency units (e.g. 50 for
 *                       $50.00). Pass `0` if you don't want to send a value.
 * @param params.currency - ISO-4217 code (e.g. `"USD"`, `"BRL"`).
 * @param params.transactionId - Stripe Checkout Session ID. Used by Google
 *                               Ads to deduplicate if the user reloads the
 *                               page.
 */
export function trackPurchaseConversion(params: {
  value: number;
  currency: string;
  transactionId: string;
}): void {
  if (!GOOGLE_ADS_PURCHASE_LABEL) {
    // No conversion label configured yet — Google Ads will still pick up the
    // `/checkout/success` URL via the Page-visit conversion type, so we
    // intentionally fall back to a plain `purchase` event for GA4-style
    // attribution and bail out of the Ads-specific call.
    gtagSafe("event", "purchase", {
      value: params.value,
      currency: params.currency,
      transaction_id: params.transactionId,
    });
    return;
  }

  gtagSafe("event", "conversion", {
    send_to: `${GOOGLE_TAG_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`,
    value: params.value,
    currency: params.currency,
    transaction_id: params.transactionId,
  });
}
