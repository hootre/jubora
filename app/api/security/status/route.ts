// GET /api/security/status — 보안 현황 (관리자용)
import { NextResponse } from "next/server";
import { getBannedIPs } from "@/lib/rate-limiter";

export async function GET() {
  const banned = getBannedIPs();

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    bannedIPs: banned,
    bannedCount: banned.length,
    protections: [
      { name: "전역 레이트 리밋", status: "✅ 활성", detail: "분당 120회 제한" },
      { name: "API 보호", status: "✅ 활성", detail: "분당 20회, 위반 3회 → 10분 차단" },
      { name: "결제 API 보호", status: "✅ 활성", detail: "분당 10회, 위반 2회 → 30분 차단" },
      { name: "이미지 프록시 보호", status: "✅ 활성", detail: "분당 60회, 위반 5회 → 5분 차단" },
      { name: "로그인 brute force 방지", status: "✅ 활성", detail: "10회 실패 → 30분 차단" },
      { name: "수상한 경로 차단", status: "✅ 활성", detail: "wp-admin, .env, phpmyadmin 등" },
      { name: "보안 헤더", status: "✅ 활성", detail: "XSS, 클릭재킹, HSTS, CSP" },
      { name: "입력 살균", status: "✅ 활성", detail: "스크립트 태그, 이벤트 핸들러 제거" },
      { name: "본문 크기 제한", status: "✅ 활성", detail: "50KB, 결제 제한 적용" },
    ],
  });
}
