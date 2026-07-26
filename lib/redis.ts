// Upstash Redis REST via fetch — SDK 의존성 없이 조회수 카운터만.
// ponytail: @upstash/redis 안 깜. INCR/GET 두 명령뿐이라 fetch 한 줄이면 충분.
const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function redisEnabled(): boolean {
  return Boolean(URL && TOKEN);
}

async function command(path: string): Promise<string | number | null> {
  if (!redisEnabled()) return null;
  try {
    const res = await fetch(`${URL}/${path}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | number | null };
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function incrViews(slug: string): Promise<number> {
  const r = await command(`incr/views:${encodeURIComponent(slug)}`);
  return Number(r) || 0;
}

export async function getViews(slug: string): Promise<number> {
  const r = await command(`get/views:${encodeURIComponent(slug)}`);
  return Number(r) || 0;
}
