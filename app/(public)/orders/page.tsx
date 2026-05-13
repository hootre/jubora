"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getMyOrders } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import { ClipboardList, Loader2 } from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (!u) {
        router.push("/login?redirect=/orders");
        return;
      }
      setOrdersLoading(true);
      try {
        const myOrders = await getMyOrders(u.uid);
        setOrders(myOrders);
      } catch {}
      finally { setOrdersLoading(false); }
    });

    const timeout = setTimeout(() => setAuthLoading(false), 4000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [router]);

  const hasOrders = orders.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList size={22} className="text-primary-600" />
          주문 / 배송 내역
        </h1>
        {user && (
          <p className="text-gray-500 text-sm mt-1">
            {user.displayName ?? user.email}님의 접수된 주문 내역입니다.
          </p>
        )}
      </div>

      {authLoading || ordersLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-primary-500" size={28} /></div>
      ) : !hasOrders ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">\ud83d\udced</p>
          <p className="text-gray-500 font-medium mb-2">접수된 주문이 없어요</p>
          <p className="text-gray-400 text-sm mb-8">시안을 선택하고 주문서를 작성하면 여기에 표시돼요.</p>
          <Link href="/templates" className="btn-primary inline-block">시안 보러 가기</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id}
              onClick={() => router.push(`/order/${order.id}`)}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 hover:shadow-md cursor-pointer transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-1">{order.orderNumber}</p>
                  <p className="font-bold text-gray-900">
                    {order.product?.productName || `${order.product?.width}\u00d7${order.product?.height}cm`} \u00b7 {order.product?.quantity}개
                  </p>
                </div>
                <span className={`badge ${ORDER_STATUS_COLOR[order.status]}`}>
                  {ORDER_STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* 시안 미리보기 */}
              {(order.proof?.imageUrl || order.design?.previewImageUrl) && (
                <div className="flex gap-2 mb-3">
                  {order.design?.previewImageUrl && (
                    <img src={order.design.previewImageUrl} alt="주문 이미지"
                      className="h-14 w-auto rounded border border-gray-200 object-contain bg-gray-50" />
                  )}
                  {order.proof?.imageUrl && (
                    <img src={order.proof.imageUrl} alt="시안"
                      className="h-14 w-auto rounded border border-gray-200 object-contain bg-gray-50" />
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="font-bold text-primary-600">
                  {order.pricing?.totalPrice > 0 ? `${order.pricing.totalPrice.toLocaleString()}원` : "—"}
                </p>
                <div className="flex items-center gap-2">
                  {order.status === "proof_sent" && (
                    <Link href={`/order/${order.id}/proof`}
                      onClick={e => e.stopPropagation()}
                      className="text-xs bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-primary-200 transition-colors">
                      시안 확인
                    </Link>
                  )}
                  {order.status === "proof_approved" && (
                    <Link href={`/order/${order.id}/payment`}
                      onClick={e => e.stopPropagation()}
                      className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                      입금확인요청
                    </Link>
                  )}
                  <span className="text-xs text-gray-400">{order.createdAt?.slice(0, 10)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
