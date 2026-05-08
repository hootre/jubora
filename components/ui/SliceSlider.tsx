"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SlideData {
  bg: string;
  bgImage?: string;
  image?: string;
  subtitle: string;
  title: string;
  desc: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
}

const AUTO_INTERVAL = 5000;

export default function SliceSlider({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setPrev(current);
      setCurrent(idx);

      // 크로스페이드 완료 후 정리
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 800);
    },
    [animating, current]
  );

  const goNext = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // 자동 전환
  useEffect(() => {
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext]);

  const pause = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => { timerRef.current = setInterval(goNext, AUTO_INTERVAL); };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(260px, 50vw, 520px)" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* ── 슬라이드 스택 (모든 슬라이드를 렌더, opacity로 전환) ── */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === current;
        const isPrev = idx === prev;
        const isVisible = isCurrent || isPrev;

        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              opacity: isCurrent ? 1 : 0,
              transition: isVisible ? "opacity 800ms ease-in-out" : "none",
              zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {/* 배경 */}
            <div
              className={`absolute inset-0 ${slide.bg}`}
              style={slide.bgImage ? {
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              } : {}}
            />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/10" />

            {/* 콘텐츠 */}
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
              {/* 왼쪽 텍스트 */}
              <div
                className="max-w-[280px] sm:max-w-lg flex-shrink-0"
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent ? "translateY(0)" : "translateY(20px)",
                  transition: isCurrent
                    ? "opacity 600ms ease 300ms, transform 600ms ease 300ms"
                    : "opacity 400ms ease, transform 400ms ease",
                }}
              >
                <p className="text-xs sm:text-sm font-medium text-blue-200 mb-2 sm:mb-3">{slide.subtitle}</p>
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 text-white drop-shadow-lg">
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < slide.title.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 leading-relaxed drop-shadow">
                  {slide.desc.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < slide.desc.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Link
                    href={slide.primaryBtn.href}
                    className="bg-white text-blue-700 hover:bg-blue-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-lg"
                  >
                    {slide.primaryBtn.label}
                  </Link>
                  {slide.secondaryBtn && (
                    <Link
                      href={slide.secondaryBtn.href}
                      className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-colors backdrop-blur-sm"
                    >
                      {slide.secondaryBtn.label}
                    </Link>
                  )}
                </div>
              </div>

              {/* 오른쪽 이미지 */}
              {slide.image && (
                <div
                  className="hidden md:flex flex-1 justify-end items-center pl-8"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    transform: isCurrent ? "translateX(0) scale(1)" : "translateX(30px) scale(0.95)",
                    transition: isCurrent
                      ? "opacity 600ms ease 400ms, transform 600ms ease 400ms"
                      : "opacity 300ms ease, transform 300ms ease",
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title.replace("\n", " ")}
                    className="max-h-[340px] w-auto object-contain drop-shadow-2xl"
                    draggable={false}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* ── 좌우 화살표 ── */}
      <button
        onClick={goPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="이전"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="다음"
      >
        <ChevronRight size={16} />
      </button>

      {/* ── 인디케이터 ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
