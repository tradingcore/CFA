import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/**
 * GET /api/analytics/summary
 * Returns aggregated analytics data for the admin dashboard.
 *
 * Query params:
 *   ?days=7              Number of days to include (default 7).
 *   ?includeInternal=1   Include views flagged as internal/admin (default 0 = excluded).
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

    const allViews = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        path: d.path || "/",
        referrer: d.referrer || "",
        device: d.device || "desktop",
        language: d.language || "",
        sessionId: d.sessionId || "",
        userId: d.userId || null,
        isNewVisitor: d.isNewVisitor || false,
        isInternal: d.isInternal === true,
        timestamp: d.timestamp || "",
        userAgent: (d.userAgent || "").slice(0, 100),
        country: d.country || "unknown",
        countryName: d.countryName || "",
        continent: d.continent || "",
        asName: d.asName || "",
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
    for (const v of views) {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
    }
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

    const countryAgg: Record<string, { count: number; name: string }> = {};
    for (const v of views) {
      const code = v.country || "unknown";
      const name = v.countryName || code;
      if (!countryAgg[code]) countryAgg[code] = { count: 0, name };
      countryAgg[code].count += 1;
    }
    const topCountries = Object.entries(countryAgg)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 15)
      .map(([code, { count, name }]) => ({ country: code, name, count }));

    return NextResponse.json({
      totalViews: views.length,
      todayViews: todayViews.length,
      uniqueToday,
      newToday,
      uniqueTotal,
      topPages,
      topReferrers,
      topCountries,
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
