"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// 셀프호스팅 좋아요 — localStorage 기기당 토글. 외부 서비스 0.
// ponytail: 공유 카운트 없음(기기별 상태만). 집계가 필요해지면 조회수와 같은 Upstash로 승급.
export function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트 후 client-only 상태(localStorage) 초기화 — 하이드레이션 가드
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [slug]);

  function toggle() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`liked:${slug}`, next ? "1" : "0");
  }

  if (!mounted) return null; // SSR/클라 상태 불일치 깜빡임 방지

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
        liked
          ? "border-rose-400 bg-rose-50 text-rose-600 dark:border-rose-500/50 dark:bg-rose-950/30 dark:text-rose-400"
          : "border-input hover:bg-accent",
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      {liked ? "좋아요 취소" : "좋아요"}
    </button>
  );
}
