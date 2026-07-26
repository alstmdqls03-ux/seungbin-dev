"use client";

import { useEffect, useState } from "react";

// 조회수 표시. Upstash 미설정이면(enabled=false) 아무것도 렌더하지 않음.
export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = `viewed:${slug}`;
    const firstVisit = !sessionStorage.getItem(key);
    if (firstVisit) sessionStorage.setItem(key, "1"); // strict-mode 이중호출·새로고침 중복 방지

    const url = firstVisit ? "/api/views" : `/api/views?slug=${encodeURIComponent(slug)}`;
    const opts: RequestInit | undefined = firstVisit
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) }
      : undefined;

    fetch(url, opts)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d.enabled) setViews(d.views);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;
  return <span>· 조회 {views.toLocaleString()}</span>;
}
