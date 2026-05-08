// API 보안 가드 — 레이트 리미터 + 입력 검증 통합 헬퍼
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";

// IP 추출 (Vercel, Cloudflare, 일반 프록시 대응)
export function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

// 레이트 리밋 체크 → 차단 시 429 응답 반환, 통과 시 null
export function guardRateLimit(req: NextRequest, path: string): NextResponse | null {
  const ip = getClientIP(req);
  const result = checkRateLimit(ip, path);

  if (!result.allowed) {
    const res = NextResponse.json(
      {
        error: result.banned
          ? "너무 많은 요청이 감지되어 일시적으로 차단되었습니다."
          : "요청이 너무 빈번합니다. 잠시 후 다시 시도해주세요.",
        retryAfter: result.retryAfter,
      },
      { status: 429 }
    );
    if (result.retryAfter) {
      res.headers.set("Retry-After", String(result.retryAfter));
    }
    return res;
  }

  return null; // 통과
}

// 요청 본문 크기 제한 체크
export async function guardBodySize(req: NextRequest, maxBytes: number): Promise<{ body: any; error: NextResponse | null }> {
  const contentLength = parseInt(req.headers.get("content-length") ?? "0");
  if (contentLength > maxBytes) {
    return {
      body: null,
      error: NextResponse.json(
        { error: `요청 크기가 너무 큽니다. (최대 ${Math.round(maxBytes / 1024)}KB)` },
        { status: 413 }
      ),
    };
  }

  try {
    const body = await req.json();
    return { body, error: null };
  } catch {
    return {
      body: null,
      error: NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 }),
    };
  }
}

// 문자열 입력 검증 (XSS 방지)
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")  // script 태그 제거
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")   // iframe 제거
    .replace(/on\w+\s*=/gi, "")                              // 이벤트 핸들러 제거
    .replace(/javascript\s*:/gi, "")                         // javascript: 프로토콜 제거
    .trim();
}
