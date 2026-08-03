import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { PostExplorer } from "@/components/post-list/PostExplorer";
import { PostGridSkeleton } from "@/components/post-list/PostGrid";
import { getAllPosts, getAllTags } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "글 — inpilot", path: "/posts" });

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <Container className="py-14">
      <h1 className="mb-8 text-[28px] font-semibold tracking-tight">글</h1>
      {/* useSearchParams(태그 필터) 는 Suspense 경계 필요 */}
      <Suspense fallback={<PostGridSkeleton />}>
        <PostExplorer posts={posts} tags={tags} />
      </Suspense>
    </Container>
  );
}
