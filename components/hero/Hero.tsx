import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

// 서버 컴포넌트. "기술적으로 잘 만들어진 것" 자체가 메시지.
// 배경 = CSS-only(도트 그리드 + 그린 글로우). JS 애니메이션 루프 없음 → LCP 안전.
// 애니메이션은 .hero-glow 하나뿐이며 prefers-reduced-motion 에서 정지 (globals.css).
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* 도트 그리드 (CSS radial-gradient, 아래로 페이드) */}
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(10,10,10,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
        {/* 브랜드 그린 글로우 */}
        <div className="hero-glow absolute left-1/2 top-[-160px] h-[520px] w-[520px] rounded-full" />
      </div>

      <Container className="py-24 sm:py-32">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          백엔드 · 핀테크 엔지니어
        </p>
        <h1 className="max-w-3xl text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-[56px]">
          만드는 과정을 전부 공개하는
          <br />
          AI 워크플로우 · 기술 블로그
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          유튜브 링크 하나 던지면 Notion에 요약이 도착합니다. 자동화·백엔드를 직접
          만들고, 그 과정을 전부 기록합니다.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/posts">글 보기</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              href="https://github.com/alstmdqls03"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
