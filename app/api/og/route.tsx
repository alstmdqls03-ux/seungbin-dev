import { ImageResponse } from "next/og";

export const runtime = "edge";

// 동적 OG 이미지. 쿼리: title, tags(csv). 규칙#3 토큰은 OG 이미지에만 적용 → 브랜드 원색 사용.
// TODO(track-infra): 한글 제목 완전 렌더는 Noto Sans KR 서브셋 임베드 필요 (현재 기본 폰트 = 라틴 위주).
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "seungbin.dev").slice(0, 100);
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#5a5a5c" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9999, background: "#00d4a4" }} />
          seungbin.dev
        </div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 600, lineHeight: 1.15, letterSpacing: -1 }}>
          {title}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 26,
                color: "#2f66c0",
                background: "rgba(55,114,207,0.15)",
                padding: "6px 18px",
                borderRadius: 9999,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
