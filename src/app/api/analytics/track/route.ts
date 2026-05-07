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

/**
 * POST /api/analytics/track
 * Records a page view from any visitor (anonymous or logged in).
 * No auth required - accepts any request.
 */
export async function POST(req: NextRequest) {
  try {
    const data: PageViewData = await req.json();

    if (!data.path || !data.sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

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
    };

    await adminDb.collection("pageViews").add(record);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Analytics] Track error:", err);
    return NextResponse.json({ ok: true });
  }
}
