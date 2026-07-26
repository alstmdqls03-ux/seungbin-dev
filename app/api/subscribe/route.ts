import { NextRequest, NextResponse } from "next/server";

// 입력 검증(400)과 다운스트림 실패(502/503)를 분리 — 400 vs 500 구분 유지.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };

  // 신뢰 경계 입력 검증
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "올바른 이메일을 입력해주세요." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) {
    return NextResponse.json(
      { error: "구독 기능이 아직 설정되지 않았어요. (docs/SETUP-features.md)" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "구독 처리 중 문제가 생겼어요." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "구독 처리 중 문제가 생겼어요." }, { status: 502 });
  }

  return NextResponse.json({ message: "구독 완료! 확인 메일을 보내드릴게요." });
}
