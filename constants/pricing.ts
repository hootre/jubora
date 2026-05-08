// 주보라 가격 상수

export const MATERIALS = [
  { id: "cloth",    name: "천 현수막", pricePerM2: 5000 },
  { id: "nonwoven", name: "부직포",    pricePerM2: 7000 },
] as const;

export const OPTIONS = [
  { id: "punching",   name: "펀칭 (기본)",   price: 0,    type: "fixed" as const },
  { id: "wood_rope",  name: "나무+끈",       price: 5000, type: "fixed" as const },
  { id: "rope_all",   name: "사방 끈처리",   price: 2000, type: "perMeter" as const },
] as const;

export const PRODUCT_TYPES = [
  { id: "horizontal", name: "가로형 현수막" },
  { id: "vertical",   name: "세로형 현수막" },
] as const;

export const DELIVERY_FEE = 4000;   // 기본 배송비
export const FREE_DELIVERY_THRESHOLD = 100000; // 무료배송 기준

export function calcPrice(
  materialId: string,
  widthCm: number,
  heightCm: number,
  quantity: number,
  optionIds: string[]
): { productPrice: number; deliveryFee: number; totalPrice: number } {
  const m2 = (widthCm / 100) * (heightCm / 100);
  const mat = MATERIALS.find((m) => m.id === materialId) ?? MATERIALS[0];

  // 둘레(m) — 사방 끈처리 가격 계산용
  const perimeterM = 2 * (widthCm + heightCm) / 100;

  const optTotal = optionIds.reduce((sum, oid) => {
    const opt = OPTIONS.find((o) => o.id === oid);
    if (!opt) return sum;
    if (opt.type === "perMeter") return sum + opt.price * perimeterM;
    return sum + opt.price;
  }, 0);

  const productPrice = Math.ceil((mat.pricePerM2 * m2 + optTotal) * quantity);
  const deliveryFee = productPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return { productPrice, deliveryFee, totalPrice: productPrice + deliveryFee };
}
