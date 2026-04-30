"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { updateUserProfile } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, Check } from "lucide-react";

export function StudyNotes() {
  const { user, profile } = useAuth();
  const [notes, setNotes] = useState(profile?.notes ?? "");
  const [saved, setSaved] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (profile?.notes !== undefined) setNotes(profile.notes);
  }, [profile?.notes]);

  const persist = useCallback(
    (value: string) => {
      if (!user) return;
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        try {
          await updateUserProfile(user.uid, { notes: value });
          setSaved(true);
          setTimeout(() => setSaved(false), 1500);
        } catch (err) {
          console.error("Failed to save notes:", err);
        }
      }, 800);
    },
    [user]
  );

  const handleChange = (value: string) => {
    setNotes(value);
    persist(value);
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <StickyNote className="h-4 w-4 text-primary" />
            My Notes
          </CardTitle>
          {saved && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-500">
              <Check className="h-3 w-3" /> Saved
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <textarea
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Jot down formulas, reminders, things to review..."
          className="w-full flex-1 resize-none rounded-lg border-0 bg-muted/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary"
        />
      </CardContent>
    </Card>
  );
}
