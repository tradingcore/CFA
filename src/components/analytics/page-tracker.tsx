"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

function getSessionId(): { sessionId: string; isNew: boolean } {
  const key = "tc_session_id";
  const existing = localStorage.getItem(key);
  if (existing) return { sessionId: existing, isNew: false };

  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return { sessionId: id, isNew: true };
}

function getDevice(width: number): "mobile" | "tablet" | "desktop" {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Invisible component that tracks page views on every navigation.
 * Sends data to /api/analytics/track. Runs on all pages.
 */
export function PageTracker() {
  const pathname = usePathname();
  const { user } = useAuth();
  const lastTracked = useRef("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === lastTracked.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      lastTracked.current = pathname;

      try {
        const { sessionId, isNew } = getSessionId();

        const data = {
          path: pathname,
          referrer: document.referrer || "",
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenWidth: window.innerWidth,
          device: getDevice(window.innerWidth),
          sessionId,
          userId: user?.uid || null,
          isNewVisitor: isNew,
          timestamp: new Date().toISOString(),
        };

        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      } catch {}
    }, 1000);
  }, [pathname, user]);

  return null;
}
