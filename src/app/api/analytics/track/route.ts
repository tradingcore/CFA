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
  isNewVisitor: boolean;
  isInternal?: boolean;
  timestamp: string;
}

interface GeoData {
  countryCode: string;
  countryName: string;
  continent: string;
  continentCode: string;
  asn: string;
  asName: string;
}

const EMPTY_GEO: GeoData = {
  countryCode: "unknown",
  countryName: "",
  continent: "",
  continentCode: "",
  asn: "",
  asName: "",
};

/**
 * getGeoFromIP
 * Resolves geolocation and ASN info for a visitor IP using the IPinfo Lite API.
 *
 * @param ip - Caller IP (typically from `x-forwarded-for` / `x-real-ip`).
 * @returns Geo info (country, continent, ASN). Returns sentinel values when the IP
 * cannot be resolved (local IP, missing token, network error, non-200 response).
 *
 * Notes:
 * - Uses Bearer auth with `IPINFO_TOKEN` env var.
 * - Falls back gracefully to keep the tracking endpoint resilient.
 * - 2s timeout to avoid blocking the request path.
 */
async function getGeoFromIP(ip: string): Promise<GeoData> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") {
    return { ...EMPTY_GEO, countryCode: "local" };
  }

  const token = process.env.IPINFO_TOKEN;
  if (!token) return EMPTY_GEO;

  try {
    const res = await fetch(`https://api.ipinfo.io/lite/${encodeURIComponent(ip)}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return EMPTY_GEO;

    const d = (await res.json()) as {
      country_code?: string;
      country?: string;
      continent?: string;
      continent_code?: string;
      asn?: string;
      as_name?: string;
    };

    return {
      countryCode: d.country_code || "unknown",
      countryName: d.country || "",
      continent: d.continent || "",
      continentCode: d.continent_code || "",
      asn: d.asn || "",
      asName: d.as_name || "",
    };
  } catch {
    return EMPTY_GEO;
  }
}

/**
 * POST /api/analytics/track
 * Records a page view from any visitor (anonymous or logged in).
 *
 * Request body: see `PageViewData`.
 *
 * Behavior:
 * - Enriches the record with geo info (country, continent, ASN) via IPinfo Lite API.
 * - Determines `isInternal` from the request flag OR from a server-side admin
 *   email check (defense in depth).
 * - Always returns `{ ok: true }`; failures are logged but never break tracking.
 */
export async function POST(req: NextRequest) {
  try {
    const data: PageViewData = await req.json();

    if (!data.path || !data.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "";
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
      isNewVisitor: data.isNewVisitor ?? false,
      isInternal,
      timestamp: data.timestamp || new Date().toISOString(),
      country: geo.countryCode,
      countryName: geo.countryName,
      continent: geo.continent,
      continentCode: geo.continentCode,
      asn: geo.asn,
      asName: geo.asName,
    };

    await adminDb.collection("pageViews").add(record);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Analytics] Track error:", err);
    return NextResponse.json({ ok: true });
  }
}
