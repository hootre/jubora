"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { getMyOrders } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/types/order";
import {
  Loader2, LogOut, ClipboardList, X,
} from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");

  // 이미지 확대 모달
  const [zoomImage, setZoomImage] = useState<{ url: string; label: string } | null>(null);

  const loadOrders = async (uid: string) => {
    setOrdersLoading(true);
    try {
      const myOrders = await getMyOrders(uid);
      setOrders(myOrders);
    } catch (e: any) {
      console.error("[mypage] getMyOrders 실패:", e?.code, e?.message, e);
      setError(`주문 내역을 불러오는 중 오류가 발생했어요. (${e?.code ?? e?.message ?? "unknown"})`);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/login?redirect=/mypage");
        return;
      }
      setUser(u);
      setLoading(false);
      await loadOrders(u.uid);
    });

    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [router]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
      <Loader2 size={36} className="animate-spin text-primary-600" />
      <p className="text-sm text-gray-400">로그인 정보 확인 중...</p>
    </div>
  );

  return (
    <div>
      {/* 페이지 히어로 */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm mb-2">홈 › 마이페이지</p>
          <h1 className="text-2xl md:text-3xl font-bold">마이페이지</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 프로필 */}
      <div className="card mb-8">
        <div className="flex items-center gap-4">
          {user?.photoURL
            ? <img src={user.photoURL} alt="" className="w-14 h-14 rounded-full ring-2 ring-primary-100 shrink-0" />
            : <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shrink-0">
                {(user?.displayName ?? user?.email ?? "?")[0].toUpperCase()}
              </div>
          }
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">{user?.displayName ?? user?.email}</h1>
            <p className="text-gray-500 text-sm truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href="/orders"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold hover:bg-primary-100 transition-colors">
            <ClipboardList size={15} />
            주문내역
          </Link>
          <button onClick={() => signOut(auth).then(() => router.push("/"))}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <LogOut size={15} />
            로그아웃
          </button>
        </div>
      </div>

      {/* 주문 내역 */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">내 주문 내역</h2>

      {ordersLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-primary-500" />
        </div>
      ) : error ? (
        <div className="card text-center py-10 text-red-500 text-sm">{error}</div>
      ) : orders.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-400 text-4xl mb-4">📭</p>
          <p className="text-gray-500 mb-5">아직 주문 내역이 없어요.</p>
          <Link href="/templates" className="btn-primary inline-block">시안 보러 가기</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id}
              onClick={() => router.push(`/order/${order.id}`)}
              className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-1">{order.orderNumber}</p>
                  <p className="font-bold text-gray-900">
                    {order.product.width}×{order.product.height}cm – {order.product.quantity}개
                  </p>
                </div>
                <span className={`badge ${ORDER_STATUS_COLOR[order.status]}`}>
                  {ORDER_STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* 시안 이미지 미리보기 */}
              {(order.proof?.imageUrl || order.design?.previewImageUrl) && (
                <div className="flex gap-2 mb-3">
                  {order.design?.previewImageUrl && (
                    <img
                      src={order.design.previewImageUrl}
                      alt="주문 이미지"
                      className="h-16 w-auto rounded border border-gray-200 object-contain bg-gray-50 cursor-zoom-in"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage({ url: order.design.previewImageUrl!, label: "주문 시 첨부 이미지" });
                      }}
                    />
                  )}
                  {order.proof?.imageUrl && (
                    <img
                      src={order.proof.imageUrl}
                      alt="시안"
                      className="h-16 w-auto rounded border border-gray-200 object-contain bg-gray-50 cursor-zoom-in"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage({ url: order.proof!.imageUrl, label: "담당자 제작 시안" });
                      }}
                    />
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="font-bold text-primary-600">{order.pricing.totalPrice.toLocaleString()}원</p>
                <span className="text-xs text-gray-400">{order.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* ══ 이미지 확대 모달 ══ */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setZoomImage(null)} />
          <div className="relative max-w-3xl max-h-[90vh] flex flex-col items-center">
            <button onClick={() => setZoomImage(null)}
              className="absolute -top-3 -right-3 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-lg transition-colors">
              <X size={20} />
            </button>
            <img
              src={zoomImage.url}
              alt={zoomImage.label}
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain bg-white"
            />
            <p className="text-white text-sm mt-3 bg-black/40 px-4 py-1.5 rounded-full">{zoomImage.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
