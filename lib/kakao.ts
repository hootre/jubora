// 카카오 알림톡 (비즈니스 메시지) 연동
// 건당 약 8원, 카카오 비즈니스 계정 필요

export type KakaoNotifyType =
  | "order_received"    // 주문 접수 (관리자에게)
  | "proof_sent"        // 시안 전달 (고객에게)
  | "payment_complete"  // 결제 완료 (고객에게)
  | "shipping_started"; // 배송 시작 (고객에게)

interface KakaoNotifyParams {
  type: KakaoNotifyType;
  phone: string;
  orderNumber: string;
  userName?: string;
  productName?: string;
  totalPrice?: number;
  proofUrl?: string;
  orderId?: string;
}

function buildMessage(params: KakaoNotifyParams): string {
  const { type, orderNumber, userName, productName, totalPrice, proofUrl } = params;

  switch (type) {
    case "order_received":
      return `[주보라] 새 주문이 접수되었습니다.\n주문번호: ${orderNumber}\n고객명: ${userName}\n제품: ${productName}\n\n관리자 페이지에서 확인해주세요.`;
    case "proof_sent":
      return `[주보라] 시안이 완성되었습니다! 🎉\n주문번호: ${orderNumber}\n\n아래 링크에서 시안을 확인하고 승인해주시면 제작이 시작됩니다.\n시안 확인하기 → ${proofUrl}`;
    case "payment_complete":
      return `[주보라] 결제가 완료되었습니다.\n주문번호: ${orderNumber}\n결제금액: ${totalPrice?.toLocaleString()}원\n\n제작이 시작됩니다. 완료 시 배송 안내 드릴게요!`;
    case "shipping_started":
      return `[주보라] 배송이 시작되었습니다! 🚚\n주문번호: ${orderNumber}\n배송 현황은 마이페이지에서 확인하세요.`;
    default:
      return "";
  }
}

export async function sendKakaoNotify(params: KakaoNotifyParams): Promise<boolean> {
  const apiKey = process.env.KAKAO_BIZMESSAGE_API_KEY;
  const senderKey = process.env.KAKAO_SENDER_KEY;

  // 카카오 API 키 없으면 콘솔 출력만 (개발용)
  if (!apiKey || !senderKey) {
    console.log("[카카오 알림톡 시뮬레이션]", buildMessage(params));
    return true;
  }

  try {
    // 카카오 비즈메시지 API (실제 운영 시 사용)
    // https://bizmessage.kakao.com/
    const res = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: {
          to: params.phone.replace(/-/g, ""),
          from: process.env.KAKAO_SENDER_PHONE,
          kakaoOptions: {
            senderKey,
            templateCode: params.type,
            variables: { "#{주문번호}": params.orderNumber },
          },
          text: buildMessage(params),
        },
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[카카오 알림톡 오류]", err);
    return false;
  }
}
