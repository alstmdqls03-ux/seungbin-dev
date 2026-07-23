import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllPosts } from "@/lib/content";

// 랜딩 임시 셸 — Hero(A) / PostGrid·TagFilter·SearchBar(B) 로 교체될 자리.
export default function Home() {
  const posts = getAllPosts();
  return (
    <Container className="py-14">
      {/* TODO(track-hero): 상단 히어로 섹션은 A 트랙이 components/hero/Hero.tsx 로 채움 */}
      <h1 className="text-[28px] font-semibold leading-tight tracking-tight">
        seungbin.dev
      </h1>
      <p className="mt-2 max-w-[640px] text-muted-foreground">
        유튜브 링크 하나 던지면 Notion에 요약이 도착합니다. AI 워크플로우·자동화·Claude
        활용법을 만들고 전부 공개합니다.
      </p>

      {/* TODO(track-post-list): 아래 임시 목록을 B 트랙 PostGrid/TagFilter/SearchBar 로 교체 */}
      <ul className="mt-12 space-y-4 border-t border-border pt-8">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-baseline gap-x-3">
            <Link
              href={`/posts/${post.slug}`}
              className="font-medium hover:text-brand-tag"
            >
              {post.title}
            </Link>
            <span className="text-sm text-muted-foreground">
              {post.date} · {post.readingTime}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
