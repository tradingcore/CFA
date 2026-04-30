"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface InfoHintProps {
  text: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

export function InfoHint({ text, className, side = "top" }: InfoHintProps) {
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
      <TooltipContent side={side} className="max-w-xs text-left leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
