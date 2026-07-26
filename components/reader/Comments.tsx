"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// giscus (GitHub Discussions) 댓글. 자체 DB/백엔드 0.
// NEXT_PUBLIC_GISCUS_* 미설정이면 설정 안내만 표시.
const repo = process.env.NEXT_PUBLIC_GISCUS_REPO; // "owner/repo"
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General";
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const configured = Boolean(repo && repoId && categoryId);

function giscusTheme(resolved: string | undefined) {
  return resolved === "dark" ? "dark" : "light";
}

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // 스크립트 1회 주입
  useEffect(() => {
    if (!configured || !ref.current) return;
    if (ref.current.querySelector("iframe.giscus-frame")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo!);
    script.setAttribute("data-repo-id", repoId!);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", giscusTheme(resolvedTheme));
    script.setAttribute("data-lang", "ko");
    ref.current.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 테마 토글 시 로드된 iframe에 반영
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme(resolvedTheme) } } },
      "https://giscus.app",
    );
  }, [resolvedTheme]);

  if (!configured) {
    return (
      <p className="text-sm text-muted-foreground">
        댓글은 giscus 설정 후 표시됩니다. (<code>docs/SETUP-features.md</code> 참고)
      </p>
    );
  }

  return <div ref={ref} className="giscus" />;
}
