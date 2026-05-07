"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { getAllUsers, getAllFeedbacks, getQuizHistory, UserProfile, Feedback } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Star, CreditCard, Activity, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";

const ADMIN_EMAILS = ["danielzf1818@gmail.com", "fleischmann606@gmail.com"];

type UserWithUid = UserProfile & { uid: string };

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserWithUid[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "feedbacks" | "users">("overview");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (user && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([getAllUsers(), getAllFeedbacks(100)])
      .then(([u, f]) => { setUsers(u); setFeedbacks(f); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAdmin) return null;

  const today = new Date().toISOString().split("T")[0];
  const activeToday = users.filter((u) => u.lastStudyDate === today).length;
  const subscribers = users.filter((u) => u.subscriptionStatus === "active" || u.subscriptionStatus === "trialing").length;
  const freeUsers = users.length - subscribers;
  const avgRating = feedbacks.length > 0 ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "—";
  const totalChatToday = users.reduce((s, u) => s + (u.freeUsage?.date === today ? (u.freeUsage?.chatMessages ?? 0) : 0), 0);
  const totalQuizToday = users.reduce((s, u) => s + (u.freeUsage?.date === today ? (u.freeUsage?.quizQuestions ?? 0) : 0), 0);

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-blue-500" },
    { label: "Active Today", value: activeToday, icon: Activity, color: "text-emerald-500" },
    { label: "Subscribers", value: subscribers, icon: CreditCard, color: "text-violet-500" },
    { label: "Free Users", value: freeUsers, icon: Users, color: "text-amber-500" },
    { label: "Feedbacks", value: feedbacks.length, icon: MessageCircle, color: "text-rose-500" },
    { label: "Avg Rating", value: avgRating, icon: Star, color: "text-amber-400" },
    { label: "Chat Today", value: totalChatToday, icon: MessageCircle, color: "text-blue-400" },
    { label: "Quiz Today", value: totalQuizToday, icon: Activity, color: "text-emerald-400" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor users, feedbacks, and platform usage.</p>
        </div>
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to app
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border p-0.5 w-fit">
        {(["overview", "feedbacks", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-12">Loading...</p>
      ) : (
        <>
          {/* Overview */}
          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
