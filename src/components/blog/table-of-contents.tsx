"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

type Props = {
  headings: Heading[];
};

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="hidden lg:block" aria-label="Table of contents">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="space-y-1.5 text-sm">
          {headings.map((h) => (
            <li
              key={h.id}
              className={h.level === 3 ? "ml-3" : ""}
            >
              <a
                href={`#${h.id}`}
                className={`block border-l-2 py-1 pl-3 transition-colors ${
                  activeId === h.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
