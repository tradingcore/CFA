"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import {
  getIsoWeekKey,
  getRecentWeeklySnapshots,
  saveWeeklySnapshot,
  WeeklySnapshotDoc,
  WeeklySnapshotTopic,
} from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, CalendarRange, Trophy } from "lucide-react";
import Link from "next/link";
import { HintBlock, InfoHint } from "@/components/ui/info-hint";

interface MoverRow {
  topicId: string;
  shortName: string;
  delta: number;
  current: number;
  previous: number;
}

export function WeeklySnapshot() {
  const { user } = useAuth();
  const { level } = useLevel();
  const { readiness, loading } = useLevelReadiness();
  const [snapshots, setSnapshots] = useState<WeeklySnapshotDoc[]>([]);
  const [persisting, setPersisting] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getRecentWeeklySnapshots(user.uid, level, 4)
      .then((list) => {
        if (!cancelled) setSnapshots(list);
      })
      .catch((err) => console.error("Weekly snapshots load failed", err));
    return () => {
      cancelled = true;
    };
  }, [user, level]);

  useEffect(() => {
    if (!user) return;
    if (loading) return;
    if (readiness.totalSampleSize === 0) return;
    const weekKey = getIsoWeekKey();
    if (snapshots.some((snapshot) => snapshot.weekKey === weekKey)) return;
    if (persisting) return;
    setPersisting(true);
    const topicsForSnapshot: WeeklySnapshotTopic[] = readiness.byTopic.map((topic) => ({
      topicId: topic.topicId,
      shortName: topic.shortName,
      accuracy: topic.accuracy,
      sampleSize: topic.sampleSize,
      weight: topic.weight,
    }));
    saveWeeklySnapshot(user.uid, level, {
      weekKey,
      level,
      createdAt: new Date().toISOString(),
      readinessPct: readiness.readinessPct,
      totalSampleSize: readiness.totalSampleSize,
      evidenceCoverage: readiness.evidenceCoverage,
      topics: topicsForSnapshot,
    })
      .then(() => getRecentWeeklySnapshots(user.uid, level, 4))
      .then(setSnapshots)
      .catch((err) => console.error("Failed to persist weekly snapshot", err))
      .finally(() => setPersisting(false));
  }, [user, level, readiness, loading, snapshots, persisting]);

  const current = snapshots[0];
  const previous = snapshots[1];
  const readinessDelta = current && previous ? current.readinessPct - previous.readinessPct : 0;

  const movers: MoverRow[] = previous && current
    ? current.topics
        .map((topic) => {
          const prev = previous.topics.find((p) => p.topicId === topic.topicId);
          if (!prev || prev.sampleSize === 0 || topic.sampleSize === 0) return null;
          const delta = (topic.accuracy - prev.accuracy) * 100;
          return {
            topicId: topic.topicId,
            shortName: topic.shortName,
            delta,
            current: Math.round(topic.accuracy * 100),
            previous: Math.round(prev.accuracy * 100),
          };
        })
        .filter((row): row is MoverRow => Boolean(row))
    : [];

  const upMovers = [...movers].sort((a, b) => b.delta - a.delta).slice(0, 3);
  const downMovers = [...movers].sort((a, b) => a.delta - b.delta).slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarRange className="h-4 w-4 text-primary" />
          This week
          <InfoHint
            content={
              <>
                <HintBlock>
                  Where you stand now vs. last week, plus topics that improved or slipped.
                </HintBlock>
                <HintBlock title="Reading the delta">
                  +3 to +5 pts healthy · 0 pts flat (only reading) · negative usually means a
                  recent mock surfaced gaps (good — you now know what to fix)
                </HintBlock>
              </>
            }
          />
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Compare your readiness with last week and see which topics improved and which need attention.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-xl border border-border bg-card/40 p-3">
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Readiness</p>
              <InfoHint
                content={
                  <>
                    <HintBlock>Estimate of how the real exam would go for you today, 0%–100%.</HintBlock>
                    <HintBlock title="Reference">
                      ≥80% comfortable · 65–75% pass zone · &lt;50% far from ready
                    </HintBlock>
                    <HintBlock title="Note">
                      Only counts topics you have practiced. Check Coverage on the Readiness card
                      to know if it represents you.
                    </HintBlock>
                  </>
                }
              />
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {readiness.readinessPct}%
            </p>
          </div>
          <Badge
            variant={readinessDelta >= 0 ? "default" : "destructive"}
            className="gap-1 text-xs"
            title={previous ? `Compared to last week: ${previous.readinessPct}%` : "No previous snapshot yet"}
          >
            {readinessDelta >= 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {readinessDelta >= 0 ? "+" : ""}
            {readinessDelta.toFixed(0)} pts
          </Badge>
        </div>

        {previous ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-emerald-500">Top improvements</p>
              {upMovers.length === 0 || upMovers[0].delta <= 0 ? (
                <p className="text-xs text-muted-foreground">No clear gains yet — keep practicing.</p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {upMovers
                    .filter((mover) => mover.delta > 0)
                    .map((mover) => (
                      <li key={mover.topicId} className="flex items-center justify-between rounded-md border border-emerald-500/30 px-2 py-1 text-xs">
                        <span>{mover.shortName}</span>
                        <span className="font-mono text-emerald-500">+{mover.delta.toFixed(0)} pts ({mover.previous}% → {mover.current}%)</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-rose-500">Needs review</p>
              {downMovers.length === 0 || downMovers[0].delta >= 0 ? (
                <p className="text-xs text-muted-foreground">Nothing trending down. Nice job.</p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {downMovers
                    .filter((mover) => mover.delta < 0)
                    .map((mover) => (
                      <li key={mover.topicId} className="flex items-center justify-between rounded-md border border-rose-500/30 px-2 py-1 text-xs">
                        <span>{mover.shortName}</span>
                        <span className="font-mono text-rose-500">{mover.delta.toFixed(0)} pts ({mover.previous}% → {mover.current}%)</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
            We will show diffs vs. last week as soon as we have a previous snapshot.
          </p>
        )}

        <Link
          href="/simulado?official=true"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          <Trophy className="h-3 w-3" /> Start this week's mock
        </Link>
      </CardContent>
    </Card>
  );
}
