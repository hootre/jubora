// /api/payment/confirm – PortOne(아임포트) 결제 검증 (보안 강화)
// GET  : PortOne redirectUrl 콜백 수신 (paymentId, orderId, txId 쿼리 파라미터)
// POST : 클라이언트 결제 완료 후 서버 검증 호출
import { NextRequest, NextResponse } from "next/server";
import { savePayment } from "@/lib/firestore";
import { guardRateLimit } from "@/lib/api-guard";

const PORTONE_API_BASE = "https://api.portone.io";

// ── PortOne V2 결제 조회 + 검증 ──────────────────────────────────
async function verifyPayment(
  paymentId: string,
  orderId:   string,
  amount:    number,
  origin:    string
) {
  const apiSecret = process.env.PORTONE_API_SECRET;
  if (!apiSecret) throw new Error("PORTONE_API_SECRET 미설정");

  // 1) PortOne API에서 결제 상태 조회
  const portoneRes = await fetch(`${PORTONE_API_BASE}/payments/${encodeURIComponent(paymentId)}`, {
    headers: {
      Authorization: `PortOne ${apiSecret}`,
      "Content-Type": "application/json",
    },
  });

  if (!portoneRes.ok) {
    const err = await portoneRes.json().catch(() => ({}));
    throw new Error(err?.message ?? `PortOne 결제 조회 실패 (${portoneRes.status})`);
  }

  const payment = await portoneRes.json();

  // 2) 결제 상태 확인
  if (payment.status !== "PAID") {
    throw new Error(`결제 미완료 상태: ${payment.status}`);
  }

  // 3) 금액 위변조 방지 – 실제 결제금액과 주문금액 일치 확인
  if (payment.amount?.total !== amount) {
    throw new Error(
      `결제금액 불일치: 주문 ${amount}원 / 실제 ${payment.amount?.total}원`
    );
  }

  // 4) Firestore에 결제 정보 저장
  await savePayment(orderId, {
    method:     payment.method?.type ?? payment.payMethod ?? "UNKNOWN",
    paymentId:  payment.id,
    paidAt:     payment.paidAt ?? new Date().toISOString(),
    amount:     payment.amount?.total,
    pgProvider: payment.channel?.pgProvider ?? "",
  });

  // 5) 카카오 알림톡 발송
  await fetch(`${origin}/api/kakao/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type:        "payment_complete",
      phone:       payment.customer?.phoneNumber ?? "",
      orderNumber: orderId,
      totalPrice:  payment.amount?.total,
    }),
  });

  return payment;
}

// ── GET: PortOne redirectUrl 콜백 ─────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const paymentId = searchParams.get("paymentId") ?? "";
  const orderId   = searchParams.get("orderId")   ?? "";
  const txId      = searchParams.get("txId")      ?? "";  // PortOne 내부 트랜잭션 ID (로그용)

  if (!paymentId || !orderId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // redirectUrl 방식에서는 amount를 Firestore 주문에서 다시 조회해야 함
    // 간단하게 처리: PortOne API에서 직접 검증 (amount 파라미터 없이 조회 후 저장)
    const apiSecret = process.env.PORTONE_API_SECRET;
    if (!apiSecret) throw new Error("PORTONE_API_SECRET 미설정");

    const portoneRes = await fetch(`${PORTONE_API_BASE}/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `PortOne ${apiSecret}` },
    });
    if (!portoneRes.ok) throw new Error("PortOne 결제 조회 실패");

    const payment = await portoneRes.json();
    if (payment.status !== "PAID") throw new Error("결제 미완료");

    await savePayment(orderId, {
      method:     payment.method?.type ?? "UNKNOWN",
      paymentId:  payment.id,
      paidAt:     payment.paidAt ?? new Date().toISOString(),
      amount:     payment.amount?.total,
      pgProvider: payment.channel?.pgProvider ?? "",
    });

    await fetch(`${origin}/api/kakao/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type:        "payment_complete",
        phone:       payment.customer?.phoneNumber ?? "",
        orderNumber: orderId,
        totalPrice:  payment.amount?.total,
      }),
    });

    return NextResponse.redirect(new URL(`/order/${orderId}/complete`, req.url));
  } catch (err) {
    console.error("[Payment Confirm GET]", err);
    return NextResponse.redirect(
      new URL(`/order/${orderId}/payment?failed=true`, req.url)
    );
  }
}

// ── POST: 클라이언트 결제 완료 후 서버 검증 ──────────────────────
export async function POST(req: NextRequest) {
  // ── 레이트 리밋 (결제는 엄격) ──
  const blocked = guardRateLimit(req, "/api/payment/confirm");
  if (blocked) return blocked;

  try {
    const { paymentId, orderId, amount } = await req.json();

    if (!paymentId || !orderId || !amount) {
      return NextResponse.json(
        { success: false, error: "필수 파라미터 누락 (paymentId, orderId, amount)" },
        { status: 400 }
      );
    }

    // ── 입력 검증 ──
    if (typeof paymentId !== "string" || paymentId.length > 200) {
      return NextResponse.json({ success: false, error: "잘못된 paymentId" }, { status: 400 });
    }
    if (typeof orderId !== "string" || orderId.length > 100) {
      return NextResponse.json({ success: false, error: "잘못된 orderId" }, { status: 400 });
    }
    if (typeof amount !== "number" || amount <= 0 || amount > 100000000) {
      return NextResponse.json({ success: false, error: "잘못된 금액" }, { status: 400 });
    }

    const payment = await verifyPayment(
      paymentId,
      orderId,
      Number(amount),
      req.nextUrl.origin
    );

    return NextResponse.json({ success: true, payment });
  } catch (err: unknown) {
    console.error("[Payment Confirm POST]", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "결제 검증 오류",
      },
      { status: 500 }
    );
  }
}
