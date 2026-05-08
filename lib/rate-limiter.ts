// 간단한 인메모리 레이트 리미터 (서버리스 환경에서는 인스턴스별 독립)

const store = new Map<string, { count: number; resetAt: number }>();
const banned = new Set<string>();

const WINDOW_MS = 60_000;      // 1분
const MAX_REQUESTS = 60;       // 분당 최대 60회
const BAN_THRESHOLD = 200;     // 200회 초과 시 일시 차단
const BAN_DURATION = 5 * 60_000; // 5분 차단

export function checkRateLimit(
  ip: string,
  _path: string
): { allowed: boolean; banned?: boolean; retryAfter?: number } {
  const now = Date.now();

  // 차단된 IP 체크
  if (banned.has(ip)) {
    return { allowed: false, banned: true, retryAfter: 300 };
  }

  const key = `${ip}`;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  entry.count++;

  if (entry.count > BAN_THRESHOLD) {
    banned.add(ip);
    setTimeout(() => banned.delete(ip), BAN_DURATION);
    return { allowed: false, banned: true, retryAfter: 300 };
  }

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

export function getBannedIPs(): string[] {
  return Array.from(banned);
}
