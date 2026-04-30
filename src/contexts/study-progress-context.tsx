"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getTopicsForLevel, CFALevel } from "@/lib/cfa-topics";
import { useAuth } from "@/contexts/auth-context";
import { getStudyProgress, saveStudyProgress, StudyProgressData } from "@/lib/firestore";

interface StudyProgressContextType {
  toggleLOS: (moduleId: string, losIndex: number) => void;
  markLOSStudied: (losKeys: string[]) => void;
  isLOSStudied: (moduleId: string, losIndex: number) => boolean;
  getLOSDate: (moduleId: string, losIndex: number) => string | null;
  getModuleProgress: (moduleId: string, totalLOS: number) => { studied: number; total: number };
  getTopicProgress: (topicId: string, level: CFALevel) => { studied: number; total: number };
}

function losKey(moduleId: string, losIndex: number): string {
  return `${moduleId}:${losIndex}`;
}

const StudyProgressContext = createContext<StudyProgressContextType | undefined>(undefined);

export function StudyProgressProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();
  const [state, setState] = useState<StudyProgressData>({});
  const [loaded, setLoaded] = useState(false);

  const loadProgress = useCallback(() => {
    if (!user || !profile) {
      setState({});
      setLoaded(false);
      return;
    }
    getStudyProgress(user.uid, profile.cfaLevel)
      .then((data) => {
        setState(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load study progress:", err);
        setState({});
        setLoaded(true);
      });
  }, [user, profile?.cfaLevel]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const persistState = useCallback(
    (newState: StudyProgressData) => {
      if (!user || !profile) return;
      saveStudyProgress(user.uid, profile.cfaLevel, newState).catch(console.error);
    },
    [user, profile]
  );

  const toggleLOS = useCallback(
    (moduleId: string, losIndex: number) => {
      setState((prev) => {
        const key = losKey(moduleId, losIndex);
        const existing = prev[key];
        let next: StudyProgressData;

        if (existing) {
          next = { ...prev };
          delete next[key];
        } else {
          next = {
            ...prev,
            [key]: { date: new Date().toISOString().split("T")[0] },
          };
        }

        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const markLOSStudied = useCallback(
    (losKeys: string[]) => {
      setState((prev) => {
        const today = new Date().toISOString().split("T")[0];
        const additions: StudyProgressData = {};
        for (const key of losKeys) {
          if (!prev[key]) {
            additions[key] = { date: today };
          }
        }
        if (Object.keys(additions).length === 0) return prev;
        const next = { ...prev, ...additions };
        persistState(next);
        return next;
      });
    },
    [persistState]
  );

  const isLOSStudied = useCallback(
    (moduleId: string, losIndex: number) => {
      return !!state[losKey(moduleId, losIndex)];
    },
    [state]
  );

  const getLOSDate = useCallback(
    (moduleId: string, losIndex: number) => {
      return state[losKey(moduleId, losIndex)]?.date ?? null;
    },
    [state]
  );

  const getModuleProgress = useCallback(
    (moduleId: string, totalLOS: number) => {
      let studied = 0;
      for (let i = 0; i < totalLOS; i++) {
        if (state[losKey(moduleId, i)]) studied++;
      }
      return { studied, total: totalLOS };
    },
    [state]
  );

  const getTopicProgress = useCallback(
    (topicId: string, level: CFALevel) => {
      const topics = getTopicsForLevel(level);
      const topic = topics.find((t) => t.id === topicId);
      if (!topic) return { studied: 0, total: 0 };
      let studied = 0;
      let total = 0;
      for (const mod of topic.modules) {
        total += mod.los.length;
        for (let i = 0; i < mod.los.length; i++) {
          if (state[losKey(mod.id, i)]) studied++;
        }
      }
      return { studied, total };
    },
    [state]
  );

  return (
    <StudyProgressContext.Provider
      value={{ toggleLOS, markLOSStudied, isLOSStudied, getLOSDate, getModuleProgress, getTopicProgress }}
    >
      {children}
    </StudyProgressContext.Provider>
  );
}

export function useStudyProgress() {
  const ctx = useContext(StudyProgressContext);
  if (!ctx) throw new Error("useStudyProgress must be used within StudyProgressProvider");
  return ctx;
}
