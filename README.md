# inpilot

개인 기술 허브 — AI 워크플로우·자동화·백엔드를 만들고 기록하는 블로그.

- **Live**: https://inpilot.dev
- Next.js 16 (App Router, SSG) + 파일 기반 MDX. 런타임 DB 없음, `content/*.mdx`가 곧 콘텐츠.

## 로컬에서 보기

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 구조

```
content/*.mdx        글 (frontmatter + 본문)
lib/content.ts       gray-matter 파싱, 목록·태그 집계
app/posts/[slug]     빌드타임 정적 생성
app/api/subscribe    뉴스레터 구독 (Resend)
```

## 환경변수

`.env.example` 참고. 모두 선택 사항이며, 비우면 해당 기능만 숨겨지고 사이트는 정상 동작합니다.
