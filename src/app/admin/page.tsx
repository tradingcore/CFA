"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { getAllUsers, getAllFeedbacks, UserProfile, Feedback } from "@/lib/firestore";
import { ADMIN_EMAILS } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, MessageCircle, Star, CreditCard, Activity,
  ChevronDown, ChevronRight, ArrowLeft, Eye, Globe,
  Smartphone, Monitor, Tablet, BarChart3, TrendingUp,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

type UserWithUid = UserProfile & { uid: string };

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  uniqueToday: number;
  newToday: number;
  uniqueTotal: number;
  topPages: { path: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  topCountries: { country: string; count: number }[];
  topVisitors: {
    email: string;
    displayName: string | null;
    photoURL: string | null;
    provider: string | null;
    views: number;
    lastSeen: string;
    lastPath: string;
    lastCountry: string;
    lastCity: string;
  }[];
  deviceCounts: Record<string, number>;
  dailyChart: { date: string; views: number }[];
  loggedIn: number;
  anonymous: number;
  internalCount: number;
  includedInternal: boolean;
  recentViews: {
    path: string;
    referrer: string;
    device: string;
    sessionId: string;
    userId: string | null;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    provider?: string | null;
    timestamp: string;
    language: string;
    ip?: string;
    country?: string;
    city?: string;
    region?: string;
    org?: string;
    timezone?: string;
    isInternal?: boolean;
  }[];
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserWithUid[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "analytics" | "feedbacks" | "users">("overview");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [analyticsDays, setAnalyticsDays] = useState(7);
  const [includeInternal, setIncludeInternal] = useState(false);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (user && !isAdmin) router.replace("/dashboard");
  }, [user, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([getAllUsers(), getAllFeedbacks(100)])
      .then(([u, f]) => { setUsers(u); setFeedbacks(f); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin || tab !== "analytics") return;
    const params = new URLSearchParams({
      days: String(analyticsDays),
      includeInternal: includeInternal ? "1" : "0",
    });
    fetch(`/api/analytics/summary?${params.toString()}`)
      .then((r) => r.json())
      .then(setAnalytics)
      .catch(console.error);
  }, [isAdmin, tab, analyticsDays, includeInternal]);

  if (!isAdmin) return null;

  const today = new Date().toISOString().split("T")[0];
  const activeToday = users.filter((u) => u.lastStudyDate === today).length;
  const subscribers = users.filter((u) => u.subscriptionStatus === "active" || u.subscriptionStatus === "trialing").length;
  const freeUsers = users.length - subscribers;
  const avgRating = feedbacks.length > 0 ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "—";

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-blue-500" },
    { label: "Active Today", value: activeToday, icon: Activity, color: "text-emerald-500" },
    { label: "Subscribers", value: subscribers, icon: CreditCard, color: "text-violet-500" },
    { label: "Free Users", value: freeUsers, icon: Users, color: "text-amber-500" },
    { label: "Feedbacks", value: feedbacks.length, icon: MessageCircle, color: "text-rose-500" },
    { label: "Avg Rating", value: avgRating, icon: Star, color: "text-amber-400" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor users, analytics, feedbacks, and platform usage.</p>
        </div>
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to app
        </button>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border p-0.5 w-fit">
        {(["overview", "analytics", "feedbacks", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading && tab !== "analytics" ? (
        <p className="text-center text-muted-foreground py-12">Loading...</p>
      ) : (
        <>
          {/* Overview */}
          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <Card key={s.label}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Analytics */}
          {tab === "analytics" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {[7, 14, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setAnalyticsDays(d)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        analyticsDays === d ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {d} days
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIncludeInternal((v) => !v)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    includeInternal
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  title="Toggle to include or exclude views from admin sessions"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${includeInternal ? "bg-amber-400" : "bg-muted-foreground/50"}`}
                  />
                  {includeInternal ? "Including admin views" : "Excluding admin views"}
                  {analytics && analytics.internalCount > 0 && (
                    <span className="rounded bg-background/40 px-1.5 py-0.5 text-[10px] tabular-nums">
                      {analytics.internalCount}
                    </span>
                  )}
                </button>
              </div>

              {!analytics ? (
                <p className="text-center text-muted-foreground py-12">Loading analytics...</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <Eye className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-2xl font-bold">{analytics.todayViews}</p>
                          <p className="text-xs text-muted-foreground">Views Today</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <Users className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="text-2xl font-bold">{analytics.uniqueToday}</p>
                          <p className="text-xs text-muted-foreground">Unique Today</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <TrendingUp className="h-5 w-5 text-violet-500" />
                        <div>
                          <p className="text-2xl font-bold">{analytics.newToday}</p>
                          <p className="text-xs text-muted-foreground">New Visitors Today</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="flex items-center gap-3 p-4">
                        <BarChart3 className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="text-2xl font-bold">{analytics.totalViews}</p>
                          <p className="text-xs text-muted-foreground">Total ({analyticsDays}d)</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Traffic chart */}
                  <Card>
                    <CardHeader><CardTitle className="text-base">Traffic ({analyticsDays} days)</CardTitle></CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={analytics.dailyChart}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "rgba(148,163,184,0.8)" }} />
                          <YAxis tick={{ fontSize: 10, fill: "rgba(148,163,184,0.8)" }} />
                          <Tooltip contentStyle={{ backgroundColor: "rgba(15,23,42,0.95)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 8, fontSize: 12 }} />
                          <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Top pages */}
                    <Card>
                      <CardHeader><CardTitle className="text-sm">Top Pages</CardTitle></CardHeader>
                      <CardContent className="flex flex-col gap-1">
                        {analytics.topPages.map((p) => (
                          <div key={p.path} className="flex items-center justify-between rounded px-2 py-1.5 text-xs hover:bg-accent/50">
                            <span className="font-mono truncate">{p.path}</span>
                            <span className="font-bold tabular-nums">{p.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Referrers */}
                    <Card>
                      <CardHeader><CardTitle className="text-sm">Top Referrers</CardTitle></CardHeader>
                      <CardContent className="flex flex-col gap-1">
                        {analytics.topReferrers.map((r) => (
                          <div key={r.source} className="flex items-center justify-between rounded px-2 py-1.5 text-xs hover:bg-accent/50">
                            <div className="flex items-center gap-1.5">
                              <Globe className="h-3 w-3 text-muted-foreground" />
                              <span className="truncate">{r.source}</span>
                            </div>
                            <span className="font-bold tabular-nums">{r.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Countries */}
                    <Card>
                      <CardHeader><CardTitle className="text-sm">Top Countries</CardTitle></CardHeader>
                      <CardContent className="flex flex-col gap-1">
                        {analytics.topCountries.map((c) => {
                          const isUnknown = c.country === "unknown" || c.country === "local";
                          const display = isUnknown
                            ? c.country === "local" ? "Local" : "Unknown"
                            : c.country;
                          return (
                            <div key={c.country} className="flex items-center justify-between rounded px-2 py-1.5 text-xs hover:bg-accent/50">
                              <div className="flex min-w-0 items-center gap-2">
                                {!isUnknown && (
                                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] uppercase">
                                    {c.country}
                                  </span>
                                )}
                                <span className="truncate font-medium">{display}</span>
                              </div>
                              <span className="font-bold tabular-nums">{c.count}</span>
                            </div>
                          );
                        })}
                        {analytics.topCountries.length === 0 && (
                          <p className="text-xs text-muted-foreground py-2">No data yet</p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Devices */}
                    <Card>
                      <CardHeader><CardTitle className="text-sm">Devices</CardTitle></CardHeader>
                      <CardContent className="flex flex-col gap-3">
                        {[
                          { key: "desktop", label: "Desktop", icon: Monitor, color: "text-blue-500" },
                          { key: "mobile", label: "Mobile", icon: Smartphone, color: "text-emerald-500" },
                          { key: "tablet", label: "Tablet", icon: Tablet, color: "text-amber-500" },
                        ].map((d) => {
                          const count = analytics.deviceCounts[d.key] || 0;
                          const pct = analytics.totalViews > 0 ? Math.round((count / analytics.totalViews) * 100) : 0;
                          return (
                            <div key={d.key} className="flex items-center gap-3">
                              <d.icon className={`h-4 w-4 ${d.color}`} />
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span>{d.label}</span>
                                  <span className="font-mono font-bold">{count} ({pct}%)</span>
                                </div>
                                <div className="mt-1 h-1.5 rounded-full bg-muted">
                                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>Logged in: {analytics.loggedIn}</span>
                          <span>Anonymous: {analytics.anonymous}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Visitors (logged in) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Top Logged Visitors ({analytics.topVisitors.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {analytics.topVisitors.length === 0 ? (
                        <p className="py-6 text-center text-xs text-muted-foreground">
                          No logged visitors yet in this window.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {analytics.topVisitors.map((v) => {
                            const initials = (v.displayName || v.email)
                              .split(/[\s@.]+/)
                              .map((s) => s[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase();
                            return (
                              <div
                                key={v.email}
                                className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs hover:bg-accent/40"
                              >
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
                                  {v.photoURL ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={v.photoURL}
                                      alt={v.email}
                                      className="h-full w-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-muted-foreground">
                                      {initials || "?"}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="truncate font-medium">
                                      {v.displayName || v.email.split("@")[0]}
                                    </span>
                                    {v.provider === "google.com" && (
                                      <Badge variant="outline" className="text-[9px]">Google</Badge>
                                    )}
                                    {v.provider === "password" && (
                                      <Badge variant="outline" className="text-[9px]">Email</Badge>
                                    )}
                                  </div>
                                  <div className="truncate text-[10px] text-muted-foreground">
                                    {v.email}
                                  </div>
                                </div>
                                <div className="hidden min-w-0 flex-1 text-[10px] text-muted-foreground sm:block">
                                  <div className="truncate">
                                    {[v.lastCity, v.lastCountry].filter(Boolean).join(", ") || "—"}
                                  </div>
                                  <div className="truncate font-mono">{v.lastPath}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold tabular-nums">{v.views}</div>
                                  <div className="text-[10px] text-muted-foreground">
                                    {new Date(v.lastSeen).toLocaleString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent views table */}
                  <Card>
                    <CardHeader><CardTitle className="text-base">Recent Visits ({analytics.recentViews.length})</CardTitle></CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-12 gap-2 border-b border-border px-2 py-2 text-[10px] font-semibold uppercase text-muted-foreground min-w-[1000px]">
                          <span>Time</span>
                          <span className="col-span-2">Page</span>
                          <span className="col-span-3">Visitor</span>
                          <span className="col-span-2">Location</span>
                          <span className="col-span-2">IP / Org</span>
                          <span>Device</span>
                          <span>Status</span>
                        </div>
                        {analytics.recentViews.slice(0, 30).map((v, i) => {
                          const countryDisplay = v.country === "local"
                            ? "Local"
                            : v.country === "unknown" || !v.country
                              ? "—"
                              : v.country;
                          const cityRegion = [v.city, v.region].filter(Boolean).join(", ");
                          const initials = ((v.displayName || v.email || "?")
                            .split(/[\s@.]+/)
                            .map((s) => s[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()) || "?";
                          return (
                            <div
                              key={i}
                              className={`grid grid-cols-12 gap-2 items-center px-2 py-1.5 text-xs min-w-[1000px] ${
                                v.isInternal ? "bg-amber-500/5" : "hover:bg-accent/30"
                              }`}
                            >
                              <span className="text-muted-foreground" title={new Date(v.timestamp).toLocaleString()}>
                                {new Date(v.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              <span className="col-span-2 font-mono truncate" title={v.path}>{v.path}</span>
                              <div className="col-span-3 flex min-w-0 items-center gap-2">
                                {v.userId ? (
                                  <>
                                    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted">
                                      {v.photoURL ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                          src={v.photoURL}
                                          alt={v.email || ""}
                                          className="h-full w-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      ) : (
                                        <span className="flex h-full w-full items-center justify-center text-[9px] font-bold text-muted-foreground">
                                          {initials}
                                        </span>
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-[11px] font-medium" title={v.displayName || ""}>
                                        {v.displayName || v.email?.split("@")[0]}
                                      </div>
                                      <div className="truncate text-[10px] text-muted-foreground" title={v.email || ""}>
                                        {v.email}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <span className="text-[10px] text-muted-foreground italic">anonymous</span>
                                )}
                              </div>
                              <div className="col-span-2 min-w-0" title={v.timezone || ""}>
                                <div className="truncate font-medium">
                                  {cityRegion || countryDisplay}
                                </div>
                                {cityRegion && (
                                  <div className="truncate text-[10px] text-muted-foreground">
                                    {countryDisplay}
                                  </div>
                                )}
                              </div>
                              <div className="col-span-2 min-w-0">
                                <div className="truncate font-mono text-[10px]">{v.ip || "—"}</div>
                                <div className="truncate text-[10px] text-muted-foreground" title={v.org || ""}>
                                  {v.org || "—"}
                                </div>
                              </div>
                              <span className="capitalize">{v.device}</span>
                              <span>
                                {v.isInternal ? (
                                  <Badge className="bg-amber-500/20 text-amber-300 text-[9px] border-amber-500/30">Admin</Badge>
                                ) : v.userId ? (
                                  <Badge variant="default" className="text-[9px]">Logged</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[9px]">Anon</Badge>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          {/* Feedbacks */}
          {tab === "feedbacks" && (
            <Card>
              <CardHeader><CardTitle className="text-base">Recent Feedbacks ({feedbacks.length})</CardTitle></CardHeader>
              <CardContent>
                {feedbacks.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No feedbacks yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {feedbacks.map((f) => (
                      <div key={f.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= f.rating ? "text-amber-400" : "text-muted-foreground/20"}`} fill={s <= f.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{f.email}</span>
                            <Badge variant="outline" className="text-[9px]">{f.source}</Badge>
                          </div>
                          {f.comment && <p className="mt-1 text-xs text-muted-foreground">{f.comment}</p>}
                        </div>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {new Date(f.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Users */}
          {tab === "users" && (
            <Card>
              <CardHeader><CardTitle className="text-base">All Users ({users.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-7 gap-2 border-b border-border px-3 py-2 text-[10px] font-semibold uppercase text-muted-foreground">
                    <span className="col-span-2">Email</span>
                    <span>Level</span>
                    <span>Status</span>
                    <span>Streak</span>
                    <span>Last Active</span>
                    <span>Today</span>
                  </div>
                  {users
                    .sort((a, b) => (b.lastStudyDate || "").localeCompare(a.lastStudyDate || ""))
                    .map((u) => {
                      const isExpanded = expandedUser === u.uid;
                      const status = u.subscriptionStatus === "active" ? "Pro" : u.subscriptionStatus === "trialing" ? "Trial" : "Free";
                      const todayUsage = u.freeUsage?.date === today
                        ? `${u.freeUsage.chatMessages ?? 0}c ${u.freeUsage.quizQuestions ?? 0}q`
                        : "—";

                      return (
                        <div key={u.uid}>
                          <button
                            onClick={() => setExpandedUser(isExpanded ? null : u.uid)}
                            className="grid w-full grid-cols-7 gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-accent/50"
                          >
                            <span className="col-span-2 truncate font-medium">{u.email}</span>
                            <span>L{u.cfaLevel}</span>
                            <Badge variant={status === "Pro" ? "default" : status === "Trial" ? "secondary" : "outline"} className="w-fit text-[9px]">
                              {status}
                            </Badge>
                            <span className="font-mono">{u.studyStreak ?? 0}d</span>
                            <span className="text-muted-foreground">{u.lastStudyDate || "never"}</span>
                            <span className="font-mono">{todayUsage}</span>
                          </button>
                          {isExpanded && (
                            <div className="mb-2 ml-6 rounded-lg border border-border bg-muted/30 p-3 text-xs">
                              <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-muted-foreground">UID:</span> {u.uid}</div>
                                <div><span className="text-muted-foreground">Exam date:</span> {u.examDate || "—"}</div>
                                <div><span className="text-muted-foreground">Weekly hours:</span> {u.weeklyHoursGoal}h</div>
                                <div><span className="text-muted-foreground">Onboarding:</span> {u.onboardingCompleted ? "Done" : "Pending"}</div>
                                <div><span className="text-muted-foreground">Notes:</span> {u.notes ? u.notes.slice(0, 100) : "—"}</div>
                                <div><span className="text-muted-foreground">Created:</span> {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
