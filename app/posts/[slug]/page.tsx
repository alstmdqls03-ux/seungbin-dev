import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getAllPosts, getPostBySlug } from "@/lib/content";

// rehype 체인은 여기(공통 MDX 렌더 옵션)에 산다 — next.config 아님 (next-mdx-remote 방식).
// TODO(track-reader): C 트랙이 components/reader/Mdx.tsx 로 이 매핑을 대체·확장.
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
    ],
  },
} as const;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) return {};
  return { title: data.post.title, description: data.post.description };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) notFound();
  const { post, content } = data;

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-[720px]">
        <h1 className="text-[36px] font-semibold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {post.date} · {post.readingTime}
        </p>
        <div className="prose prose-neutral mt-8 max-w-none prose-pre:bg-[var(--surface-code)]">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <MDXRemote source={content} options={mdxOptions as any} />
        </div>
      </article>
    </Container>
  );
}
