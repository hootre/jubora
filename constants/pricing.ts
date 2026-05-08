// 주보라 가격 상수

export const MATERIALS = [
  { id: "waterproof", name: "방수 현수막", pricePerM2: 5500 },
  { id: "mesh",       name: "메쉬 현수막",  pricePerM2: 7000 },
  { id: "vinyl",      name: "실사 출력",    pricePerM2: 8000 },
  { id: "fabric",     name: "천 현수막",    pricePerM2: 12000 },
] as const;

export const OPTIONS = [
  { id: "eyelets",  name: "에코링 (4개)",   price: 2000 },
  { id: "rope",     name: "끈 추가",         price: 1500 },
  { id: "pocket",   name: "주머니 처리",     price: 3000 },
  { id: "laminate", name: "라미네이팅",      price: 4000 },
] as const;

export const PRODUCT_TYPES = [
  { id: "horizontal", name: "가로형 현수막" },
  { id: "vertical",   name: "세로형 현수막" },
  { id: "banner",     name: "X배너" },
  { id: "rollup",     name: "롤업배너" },
  { id: "print",      name: "인쇄물" },
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
  const optTotal = optionIds.reduce((sum, oid) => {
    const opt = OPTIONS.find((o) => o.id === oid);
    return sum + (opt?.price ?? 0);
  }, 0);

  const productPrice = Math.ceil(mat.pricePerM2 * m2 * quantity + optTotal * quantity);
  const deliveryFee = productPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return { productPrice, deliveryFee, totalPrice: productPrice + deliveryFee };
}
