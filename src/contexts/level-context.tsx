"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CFALevel } from "@/lib/cfa-topics";
import { useAuth } from "@/contexts/auth-context";
import { updateUserProfile } from "@/lib/firestore";

interface LevelContextType {
  level: CFALevel;
  setLevel: (level: CFALevel) => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();
  const [level, setLevelState] = useState<CFALevel>("I");

  useEffect(() => {
    if (profile?.cfaLevel) {
      setLevelState(profile.cfaLevel);
    }
  }, [profile?.cfaLevel]);

  const setLevel = (newLevel: CFALevel) => {
    setLevelState(newLevel);
    if (user) {
      updateUserProfile(user.uid, { cfaLevel: newLevel }).catch(console.error);
    }
  };

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const context = useContext(LevelContext);
  if (!context) throw new Error("useLevel must be used within LevelProvider");
  return context;
}
