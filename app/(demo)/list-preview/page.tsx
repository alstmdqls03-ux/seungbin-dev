import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { PostExplorer } from "@/components/post-list/PostExplorer";
import { PostGridSkeleton } from "@/components/post-list/PostGrid";
import { getAllPosts, getAllTags } from "@/lib/content";

// B 트랙 조합 데모 — 검색 + 태그필터 + 그리드 통합 확인용.
export default function ListPreviewPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <Container className="py-14">
      <h1 className="mb-2 text-[28px] font-semibold tracking-tight">
        리스트/탐색 미리보기
      </h1>
      <p className="mb-8 text-muted-foreground">
        검색 · 다중 태그 필터(URL 동기화) · 반응형 그리드 조합.
      </p>
      {/* useSearchParams 는 Suspense 경계 필요 */}
      <Suspense fallback={<PostGridSkeleton />}>
        <PostExplorer posts={posts} tags={tags} />
      </Suspense>
    </Container>
  );
}
