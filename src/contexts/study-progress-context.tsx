"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getTopicsForLevel, CFALevel } from "@/lib/cfa-topics";

interface LOSEntry {
  studied: boolean;
  date: string;
}

interface StudyProgressState {
  [losKey: string]: LOSEntry;
}

interface StudyProgressContextType {
  toggleLOS: (moduleId: string, losIndex: number) => void;
  isLOSStudied: (moduleId: string, losIndex: number) => boolean;
  getLOSDate: (moduleId: string, losIndex: number) => string | null;
  getModuleProgress: (moduleId: string, totalLOS: number) => { studied: number; total: number };
  getTopicProgress: (topicId: string, level: CFALevel) => { studied: number; total: number };
}

const STORAGE_KEY = "cfa-study-progress";

function loadState(): StudyProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: StudyProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function losKey(moduleId: string, losIndex: number): string {
  return `${moduleId}:${losIndex}`;
}

const StudyProgressContext = createContext<StudyProgressContextType | undefined>(undefined);

/**
 * Provider that persists LOS study progress in localStorage.
 * Each LOS is identified by moduleId:losIndex and stores studied flag + date.
 * @param children - React children
 * @returns Study progress context provider
 */
export function StudyProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyProgressState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveState(state);
  }, [state, mounted]);

  const toggleLOS = useCallback((moduleId: string, losIndex: number) => {
    setState((prev) => {
      const key = losKey(moduleId, losIndex);
      const existing = prev[key];
      if (existing?.studied) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return {
        ...prev,
        [key]: { studied: true, date: new Date().toISOString().split("T")[0] },
      };
    });
  }, []);

  const isLOSStudied = useCallback(
    (moduleId: string, losIndex: number) => {
      return state[losKey(moduleId, losIndex)]?.studied ?? false;
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
        if (state[losKey(moduleId, i)]?.studied) studied++;
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
          if (state[losKey(mod.id, i)]?.studied) studied++;
        }
      }
      return { studied, total };
    },
    [state]
  );

  return (
    <StudyProgressContext.Provider
      value={{ toggleLOS, isLOSStudied, getLOSDate, getModuleProgress, getTopicProgress }}
    >
      {children}
    </StudyProgressContext.Provider>
  );
}

/**
 * Hook to access study progress tracking functions.
 * @returns Study progress context
 * @throws Error if used outside StudyProgressProvider
 */
export function useStudyProgress() {
  const ctx = useContext(StudyProgressContext);
  if (!ctx) throw new Error("useStudyProgress must be used within StudyProgressProvider");
  return ctx;
}
