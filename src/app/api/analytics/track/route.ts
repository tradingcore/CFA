import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/admin";

export interface PageViewData {
  path: string;
  referrer: string;
  userAgent: string;
  language: string;
  screenWidth: number;
  device: "mobile" | "desktop" | "tablet";
  sessionId: string;
  userId: string | null;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  provider?: string | null;
  isNewVisitor: boolean;
  isInternal?: boolean;
  timestamp: string;
}

interface GeoData {
  countryCode: string;
  city: string;
  region: string;
  postal: string;
  loc: string;
  timezone: string;
  org: string;
  hostname: string;
}

const EMPTY_GEO: GeoData = {
  countryCode: "unknown",
  city: "",
  region: "",
  postal: "",
  loc: "",
  timezone: "",
  org: "",
  hostname: "",
};

/**
 * getGeoFromIP
 * Resolves geolocation, ASN/org and reverse-DNS info for a visitor IP using the
 * standard IPinfo API endpoint (ipinfo.io/{ip}/json), which provides city-level
 * granularity (city, region, postal, lat/long, timezone, org).
 *
 * @param ip - Caller IP (typically derived from `x-forwarded-for` / `x-real-ip`).
 * @returns Geo info; returns sentinel values when the IP can't be resolved
 * (local IP, missing token, network error, non-200 response).
 *
 * Notes:
 * - Uses Bearer auth with `IPINFO_TOKEN` env var.
 * - Resilient by design: 2s timeout and graceful fallback so tracking never breaks.
 * - Free tier of the standard endpoint is 50k requests/month.
 */
async function getGeoFromIP(ip: string): Promise<GeoData> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") {
    return { ...EMPTY_GEO, countryCode: "local" };
  }

  const token = process.env.IPINFO_TOKEN;
  if (!token) return EMPTY_GEO;

  try {
    const res = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return EMPTY_GEO;

    const d = (await res.json()) as {
      city?: string;
      region?: string;
      country?: string;
      loc?: string;
      org?: string;
      postal?: string;
      timezone?: string;
      hostname?: string;
    };

    return {
      countryCode: d.country || "unknown",
      city: d.city || "",
      region: d.region || "",
      postal: d.postal || "",
      loc: d.loc || "",
      timezone: d.timezone || "",
      org: d.org || "",
      hostname: d.hostname || "",
    };
  } catch {
    return EMPTY_GEO;
  }
}

/**
 * extractClientIP
 * Pulls the visitor IP out of standard proxy headers, in priority order:
 * `x-forwarded-for` (first hop) → `x-real-ip`. Returns empty string if neither
 * is present or both are blank.
 */
function extractClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

/**
 * POST /api/analytics/track
 * Records a single page view for any visitor (anonymous or authenticated).
 *
 * Captured data:
 * - Visitor: IP, geo (city/region/country/postal/timezone), org/ISP.
 * - Auth: userId, email, displayName, photoURL, provider (when logged in).
 * - Session: sessionId, isNewVisitor, device, language, userAgent.
 *
 * Privacy note: the persisted record contains PII (email + IP). Treat the
 * `pageViews` collection as internal/admin-only.
 *
 * Behavior:
 * - `isInternal` is set to true if the client flagged it OR the email matches
 *   `ADMIN_EMAILS` (defense in depth).
 * - Always returns `{ ok: true }`; failures are logged but never break tracking.
 */
export async function POST(req: NextRequest) {
  try {
    const data: PageViewData = await req.json();

    if (!data.path || !data.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ip = extractClientIP(req);
    const geo = await getGeoFromIP(ip);
    const isInternal = !!data.isInternal || isAdminEmail(data.email);

    const record = {
      path: data.path,
      referrer: data.referrer || "",
      userAgent: (data.userAgent || "").slice(0, 300),
      language: data.language || "",
      screenWidth: data.screenWidth || 0,
      device: data.device || "desktop",
      sessionId: data.sessionId,
      userId: data.userId || null,
      email: data.email || null,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      provider: data.provider || null,
      isNewVisitor: data.isNewVisitor ?? false,
      isInternal,
      timestamp: data.timestamp || new Date().toISOString(),
      ip,
      country: geo.countryCode,
      city: geo.city,
      region: geo.region,
      postal: geo.postal,
      loc: geo.loc,
      timezone: geo.timezone,
      org: geo.org,
      hostname: geo.hostname,
    };

    await adminDb.collection("pageViews").add(record);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Analytics] Track error:", err);
    return NextResponse.json({ ok: true });
  }
}
