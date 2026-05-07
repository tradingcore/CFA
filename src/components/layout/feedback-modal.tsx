"use client";

import { useState, useRef, useEffect } from "react";
import { Star, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export function FeedbackModal({ open, onClose, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await onSubmit(rating, comment);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setRating(0);
        setComment("");
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-bold">
            {submitted ? "Thank you!" : "How's your experience?"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
              <Star className="h-7 w-7 text-emerald-500" fill="currentColor" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your daily limits have been reset. Keep studying!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 p-5">
            <p className="text-sm text-muted-foreground">
              Share your feedback and get bonus questions for today.
            </p>

            {/* Star rating */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="rounded p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        (hoveredStar || rating) >= star
                          ? "text-amber-400"
                          : "text-muted-foreground/20"
                      )}
                      fill={(hoveredStar || rating) >= star ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <span className="text-xs text-muted-foreground">
                  {["", "Needs work", "Below average", "Good", "Very good", "Excellent"][rating]}
                </span>
              )}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What could we improve? (optional)"
              rows={3}
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-ring placeholder:text-muted-foreground focus:ring-2"
            />

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Submitting..." : "Submit & get +3 chat, +5 quiz"}
              </button>
              <button
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                No thanks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
