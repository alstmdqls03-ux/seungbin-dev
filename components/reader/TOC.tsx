"use client";

import { useEffect, useState } from "react";
import type { TOCItem } from "@/types/content";
import { cn } from "@/lib/utils";

// IntersectionObserver 스크롤 스파이. 렌더된 본문의 h2/h3[id] 를 직접 읽어
// rehype-slug 가 부여한 id 와 100% 일치시킨다. observer 는 unmount 시 disconnect.
export function TOC({ containerId = "post-body" }: { containerId?: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
    );
    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      })),
    );

    // rootMargin 으로 "화면 상단에 걸친 헤딩"을 활성화
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [containerId]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="sticky text-sm"
      style={{ top: "calc(var(--header-height) + 24px)" }}
    >
      <p className="mb-3 font-medium text-foreground">목차</p>
      <ul className="border-l border-border">
        {items.map((it) => (
          <li key={it.id} style={{ marginLeft: it.level === 3 ? 12 : 0 }}>
            <a
              href={`#${it.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 transition-colors",
                activeId === it.id
                  ? "border-brand-green font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
