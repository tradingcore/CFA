"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CFALevel } from "@/lib/cfa-topics";

interface LevelContextType {
  level: CFALevel;
  setLevel: (level: CFALevel) => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

/**
 * Provider that manages the currently selected CFA level across the app.
 * @param children - React children to wrap
 * @returns Context provider component
 */
export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<CFALevel>("I");

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
}

/**
 * Hook to access the current CFA level and setter.
 * @returns { level, setLevel } from context
 * @throws Error if used outside of LevelProvider
 */
export function useLevel() {
  const context = useContext(LevelContext);
  if (!context) throw new Error("useLevel must be used within LevelProvider");
  return context;
}
