import fs from "node:fs";
import path from "node:path";
import { Container } from "@/components/layout/Container";

// 비공개 운영 페이지 — 매일 수집된 다이제스트를 훑는 용도. 어디에도 링크하지 않는다.
export const metadata = {
  title: "digest — inpilot",
  robots: { index: false, follow: false },
};

const DIGEST_DIR = path.join(process.cwd(), "digest");
const DAYS_SHOWN = 14;

type Item = { headline: string; source: string; url: string };

// collect_digest.py의 고정 출력 형식만 파싱한다:
//   - [ ] **headline**
//         `source` · url
// MDX 렌더 대신 직접 파싱 — 외부 제목이 섞인 텍스트를 컴파일하지 않는 게 안전하다.
function parseDigest(md: string): Item[] {
  const items: Item[] = [];
  const lines = md.split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    const head = lines[i].match(/^- \[[ x]\] \*\*(.+)\*\*$/);
    const meta = lines[i + 1]?.match(/^\s+`(.+)` · (\S+)$/);
    if (head && meta) items.push({ headline: head[1], source: meta[1], url: meta[2] });
  }
  return items;
}

function getDigests(): { date: string; items: Item[] }[] {
  if (!fs.existsSync(DIGEST_DIR)) return [];
  return fs
    .readdirSync(DIGEST_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()
    .slice(0, DAYS_SHOWN)
    .map((f) => ({
      date: f.replace(".md", ""),
      items: parseDigest(fs.readFileSync(path.join(DIGEST_DIR, f), "utf8")),
    }));
}

export default function DigestPage() {
  const digests = getDigests();
  return (
    <Container className="py-14">
      <h1 className="mb-2 text-[28px] font-semibold tracking-tight">다이제스트</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        발행 전 논평 1줄 필수 — 기계 요약만으로는 올리지 않는다.
      </p>

      {digests.length === 0 && (
        <p className="text-sm text-muted-foreground">
          아직 수집된 다이제스트가 없다. 새벽 3시 PR을 merge하면 여기에 쌓인다.
        </p>
      )}

      {digests.map(({ date, items }) => (
        <section key={date} className="mb-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {date} <span className="text-sm font-normal text-muted-foreground">· {items.length}건</span>
          </h2>
          <ul className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="rounded-lg border p-3">
                <a
                  href={it.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[15px] font-medium hover:underline"
                >
                  {it.headline}
                </a>
                <div className="mt-1 text-xs text-muted-foreground">{it.source}</div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}
