import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostGrid } from "@/components/post-list/PostGrid";
import { getAllPosts } from "@/lib/content";

export default function Home() {
  const recent = getAllPosts().slice(0, 6);
  return (
    <>
      <Hero />
      <Container className="py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">최신 글</h2>
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            전체 보기 →
          </Link>
        </div>
        <PostGrid posts={recent} />

        {/* 랜딩 착지점의 전환 장치 — Threads 프로필 링크로 들어온 방문자가
            글을 클릭하지 않아도 구독할 수 있어야 한다. */}
        <section className="mt-16 rounded-xl border bg-muted/30 p-6">
          <h2 className="text-lg font-semibold">새 글이 올라오면 받아보기</h2>
          <p className="mt-1 mb-4 text-sm text-muted-foreground">
            워크플로우 재현기와 치트시트를 새로 올릴 때만 보내드려요. 스팸 없음.
          </p>
          <NewsletterForm />
        </section>
      </Container>
    </>
  );
}
