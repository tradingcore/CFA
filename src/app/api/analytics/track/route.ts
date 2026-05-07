import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export interface PageViewData {
  path: string;
  referrer: string;
  userAgent: string;
  language: string;
  screenWidth: number;
  device: "mobile" | "desktop" | "tablet";
  sessionId: string;
  userId: string | null;
  isNewVisitor: boolean;
  timestamp: string;
}

async function getCountryFromIP(ip: string): Promise<string> {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return "local";
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return data.countryCode || "unknown";
    }
  } catch {}
  return "unknown";
}

/**
 * POST /api/analytics/track
 * Records a page view from any visitor (anonymous or logged in).
 * Derives country from visitor IP via ip-api.com (free, no key needed).
 */
export async function POST(req: NextRequest) {
  try {
    const data: PageViewData = await req.json();

    if (!data.path || !data.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "";
    const country = await getCountryFromIP(ip);

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
      timestamp: data.timestamp || new Date().toISOString(),
      country,
    };

    await adminDb.collection("pageViews").add(record);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Analytics] Track error:", err);
    return NextResponse.json({ ok: true });
  }
}
