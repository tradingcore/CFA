"use client";

import { useState, useEffect } from "react";
import { getActiveUsers } from "@/lib/active-users";

export function ActiveUsersBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(getActiveUsers());
    const interval = setInterval(() => setCount(getActiveUsers()), 30000);
    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {count} studying now
    </div>
  );
}
