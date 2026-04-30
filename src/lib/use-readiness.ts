"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import { backfillLosStats, getLosStats, updateUserProfile } from "./firestore";
import { LevelReadiness, LosStatsByLos, levelReadiness } from "./mastery";

export interface UseLevelReadinessResult {
  readiness: LevelReadiness;
  stats: LosStatsByLos;
  loading: boolean;
}

export function useLevelReadiness(): UseLevelReadinessResult {
  const { user, profile, refreshProfile } = useAuth();
  const { level } = useLevel();
  const [stats, setStats] = useState<LosStatsByLos>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setStats({});
      setLoading(false);
      return () => {};
    }
    setLoading(true);
    (async () => {
      try {
        const alreadyBuilt = Boolean(profile?.losStatsBuiltAt?.[level]);
        const initial = await getLosStats(user.uid, level);
        if (!alreadyBuilt && Object.keys(initial).length === 0) {
          await backfillLosStats(user.uid, level);
          const after = await getLosStats(user.uid, level);
          if (!cancelled) setStats(after);
        } else if (!cancelled) {
          setStats(initial);
        }
        if (!alreadyBuilt) {
          try {
            await updateUserProfile(user.uid, {
              losStatsBuiltAt: {
                ...(profile?.losStatsBuiltAt ?? {}),
                [level]: new Date().toISOString(),
              },
            });
            refreshProfile().catch(() => {});
          } catch (markErr) {
            console.error("Failed to mark losStatsBuiltAt", markErr);
          }
        }
      } catch (err) {
        console.error("useLevelReadiness load failed", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, level]);

  const readiness = useMemo<LevelReadiness>(
    () => levelReadiness(level, stats),
    [level, stats]
  );

  return { readiness, stats, loading };
}
