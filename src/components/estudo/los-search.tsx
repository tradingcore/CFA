"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type LOSFilter = "all" | "pending" | "studied";

interface LOSSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filter: LOSFilter;
  onFilterChange: (f: LOSFilter) => void;
}

const filters: { value: LOSFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "studied", label: "Studied" },
];

/**
 * Search input + quick filter buttons for LOS content.
 * @param searchQuery - Current search text
 * @param onSearchChange - Callback for search text changes
 * @param filter - Active filter
 * @param onFilterChange - Callback for filter changes
 * @returns Search and filter bar component
 */
export function LOSSearch({ searchQuery, onSearchChange, filter, onFilterChange }: LOSSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search LOS (e.g. GIPS, duration, CAPM...)"
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2"
        />
      </div>
      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-medium transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
