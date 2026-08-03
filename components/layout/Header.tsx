import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

// 최소 셸 — 스타일 확장/네비 항목은 통합 단계에서. sticky 높이는 --header-height 참조.
export function Header() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur"
      style={{ height: "var(--header-height)" }}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          inpilot.dev
        </Link>
        <nav className="flex items-center gap-[18px] text-sm text-muted-foreground">
          <Link href="/posts" className="hover:text-foreground">
            글
          </Link>
          <a
            href="https://github.com/inpilot-dev"
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
