"use client";
import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "banner", label: "⛪ 현수막·배너" },
  { id: "print",  label: "🖨️ 인쇄물 (전단지)" },
  { id: "envelope", label: "✉️ 봉투" },
  { id: "sticker",  label: "🏷️ 스티커" },
];

const BANNER_ROWS = [
  { height: "70cm 이하", prices: ["22,000", "24,000", "27,000", "32,000", "37,000", "42,000", "47,000", "52,000"], extra: "1m당 +5,000원" },
  { height: "90cm",      prices: ["24,000", "26,000", "30,000", "36,000", "42,000", "48,000", "54,000", "60,000"], extra: "1m당 +6,000원" },
  { height: "105cm",     prices: ["25,000", "28,000", "35,000", "42,000", "49,000", "56,000", "63,000", "70,000"], extra: "1m당 +7,000원" },
  { height: "120cm",     prices: ["28,000", "32,000", "40,000", "48,000", "56,000", "64,000", "72,000", "80,000"], extra: "1m당 +8,000원" },
  { height: "150cm",     prices: ["30,000", "36,000", "45,000", "54,000", "63,000", "72,000", "81,000", "90,000"], extra: "1m당 +9,000원" },
];

const PRINT_ROWS = [
  { qty: "1연",  prices: ["85,000", "95,000", "120,000", "140,000", "65,000", "75,000", "100,000", "120,000"] },
  { qty: "2연",  prices: ["110,000", "130,000", "160,000", "190,000", "90,000", "105,000", "135,000", "160,000"] },
  { qty: "3연",  prices: ["130,000", "155,000", "195,000", "230,000", "110,000", "130,000", "165,000", "200,000"] },
  { qty: "5연",  prices: ["180,000", "215,000", "270,000", "325,000", "155,000", "185,000", "230,000", "280,000"] },
];

const BANNER_PRODUCTS = [
  { name: "X배너",          size: "60×160cm",    price: "25,000원~", note: "거치대 포함 시 별도" },
  { name: "롤업배너",        size: "85×200cm",    price: "45,000원~", note: "거치대 포함 시 별도" },
  { name: "현수막형 세로",   size: "60cm×1.5~2m", price: "현수막 가격 적용", note: "링 포함" },
];

const ENVELOPE_ROWS = [
  { type: "소봉투 (C6)", qty100: "35,000", qty500: "60,000", qty1000: "90,000" },
  { type: "중봉투 (DL)", qty100: "40,000", qty500: "70,000", qty1000: "105,000" },
  { type: "대봉투 (C5)", qty100: "50,000", qty500: "85,000", qty1000: "130,000" },
];

const STICKER_ROWS = [
  { type: "원형 스티커 Ø50mm", qty100: "15,000", qty500: "35,000", qty1000: "55,000" },
  { type: "사각 스티커 50×80mm", qty100: "18,000", qty500: "40,000", qty1000: "62,000" },
  { type: "투명 스티커", qty100: "22,000", qty500: "50,000", qty1000: "78,000" },
];

