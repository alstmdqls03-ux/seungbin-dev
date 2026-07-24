"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Post, Tag } from "@/types/content";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { PostGrid } from "./PostGrid";

// 검색 + 다중 태그 필터 + 그리드 조합. 태그 선택은 URL(?tags=a,b)과 동기화 (공유·색인 가능).
export function PostExplorer({ posts, tags }: { posts: Post[]; tags: Tag[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(() =>
    (searchParams.get("tags") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

  function toggle(name: string) {
    setSelected((prev) => {
      const next = prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name];
      const sp = new URLSearchParams(Array.from(searchParams.entries()));
      if (next.length) sp.set("tags", next.join(","));
      else sp.delete("tags");
      router.replace(sp.toString() ? `?${sp.toString()}` : "?", { scroll: false });
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      // 다중 태그 = AND (선택한 태그를 모두 가진 글)
      const matchesTags =
        selected.length === 0 || selected.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [posts, query, selected]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} />
      {tags.length > 0 && (
        <TagFilter tags={tags} selected={selected} onToggle={toggle} />
      )}
      <p className="text-sm text-muted-foreground">{filtered.length}개의 글</p>
      <h2 className="sr-only">글 목록</h2>
      <PostGrid posts={filtered} />
    </div>
  );
}
