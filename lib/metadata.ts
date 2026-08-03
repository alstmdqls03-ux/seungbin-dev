import type { Metadata } from "next";

export const SITE = {
  name: "inpilot",
  title: "inpilot — AI에게 맡기지 않고, 조종합니다",
  description: "AI 워크플로우·자동화·백엔드를 만들고 전부 공개하는 기술 블로그.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inpilot.dev",
  author: "Seungbin",
  locale: "ko_KR",
} as const;

export function ogImageUrl(params: { title: string; tags?: string[] }): string {
  const sp = new URLSearchParams({ title: params.title });
  if (params.tags?.length) sp.set("tags", params.tags.join(","));
  return `${SITE.url}/api/og?${sp.toString()}`;
}

/** OG/Twitter 카드 + canonical 포함 메타데이터 생성 헬퍼. */
export function buildMetadata(opts: {
  title?: string;
  description?: string;
  path?: string;
  tags?: string[];
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const title = opts.title ?? SITE.title;
  const description = opts.description ?? SITE.description;
  const url = `${SITE.url}${opts.path ?? ""}`;
  const image = ogImageUrl({ title: opts.title ?? SITE.name, tags: opts.tags });

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    // 재발행처(velog/LinkedIn 등)에서도 블로그를 정본으로 귀속 → 중복 콘텐츠 SEO 방지
    alternates: { canonical: url },
    openGraph: {
      type: opts.type ?? "website",
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
