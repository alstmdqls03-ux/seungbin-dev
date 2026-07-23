import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
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
      </Container>
    </>
  );
}
