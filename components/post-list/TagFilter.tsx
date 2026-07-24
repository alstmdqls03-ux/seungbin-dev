"use client";

import { cn } from "@/lib/utils";
import type { Tag } from "@/types/content";

// 다중 선택 태그 필터 (pill). URL searchParams 동기화는 PostExplorer 가 오케스트레이션.
export function TagFilter({
  tags,
  selected,
  onToggle,
}: {
  tags: Tag[];
  selected: string[];
  onToggle: (name: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="태그 필터">
      {tags.map((t) => {
        const active = selected.includes(t.name);
        return (
          <button
            key={t.name}
            type="button"
            onClick={() => onToggle(t.name)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {t.name}
            <span className="ml-1.5 opacity-60">{t.count}</span>
          </button>
        );
      })}
    </div>
  );
}
