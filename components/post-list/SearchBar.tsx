"use client";

import { Input } from "@/components/ui/input";

// 클라이언트 사이드 검색 입력 (controlled). 외부 라이브러리 없음 — 필터링은 PostExplorer 에서.
export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      type="search"
      inputMode="search"
      placeholder="제목·설명으로 글 검색…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="글 검색"
      className="h-11 rounded-full px-5"
    />
  );
}
