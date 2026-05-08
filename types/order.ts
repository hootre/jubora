export type OrderStatus =
  | "pending"         // 주문 접수
  | "confirming"      // 주문 확인 중
  | "designing"       // 시안 제작 중
  | "proof_sent"      // 시안 전달 완료
  | "proof_approved"  // 시안 승인
  | "proof_revision"  // 수정 요청
  | "paid"            // 결제 완료
  | "producing"       // 제작 중
  | "shipping"        // 배송 중
  | "delivered";      // 배송 완료

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "주문 접수",
  confirming: "주문 확인 중",
  designing: "시안 제작 중",
  proof_sent: "시안 전달 완료",
  proof_approved: "결제 대기",
  proof_revision: "수정 요청",
  paid: "결제 확인중",
  producing: "출력 중",
  shipping: "배송 중",
  delivered: "배송 완료",
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirming: "bg-blue-100 text-blue-800",
  designing: "bg-purple-100 text-purple-800",
  proof_sent: "bg-indigo-100 text-indigo-800",
  proof_approved: "bg-green-100 text-green-800",
  proof_revision: "bg-orange-100 text-orange-800",
  paid: "bg-amber-100 text-amber-800",
  producing: "bg-cyan-100 text-cyan-800",
  shipping: "bg-blue-100 text-blue-800",
  delivered: "bg-gray-100 text-gray-800",
};

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;

  product: {
    productId?: string;          // constants/products.ts 의 제품 ID
    productName?: string;        // 제품명
    orderType: string;           // "banner" | "poster" | "leaflet" | "sticker" | "namecard" | "envelope" | "inquiry"
    type?: string;               // 레거시: "horizontal" | "vertical"
    material?: string;
    width?: number;
    height?: number;
    quantity: number;
    options?: string[];
    specs?: Record<string, string>;  // 선택한 스펙 (size, paper, coating 등)
  };

  design: {
    templateId?: string;
    previewImageUrl?: string;
    userRequirements?: string;
    attachedImages?: string[];   // 참고 이미지 (dataURL)
  };

  delivery: {
    address: string;
    addressDetail: string;
    zipCode: string;
    memo?: string;
    requestedDate?: string;
  };

  pricing: {
    productPrice: number;
    deliveryFee: number;
    totalPrice: number;
  };

  status: OrderStatus;

  proof?: {
    imageUrl: string;
    sentAt: string;
    approvedAt?: string;
    revisionNote?: string;
  };

  payment?: {
    method: string;
    paymentId: string;       // PortOne 결제 고유 ID (구 Toss paymentKey 대체)
    paidAt: string;
    amount: number;
    pgProvider?: string;     // PG사 (KAKAOPAY, NAVERPAY, TOSSPAY, KG_INICIS 등)
  };

  adminMessage?: string;     // 관리자 메시지 (시안제작중 등 상태 변경 시)

  shipping?: {
    courier: string;         // 택배사 (CJ대한통운, 한진택배 등)
    trackingNumber: string;  // 송장번호
    shippedAt: string;       // 발송일
  };

  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnailUrl: string;
  tags: string[];
  popular?: boolean;
}
