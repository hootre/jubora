"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getUnreadOrders, getUnreadOrdersForAdmin, markAsRead } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL } from "@/types/order";

const ADMIN_EMAIL = "mm1895@naver.com";
const POLL_INTERVAL = 30_000; // 30초마다 폴링

export default function NotificationBell() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  // 인증 상태 감지
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  // 알림 데이터 로드
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const orders = isAdmin
        ? await getUnreadOrdersForAdmin()
        : await getUnreadOrders(user.uid);
      setNotifications(orders);
    } catch (e) {
      console.error("알림 로드 실패:", e);
    }
  };

  // 로그인 후 & 주기적 폴링
  useEffect(() => {
    if (!user) { setNotifications([]); return; }
    fetchNotifications();
    const timer = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [user?.uid]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const totalUnread = notifications.reduce((sum, o) => {
    if (isAdmin) {
      return sum + (o.unreadByAdmin ?? 0) + (o.unreadByCustomer ?? 0);
    }
    return sum + (o.unreadByCustomer ?? 0);
  }, 0);

  const handleItemClick = async (order: Order) => {
    // 읽음 처리
    try {
      await markAsRead(order.id, isAdmin ? "admin" : "customer");
      setNotifications((prev) =>
        prev.filter((o) => o.id !== order.id)
      );
    } catch (e) {
      console.error("읽음 처리 실패:", e);
    }
    setOpen(false);

    // 해당 주문으로 이동
    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push(`/order/${order.id}`);
    }
  };

  const handleMarkAllRead = async () => {
    setLoading(true);
    try {
      await Promise.all(
        notifications.map((o) => markAsRead(o.id, isAdmin ? "admin" : "customer"))
      );
      setNotifications([]);
    } catch (e) {
      console.error("전체 읽음 처리 실패:", e);
    }
    setLoading(false);
  };

  if (!user) return null;

  // 마지막 메시지 내용 가져오기
  const getLastMessage = (order: Order): string => {
    const convs = order.conversations ?? [];
    if (convs.length === 0) return "새로운 알림이 있습니다.";
    const last = convs[convs.length - 1];
    // 관리자: 고객이 보낸 메시지 vs 고객이 안 읽은 메시지 구분
    if (isAdmin && (order.unreadByCustomer ?? 0) > 0 && (order.unreadByAdmin ?? 0) === 0) {
      return "📨 고객이 아직 메시지를 확인하지 않았습니다.";
    }
    if (last.type === "proof") return "📎 시안이 전달되었습니다.";
    if (last.type === "revision") return "✏️ 수정 요청이 있습니다.";
    if (last.type === "approve") return "✅ 시안이 승인되었습니다.";
    if (last.imageUrl) return "📎 이미지가 전달되었습니다.";
    return last.content.length > 40 ? last.content.slice(0, 40) + "…" : last.content;
  };

  const getTimeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "방금";
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* 벨 아이콘 */}
      <button
        onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}
        className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600 transition-colors"
      >
        <Bell size={20} />
        <span className="text-[10px]">알림</span>
        {totalUnread > 0 && (
          <span className="absolute -top-0.5 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 animate-pulse">
            {totalUnread > 99 ? "99+" : totalUnread}
          </span>
        )}
      </button>

      {/* 드롭다운 패널 */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-gray-800">
              알림
              {totalUnread > 0 && (
                <span className="ml-2 text-xs font-normal text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  {totalUnread}개 새 메시지
                </span>
              )}
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={loading}
                className="text-xs text-gray-400 hover:text-primary-600 transition-colors disabled:opacity-50"
              >
                모두 읽음
              </button>
            )}
          </div>

          {/* 알림 목록 */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">새로운 알림이 없습니다.</p>
              </div>
            ) : (
              notifications.map((order) => {
                const unreadCount = isAdmin
                  ? (order.unreadByAdmin ?? 0) + (order.unreadByCustomer ?? 0)
                  : (order.unreadByCustomer ?? 0);
                return (
                  <button
                    key={order.id}
                    onClick={() => handleItemClick(order)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-50 text-left"
                  >
                    {/* 뱃지 */}
                    <div className="shrink-0 mt-0.5">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-xs font-bold">
                        {unreadCount}
                      </span>
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-gray-800 truncate">
                          {isAdmin
                          ? ((order.unreadByAdmin ?? 0) > 0
                            ? order.userName
                            : `→ ${order.userName}`)
                          : "주보라"}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {getTimeAgo(order.updatedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">
                        {getLastMessage(order)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {order.orderNumber}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          order.status === "proof_sent" ? "bg-indigo-50 text-indigo-600" :
                          order.status === "proof_revision" ? "bg-orange-50 text-orange-600" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {ORDER_STATUS_LABEL[order.status]}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* 하단 링크 */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => { setOpen(false); router.push(isAdmin ? "/admin" : "/mypage"); }}
                className="w-full text-center text-xs text-primary-600 font-semibold hover:underline"
              >
                {isAdmin ? "관리자 페이지에서 확인" : "마이페이지에서 확인"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
