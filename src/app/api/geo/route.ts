import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/geo
 *
 * Returns the visitor's country code (ISO-3166 alpha-2). Used by the pricing
 * page to pick the right currency (BRL for Brazil, USD elsewhere) so that
 * Brazilian users land on a checkout that their domestic cards accept.
 *
 * Detection order (cheapest first):
 *   1. `x-vercel-ip-country` header — added automatically on every request
 *      when the app runs on Vercel. Zero cost, zero latency.
 *   2. IPinfo lookup — falls back to `ipinfo.io` using `IPINFO_TOKEN`.
 *      Already used for analytics geolocation; reusing the same path keeps
 *      this endpoint working in non-Vercel previews / staging.
 *
 * Response: { country: string }     // e.g. "BR", "US", "PT", or "unknown"
 *
 * The endpoint is intentionally simple and cacheable per-IP at the edge if
 * needed — but we keep it dynamic for now so users behind shared CDNs (e.g.
 * a Brazilian on a Cloudflare Argo path) get accurate detection.
 */
export const dynamic = "force-dynamic";

function pickClientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

async function geoFromIpinfo(ip: string): Promise<string | null> {
  const token = process.env.IPINFO_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return data.country?.toUpperCase() || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    return NextResponse.json({ country: vercelCountry.toUpperCase() });
  }

  const ip = pickClientIp(req);
  if (ip) {
    const country = await geoFromIpinfo(ip);
    if (country) return NextResponse.json({ country });
  }

  return NextResponse.json({ country: "unknown" });
}
