"use client";

import { ReactNode } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface InfoHintProps {
  text?: string;
  content?: ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  width?: "sm" | "md" | "lg";
}

const widthMap = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
} as const;

export function InfoHint({ text, content, className, side = "top", width = "md" }: InfoHintProps) {
  const body = content ?? text;
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label="What does this mean?"
        className={cn(
          "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-foreground",
          className
        )}
      >
        <Info className="h-3 w-3" />
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn("text-left leading-relaxed", widthMap[width])}
      >
        {body}
      </TooltipContent>
    </Tooltip>
  );
}

interface HintBlockProps {
  title: string;
  children: ReactNode;
  tone?: "default" | "warn" | "good";
}

export function HintBlock({ title, children, tone = "default" }: HintBlockProps) {
  const toneClass =
    tone === "warn"
      ? "text-amber-200"
      : tone === "good"
      ? "text-emerald-200"
      : "text-background/70";
  return (
    <div className="mt-2 first:mt-0">
      <p className={cn("mb-0.5 text-[10px] font-semibold uppercase tracking-wider", toneClass)}>
        {title}
      </p>
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}
