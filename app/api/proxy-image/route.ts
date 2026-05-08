import { NextRequest, NextResponse } from "next/server";
import { guardRateLimit } from "@/lib/api-guard";

/**
 * GET /api/proxy-image?url=https://jubora.co.kr/...
 *
 * 외부 이미지를 서버 측에서 fetch 하여 CORS 헤더와 함께 반환.
 * Fabric.js 캔버스에서 crossOrigin:"anonymous" 로 로드할 수 있게 됨.
 */
export async function GET(req: NextRequest) {
  // ── 레이트 리밋 ──
  const blocked = guardRateLimit(req, "/api/proxy-image");
  if (blocked) return blocked;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  // 허용 도메인 제한 (보안)
  const allowed = [
    "jubora.co.kr",
    "res.cloudinary.com",
    "firebasestorage.googleapis.com",
  ];
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return NextResponse.json({ error: "잘못된 URL입니다." }, { status: 400 });
  }
  if (!allowed.some((d) => host === d || host.endsWith("." + d))) {
    return NextResponse.json({ error: "허용되지 않는 도메인입니다." }, { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "jubora-proxy/1.0" },
      // 캐시 10분
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `upstream ${res.status}` }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600, stale-while-revalidate=3600",
      },
    });
  } catch (e: any) {
    console.error("[proxy-image] fetch 실패:", e?.message);
    return NextResponse.json({ error: "이미지를 가져올 수 없습니다." }, { status: 502 });
  }
}
