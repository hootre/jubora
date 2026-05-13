"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getUnreadOrders, getUnreadOrdersForAdmin, markAsRead } from "@/lib/firestore";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABEL } from "@/types/order";

const ADMIN_EMAIL = "mm1895@naver.com";
const POLL_INTERVAL = 30_000;
const DEFAULT_SHOW_COUNT = 4;

export default function NotificationBell() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const orders = isAdmin
        ? await getUnreadOrdersForAdmin()
        : await getUnreadOrders(user.uid);
      setNotifications(orders);
      setReadIds((prev) => {
        const ids = new Set(orders.map((o) => o.id));
        const next = new Set<string>();
        prev.forEach((id) => { if (ids.has(id)) next.add(id); });
        return next;
      });
    } catch (e) {
      console.error("알림 로드 실패:", e);
    }
  };

  useEffect(() => {
    if (!user) { setNotifications([]); setReadIds(new Set()); return; }
    fetchNotifications();
    const timer = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [user?.uid]);

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
    if (readIds.has(o.id)) return sum;
    if (isAdmin) {
      return sum + (o.unreadByAdmin ?? 0) + (o.status === "pending" ? 1 : 0);
    }
    return sum + (o.unreadByCustomer ?? 0);
  }, 0);

  const handleItemClick = async (order: Order) => {
    setReadIds((prev) => new Set(prev).add(order.id));
    try {
      await markAsRead(order.id, isAdmin ? "admin" : "customer");
    } catch (e) {
      console.error("읽음 처리 실패:", e);
    }
    setOpen(false);
    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push(`/order/${order.id}`);
    }
  };

  const handleMarkAllRead = async () => {
    setLoading(true);
    setReadIds(new Set(notifications.map((o) => o.id)));
    try {
      await Promise.all(
        notifications.map((o) => markAsRead(o.id, isAdmin ? "admin" : "customer"))
      );
    } catch (e) {
      console.error("전체 읽음 처리 실패:", e);
    }
    setLoading(false);
  };

  if (!user) return null;

  const getLastMessage = (order: Order): string => {
    const convs = order.conversations ?? [];
    if (convs.length === 0) return "새로운 알림이 있습니다.";
    const last = convs[convs.length - 1];
    if (isAdmin && order.status === "pending" && (order.unreadByAdmin ?? 0) === 0) {
      return "🆕 신규 주문이 접수되었습니다.";
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

  const visibleNotifications = showAll ? notifications : notifications.slice(0, DEFAULT_SHOW_COUNT);
  const hasMore = notifications.length > DEFAULT_SHOW_COUNT;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => { setOpen(!open); if (!open) { fetchNotifications(); setShowAll(false); } }}
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

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
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

          <div className={showAll ? "max-h-96 overflow-y-auto" : ""}>
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">새로운 알림이 없습니다.</p>
              </div>
            ) : (
              <>
                {visibleNotifications.map((order) => {
                  const isRead = readIds.has(order.id);
                  const unreadCount = isAdmin
                    ? (order.unreadByAdmin ?? 0) + (order.status === "pending" ? 1 : 0)
                    : (order.unreadByCustomer ?? 0);
                  return (
                    <button
                      key={order.id}
                      onClick={() => handleItemClick(order)}
                      className={`w-full flex items-start gap-3 px-4 py-3 transition-colors border-b border-gray-50 text-left ${
                        isRead
                          ? "bg-gray-50 opacity-60 hover:opacity-80"
                          : "hover:bg-primary-50"
                      }`}
                    >
                      <div className="shrink-0 mt-0.5 w-8">
                        {!isRead && (
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-xs font-bold">
                            {unreadCount}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-xs font-bold truncate ${isRead ? "text-gray-400" : "text-gray-800"}`}>
                            {isAdmin ? order.userName : "주보라"}
                          </span>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {getTimeAgo(order.updatedAt)}
                          </span>
                        </div>
                        <p className={`text-xs mb-1 truncate ${isRead ? "text-gray-400" : "text-gray-600"}`}>
                          {getLastMessage(order)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-mono">
                            {order.orderNumber}
                          </span>
                          {!isRead && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              order.status === "proof_sent" ? "bg-indigo-50 text-indigo-600" :
                              order.status === "proof_revision" ? "bg-orange-50 text-orange-600" :
                              "bg-gray-100 text-gray-500"
                            }`}>
                              {ORDER_STATUS_LABEL[order.status]}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {hasMore && !showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full flex items-center justify-center gap-1 py-3 text-xs text-primary-600 font-semibold hover:bg-primary-50 transition-colors border-t border-gray-100"
                  >
                    더보기+
                    <ChevronDown size={14} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
