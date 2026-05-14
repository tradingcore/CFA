/**
 * Multi-currency pricing helpers.
 *
 * The Stripe account is on Stripe Brasil, which means:
 *  - USD prices work for international cards but Brazilian-issued cards
 *    frequently fail (issuer blocks foreign-currency authorizations).
 *  - BRL prices work for both Brazilian and international cards.
 *
 * We expose two parallel sets of Stripe Price IDs (USD and BRL) and pick the
 * right one based on the visitor's country. Users can override the choice
 * manually via a toggle on the pricing page; the choice is persisted in
 * localStorage so they don't have to re-pick on each visit.
 *
 * Required env vars on Vercel (Production):
 *   - NEXT_PUBLIC_STRIPE_PRICE_MONTHLY        // existing — USD monthly
 *   - NEXT_PUBLIC_STRIPE_PRICE_YEARLY         // existing — USD 6-month
 *   - NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_BRL    // new — BRL monthly
 *   - NEXT_PUBLIC_STRIPE_PRICE_YEARLY_BRL     // new — BRL 6-month
 */

export type Currency = "USD" | "BRL";
export type PlanId = "monthly" | "semiannual";

export interface PlanInfo {
  id: PlanId;
  priceId: string;
  amount: number; // In major units (50, 250, etc.) — for display only.
  display: string; // Pre-formatted price string, e.g. "$50" or "R$ 250".
  period: string; // "month" or "6 months".
  savings?: string;
}

export interface PricingTable {
  currency: Currency;
  symbol: string;
  monthly: PlanInfo;
  semiannual: PlanInfo;
}

/**
 * Build the pricing table for a given currency. Reads price IDs from the
 * `NEXT_PUBLIC_*` envs that ship to the client. Empty string when the env is
 * missing (this is fine for build-time but the corresponding plan should not
 * be advertised — the UI defends against `priceId === ""`).
 */
function buildTable(currency: Currency): PricingTable {
  if (currency === "BRL") {
    const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_BRL ?? "";
    const semiPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY_BRL ?? "";
    return {
      currency: "BRL",
      symbol: "R$",
      monthly: {
        id: "monthly",
        priceId: monthlyPriceId,
        amount: 250,
        display: "R$ 250",
        period: "month",
      },
      semiannual: {
        id: "semiannual",
        priceId: semiPriceId,
        amount: 1250,
        display: "R$ 1.250",
        period: "6 months",
        savings: "Save R$ 250 vs monthly (17% off)",
      },
    };
  }

  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? "";
  const semiPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY ?? "";
  return {
    currency: "USD",
    symbol: "$",
    monthly: {
      id: "monthly",
      priceId: monthlyPriceId,
      amount: 50,
      display: "$50",
      period: "month",
    },
    semiannual: {
      id: "semiannual",
      priceId: semiPriceId,
      amount: 250,
      display: "$250",
      period: "6 months",
      savings: "Save $50 vs monthly (17% off)",
    },
  };
}

/**
 * Return the pricing table for a currency. The result is plain data so it
 * can be used in both client and server components.
 */
export function getPricingTable(currency: Currency): PricingTable {
  return buildTable(currency);
}

/**
 * Pick the default currency for a given country code (ISO-3166 alpha-2).
 * Today only Brazil maps to BRL; everywhere else (including unknown) gets
 * USD. Easy to extend for MXN/EUR/etc. later.
 */
export function pickCurrencyFromCountry(country: string | null | undefined): Currency {
  if (!country) return "USD";
  return country.toUpperCase() === "BR" ? "BRL" : "USD";
}

/**
 * Check whether the given currency has both Stripe price IDs configured.
 * Used so the UI doesn't expose a non-functional plan when an env is missing
 * (e.g. during the rollout before BRL prices are created).
 */
export function isCurrencyAvailable(currency: Currency): boolean {
  const t = buildTable(currency);
  return Boolean(t.monthly.priceId) && Boolean(t.semiannual.priceId);
}

const CURRENCY_STORAGE_KEY = "tc_currency_pref";

/**
 * Persist the user's manual currency choice in localStorage so subsequent
 * visits skip the auto-detection.
 */
export function setStoredCurrency(currency: Currency): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // ignore — privacy mode, etc.
  }
}

/**
 * Read the user's previously chosen currency. Returns `null` when there is
 * no preference yet, in which case the page should auto-detect.
 */
export function getStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (raw === "USD" || raw === "BRL") return raw;
    return null;
  } catch {
    return null;
  }
}
