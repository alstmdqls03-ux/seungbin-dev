import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { Mdx } from "@/components/reader/Mdx";
import { TOC } from "@/components/reader/TOC";
import { ReadingProgress } from "@/components/reader/ReadingProgress";

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
  return buildMetadata({
    title: data.post.title,
    description: data.post.description,
    path: `/posts/${slug}`,
    tags: data.post.tags,
    type: "article",
    publishedTime: data.post.date,
  });
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
    <>
      <ReadingProgress />
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_200px]">
          <article className="mx-auto w-full max-w-[720px]">
            <h1 className="text-[36px] font-semibold leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {post.date} · {post.readingTime}
            </p>
            <div
              id="post-body"
              className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-[var(--surface-code)] prose-pre:p-4"
            >
              <Mdx source={content} />
            </div>
          </article>
          <aside className="hidden lg:block">
            <TOC containerId="post-body" />
          </aside>
        </div>
      </Container>
    </>
  );
}
