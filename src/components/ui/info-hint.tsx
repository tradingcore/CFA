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
  sm: "max-w-[260px]",
  md: "max-w-[320px]",
  lg: "max-w-[380px]",
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
        <div className="flex w-full flex-col gap-2">{body}</div>
      </TooltipContent>
    </Tooltip>
  );
}

interface HintBlockProps {
  title?: string;
  children: ReactNode;
}

export function HintBlock({ title, children }: HintBlockProps) {
  return (
    <div>
      {title && (
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-background/60">
          {title}
        </p>
      )}
      <div className="text-xs leading-snug text-background">{children}</div>
    </div>
  );
}