export default function PricePage() {
  const [activeTab, setActiveTab] = useState("banner");

  return (
    <div>
      {/* 히어로 */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/60 text-sm mb-2">홈 › 가격안내</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">가격안내</h1>
          <p className="text-white/80 text-base">현수막·배너·인쇄물 사이즈별 가격을 한눈에 확인하세요</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 탭 */}
        <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-1">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border-2
                ${activeTab === tab.id
                  ? "bg-primary-600 border-primary-600 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-primary-300"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── 현수막·배너 ── */}
        {activeTab === "banner" && (
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-4 flex items-center gap-2">
              <span className="text-primary-600">⛪</span> 현수막 가격표
            </h2>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              높이(세로) × 길이(가로) 기준. 기본 소재는 <strong className="text-gray-700">타포린(방수)</strong>이며, 인쇄·링 작업 포함 가격입니다.
            </p>
            <p className="text-xs text-gray-400 mb-2 sm:hidden">👉 좌우로 스크롤하여 전체 가격을 확인하세요</p>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full text-sm bg-white min-w-[640px]">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="text-left px-4 py-3 rounded-tl-2xl font-bold">높이(세로)</th>
                    {["3m 이하","4m","5m","6m","7m","8m","9m","10m"].map(h => (
                      <th key={h} className="px-3 py-3 text-center font-bold whitespace-nowrap">{h}</th>
                    ))}
                    <th className="px-3 py-3 text-center font-bold rounded-tr-2xl whitespace-nowrap">10m 초과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BANNER_ROWS.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800 bg-gray-50 whitespace-nowrap">{row.height}</td>
                      {row.prices.map((p, j) => (
                        <td key={j} className="px-3 py-3 text-center text-gray-700 whitespace-nowrap">{p}원</td>
                      ))}
                      <td className="px-3 py-3 text-center text-orange-500 font-semibold text-xs whitespace-nowrap">{row.extra}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-700">150cm 초과</td>
                    <td colSpan={9} className="px-3 py-3 text-center text-orange-500 font-semibold">1㎡당 10,000원 추가</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 border-l-2 border-gray-200 pl-3 mb-6">
              ※ 비규격 주문 시 재단비 <strong className="text-orange-500">2,000~5,000원</strong> 추가 · 배송비 별도 (50,000원 이상 무료)
            </p>
            <div className="bg-blue-50 border-l-4 border-primary-500 rounded-r-xl p-4 text-sm text-gray-700 leading-relaxed mb-8">
              <strong className="text-primary-700">💡 주문 Tip</strong><br />
              가장 많이 주문하시는 사이즈는 <strong>90cm × 5m (30,000원)</strong>입니다. 교회 입구·강단 설치에 가장 적합한 규격이에요.<br />
              절기 현수막은 성탄절·부활절 시즌 전에 미리 주문하시면 여유 있게 준비하실 수 있습니다.
            </div>

            <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-4 mt-10">
              📌 <span className="text-primary-600">세로형 배너 참고 가격</span>
            </h2>
            <p className="text-sm text-gray-500 mb-4">세로형 배너(X배너·롤업배너)는 규격이 다양하므로 주문 시 문의해주세요.</p>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-2">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    {["품목","규격","기본가","비고"].map(h => (
                      <th key={h} className="px-4 py-3 text-center font-bold first:text-left first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BANNER_PRODUCTS.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800">{row.name}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.size}</td>
                      <td className="px-4 py-3 text-center font-bold text-primary-600">{row.price}</td>
                      <td className="px-4 py-3 text-center text-gray-500 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 인쇄물 ── */}
        {activeTab === "print" && (
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-4">
              🖨️ <span className="text-primary-600">칼라 전단지 가격표</span>
            </h2>
            <p className="text-sm text-gray-500 mb-4">100g 아트지 기준 / 1연 수량: A4 4,000매 · A3 2,000매 · B5 8,000매 · B4 4,000매</p>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-2">
              <table className="w-full text-sm bg-white min-w-[700px]">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="text-left px-4 py-3 rounded-tl-2xl font-bold">수량(연)</th>
                    {["A4 단면","A4 양면","A3 단면","A3 양면","B5 단면","B5 양면","B4 단면","B4 양면"].map(h => (
                      <th key={h} className="px-3 py-3 text-center font-bold whitespace-nowrap last:rounded-tr-2xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PRINT_ROWS.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800 bg-gray-50">{row.qty}</td>
                      {row.prices.map((p, j) => (
                        <td key={j} className="px-3 py-3 text-center text-gray-700 whitespace-nowrap">{p}원</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 border-l-2 border-gray-200 pl-3">
              ※ 인쇄 해상도 300DPI 이상 파일 제출 시 선명한 출력물 보장 · 배송비 별도
            </p>
          </div>
        )}

        {/* ── 봉투 ── */}
        {activeTab === "envelope" && (
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-4">
              ✉️ <span className="text-primary-600">봉투 가격표</span>
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-2">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    {["봉투 종류","100매","500매","1,000매"].map(h => (
                      <th key={h} className="px-4 py-3 text-center font-bold first:text-left first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ENVELOPE_ROWS.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800 bg-gray-50">{row.type}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{row.qty100}원</td>
                      <td className="px-4 py-3 text-center text-gray-700">{row.qty500}원</td>
                      <td className="px-4 py-3 text-center font-semibold text-primary-600">{row.qty1000}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 border-l-2 border-gray-200 pl-3">※ 교회 로고 인쇄 포함 가격 · 별도 문의 가능</p>
          </div>
        )}

        {/* ── 스티커 ── */}
        {activeTab === "sticker" && (
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-4">
              🏷️ <span className="text-primary-600">스티커 가격표</span>
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-2">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    {["스티커 종류","100매","500매","1,000매"].map(h => (
                      <th key={h} className="px-4 py-3 text-center font-bold first:text-left first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {STICKER_ROWS.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800 bg-gray-50">{row.type}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{row.qty100}원</td>
                      <td className="px-4 py-3 text-center text-gray-700">{row.qty500}원</td>
                      <td className="px-4 py-3 text-center font-semibold text-primary-600">{row.qty1000}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 border-l-2 border-gray-200 pl-3">※ 방수 코팅 처리 포함 · 칼선 재단 가능</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg p-8 text-center text-white">
          <h3 className="text-xl font-extrabold mb-2">지금 바로 주문하시겠어요?</h3>
          <p className="text-white/80 text-base mb-6">빠른 제작·전국 배송으로 합리적인 가격에 제작해드립니다</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/order" className="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              📋 주문하기
            </Link>
            <Link href="/guide" className="bg-white/15 border border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/25 transition-colors">
              이용안내 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
