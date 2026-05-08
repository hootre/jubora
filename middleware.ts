import { NextRequest, NextResponse } from "next/server";

// ── 로그인 brute force 방지 (Edge Runtime 호환) ──
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const LOGIN_MAX_ATTEMPTS = 10;         // 10회 연속 실패
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15분 윈도우
const LOGIN_BLOCK_MS = 30 * 60 * 1000;  // 30분 차단

// 전역 요청 속도 제한 (Edge에서 단순 카운터)
const globalReqs = new Map<string, { count: number; windowStart: number }>();
const GLOBAL_WINDOW_MS = 60 * 1000;    // 1분
const GLOBAL_MAX_REQS = 120;           // 분당 120회 (전체 경로 합산)

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function middleware(req: NextRequest) {
  const ip = getIP(req);
  const { pathname } = req.nextUrl;
  const now = Date.now();

  // ── 1. 전역 레이트 리밋 (분당 120회) ──
  const gKey = ip;
  const gRec = globalReqs.get(gKey);
  if (gRec) {
    if (now - gRec.windowStart > GLOBAL_WINDOW_MS) {
      gRec.count = 1;
      gRec.windowStart = now;
    } else {
      gRec.count += 1;
      if (gRec.count > GLOBAL_MAX_REQS) {
        return new NextResponse(
          JSON.stringify({ error: "요청이 너무 빈번합니다. 잠시 후 다시 시도해주세요." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60",
            },
          }
        );
      }
    }
  } else {
    globalReqs.set(gKey, { count: 1, windowStart: now });
  }

  // ── 2. 관리자 경로 로그인 brute force 방지 ──
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    const lKey = `login:${ip}`;
    const lRec = loginAttempts.get(lKey);

    if (lRec) {
      // 차단 시간이 지났으면 리셋
      if (now - lRec.lastAttempt > LOGIN_BLOCK_MS) {
        loginAttempts.delete(lKey);
      } else if (lRec.count >= LOGIN_MAX_ATTEMPTS) {
        // 차단 중
        return new NextResponse(
          JSON.stringify({ error: "로그인 시도가 너무 많습니다. 30분 후 다시 시도해주세요." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(Math.ceil(LOGIN_BLOCK_MS / 1000)),
            },
          }
        );
      }
    }

    // POST 요청만 카운트 (실제 로그인 시도)
    if (req.method === "POST") {
      const rec = loginAttempts.get(lKey) ?? { count: 0, lastAttempt: now };
      if (now - rec.lastAttempt > LOGIN_WINDOW_MS) {
        rec.count = 1; // 윈도우 리셋
      } else {
        rec.count += 1;
      }
      rec.lastAttempt = now;
      loginAttempts.set(lKey, rec);
    }
  }

  // ── 3. 수상한 경로 차단 (스캐너/봇) ──
  const suspiciousPaths = [
    "/wp-admin", "/wp-login", "/.env", "/phpmyadmin",
    "/xmlrpc.php", "/admin.php", "/.git", "/config.php",
    "/setup.php", "/install.php", "/backup", "/.aws",
    "/wp-content", "/wp-includes", "/cgi-bin",
  ];
  const lowerPath = pathname.toLowerCase();
  if (suspiciousPaths.some((p) => lowerPath.startsWith(p))) {
    console.warn(`🚫 [Middleware] 수상한 경로 접근 차단: ${ip} → ${pathname}`);
    return new NextResponse(null, { status: 404 });
  }

  // ── 4. 보안 헤더 추가 ──
  const response = NextResponse.next();

  // XSS 방지
  response.headers.set("X-Content-Type-Options", "nosniff");
  // 클릭재킹 방지
  response.headers.set("X-Frame-Options", "DENY");
  // XSS 필터
  response.headers.set("X-XSS-Protection", "1; mode=block");
  // HTTPS 강제 (배포 시)
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  // Referrer 정보 최소화
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // 권한 정책 (카메라, 마이크 등 차단)
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // Content Security Policy (기본)
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.portone.io https://apis.google.com https://*.firebaseapp.com https://t1.daumcdn.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net https://api.portone.io wss://*.firebaseio.com https://api.groq.com https://generativelanguage.googleapis.com https://api.cerebras.ai https://api.sambanova.ai https://openrouter.ai",
      "frame-src 'self' https://cdn.portone.io https://*.firebaseapp.com https://apis.google.com https://accounts.google.com https://t1.daumcdn.net",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ")
  );

  return response;
}

// ── 미들웨어 적용 경로 (정적 파일 제외) ──
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
