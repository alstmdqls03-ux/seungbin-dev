"use client";

import { useRef, useState } from "react";

// rehype-pretty-code 가 만든 <pre> 를 감싸 복사 버튼을 얹는다. (Mdx 매핑에서 pre → CodeBlock)
// 파일명은 코드펜스에 title="foo.ts" 메타가 있으면 rehype-pretty-code 가 figcaption 으로 렌더.
export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 자동 복귀
    } catch {
      /* 클립보드 거부 시 무시 */
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "복사됨" : "코드 복사"}
        className="absolute right-3 top-3 z-10 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs font-medium text-white/80 opacity-0 transition hover:bg-white/20 focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green group-hover:opacity-100"
      >
        {copied ? "복사됨" : "복사"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
