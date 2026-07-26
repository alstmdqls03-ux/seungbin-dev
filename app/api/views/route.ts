import { NextRequest, NextResponse } from "next/server";
import { redisEnabled, incrViews, getViews } from "@/lib/redis";

// GET ?slug=... → 조회수 읽기(증가 없음)
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  if (!redisEnabled()) return NextResponse.json({ views: null, enabled: false });
  return NextResponse.json({ views: await getViews(slug), enabled: true });
}

// POST { slug } → 조회수 1 증가 후 반환
export async function POST(req: NextRequest) {
  const { slug } = (await req.json().catch(() => ({}))) as { slug?: string };
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  if (!redisEnabled()) return NextResponse.json({ views: null, enabled: false });
  // ponytail: per-IP 중복제거 없음. 클라가 sessionStorage로 세션당 1회만 POST.
  //           봇 인플레가 문제되면 SET NX EX(24h) 게이트 추가.
  return NextResponse.json({ views: await incrViews(slug), enabled: true });
}
