import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

// 공통 MDX 렌더 — rehype 체인은 여기에 산다 (next-mdx-remote 방식, next.config 아님).
// h2/h3 는 rehype-slug 가 id 를 자동 부여 → TOC 가 그 id 를 스캔.
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
    ],
  },
} as const;

const components = {
  pre: CodeBlock,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={mdxOptions as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components={components as any}
    />
  );
}
