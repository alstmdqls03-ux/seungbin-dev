import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllPosts } from "@/lib/content";

// 최소 목록 — B 트랙 PostGrid 로 교체될 자리.
export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <Container className="py-14">
      <h1 className="text-[28px] font-semibold tracking-tight">글</h1>
      <ul className="mt-8 space-y-5 border-t border-border pt-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="font-medium hover:text-brand-tag"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {post.description}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {post.date} · {post.readingTime} · {post.category}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
