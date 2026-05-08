"use client";
import { useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

export default function ImageLightbox({
  src, alt, onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors">
        <X size={24} />
      </button>
      <img
        src={src} alt={alt ?? "이미지"}
        className="relative max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// 클릭 가능한 썸네일 이미지 (클릭 시 라이트박스 열기)
export function ClickableImage({
  src, alt, className, onOpen,
}: {
  src: string;
  alt?: string;
  className?: string;
  onOpen: (src: string) => void;
}) {
  return (
    <div className="relative group cursor-zoom-in" onClick={() => onOpen(src)}>
      <img src={src} alt={alt ?? "이미지"} className={className} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
        <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
      </div>
    </div>
  );
}
