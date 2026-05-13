import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

interface ViewRow {
  path: string;
  referrer: string;
  device: string;
  language: string;
  sessionId: string;
  userId: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string | null;
  isNewVisitor: boolean;
  isInternal: boolean;
  timestamp: string;
  userAgent: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  postal: string;
  loc: string;
  timezone: string;
  org: string;
  hostname: string;
}

interface VisitorAgg {
  email: string;
  displayName: string | null;
  photoURL: string | null;
  provider: string | null;
  views: number;
  lastSeen: string;
  lastPath: string;
  lastCountry: string;
  lastCity: string;
}

/**
 * GET /api/analytics/summary
 * Returns aggregated analytics data for the admin dashboard.
 *
 * Query params:
 *   ?days=7              Number of days to include (default 7).
 *   ?includeInternal=1   Include views flagged as internal/admin (default 0 = excluded).
 *
 * Output highlights:
 * - `topCountries` aggregated by country code with name.
 * - `topVisitors` aggregated by logged-in email with avatar/name/last seen info.
 * - `recentViews` last 50 raw events with full PII for the admin (IP, email, etc.).
 *
 * The `pageViews` collection contains PII; this endpoint must be gated by
 * admin-only access on the client (see `src/app/admin/page.tsx`).
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "7", 10);
    const includeInternal = url.searchParams.get("includeInternal") === "1";
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString();

    const snapshot = await adminDb
      .collection("pageViews")
      .where("timestamp", ">=", cutoffStr)
      .orderBy("timestamp", "desc")
      .limit(5000)
      .get();

    const allViews: ViewRow[] = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        path: d.path || "/",
        referrer: d.referrer || "",
        device: d.device || "desktop",
        language: d.language || "",
        sessionId: d.sessionId || "",
        userId: d.userId || null,
        email: d.email || null,
        displayName: d.displayName || null,
        photoURL: d.photoURL || null,
        provider: d.provider || null,
        isNewVisitor: d.isNewVisitor || false,
        isInternal: d.isInternal === true,
        timestamp: d.timestamp || "",
        userAgent: (d.userAgent || "").slice(0, 100),
        ip: d.ip || "",
        country: d.country || "unknown",
        city: d.city || "",
        region: d.region || "",
        postal: d.postal || "",
        loc: d.loc || "",
        timezone: d.timezone || "",
        org: d.org || "",
        hostname: d.hostname || "",
      };
    });

    const views = includeInternal ? allViews : allViews.filter((v) => !v.isInternal);
    const internalCount = allViews.length - allViews.filter((v) => !v.isInternal).length;

    const today = new Date().toISOString().split("T")[0];
    const todayViews = views.filter((v) => v.timestamp.startsWith(today));
    const uniqueToday = new Set(todayViews.map((v) => v.sessionId)).size;
    const newToday = todayViews.filter((v) => v.isNewVisitor).length;
    const uniqueTotal = new Set(views.map((v) => v.sessionId)).size;

    const pathCounts: Record<string, number> = {};
    for (const v of views) pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    const referrerCounts: Record<string, number> = {};
    for (const v of views) {
      const ref = v.referrer ? new URL(v.referrer).hostname.replace("www.", "") : "direct";
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    }
    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, count]) => ({ source, count }));

    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
    for (const v of views) deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;

    const dailyCounts: Record<string, number> = {};
    for (const v of views) {
      const day = v.timestamp.split("T")[0];
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    }
    const dailyChart = Object.entries(dailyCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, views: count }));

    const loggedIn = views.filter((v) => v.userId).length;
    const anonymous = views.length - loggedIn;

    const countryAgg: Record<string, { count: number }> = {};
    for (const v of views) {
      const code = v.country || "unknown";
      if (!countryAgg[code]) countryAgg[code] = { count: 0 };
      countryAgg[code].count += 1;
    }
    const topCountries = Object.entries(countryAgg)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 15)
      .map(([code, { count }]) => ({ country: code, count }));

    const visitorAgg: Record<string, VisitorAgg> = {};
    for (const v of views) {
      if (!v.email) continue;
      const existing = visitorAgg[v.email];
      if (!existing) {
        visitorAgg[v.email] = {
          email: v.email,
          displayName: v.displayName,
          photoURL: v.photoURL,
          provider: v.provider,
          views: 1,
          lastSeen: v.timestamp,
          lastPath: v.path,
          lastCountry: v.country,
          lastCity: v.city,
        };
      } else {
        existing.views += 1;
        if (v.timestamp > existing.lastSeen) {
          existing.lastSeen = v.timestamp;
          existing.lastPath = v.path;
          existing.lastCountry = v.country;
          existing.lastCity = v.city;
          if (v.displayName) existing.displayName = v.displayName;
          if (v.photoURL) existing.photoURL = v.photoURL;
        }
      }
    }
    const topVisitors = Object.values(visitorAgg)
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);

    return NextResponse.json({
      totalViews: views.length,
      todayViews: todayViews.length,
      uniqueToday,
      newToday,
      uniqueTotal,
      topPages,
      topReferrers,
      topCountries,
      topVisitors,
      deviceCounts,
      dailyChart,
      loggedIn,
      anonymous,
      internalCount,
      includedInternal: includeInternal,
      recentViews: views.slice(0, 50),
    });
  } catch (err) {
    console.error("[Analytics] Summary error:", err);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
