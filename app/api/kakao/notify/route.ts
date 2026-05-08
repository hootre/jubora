// POST /api/kakao/notify – 카카오 알림톡 발송
import { NextRequest, NextResponse } from "next/server";
import { sendKakaoNotify } from "@/lib/kakao";

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();
    const ok = await sendKakaoNotify(params);
    return NextResponse.json({ success: ok });
  } catch (err) {
    console.error("[Kakao Notify]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
