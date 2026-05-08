"use client";
import { useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    num: "01", title: "시안 선택 또는 이미지 업로드",
    icon: "🖼️",
    desc: "시안 갤러리에서 마음에 드는 디자인을 골라주세요. 직접 만든 이미지가 있다면 주문서에서 바로 업로드할 수도 있습니다. 교회 로고·사진 파일을 미리 준비하시면 더 빠르게 진행됩니다.",
  },
  {
    num: "02", title: "주문서 작성",
    icon: "📋",
    desc: "규격(가로×세로), 수량, 재질, 배송지를 입력하고 주문을 접수하세요. 추가 요구사항은 기타란에 상세히 적어주시면 정확한 제작이 가능합니다.",
    items: [
      "규격(가로×세로), 수량, 원하시는 문구를 정확히 입력",
      "한글·워드로 작성한 원고가 있으면 첨부파일로 업로드 가능",
      "용량이 큰 파일(20MB 이상)은 카카오톡으로 보내주세요",
      "특별히 원하시는 사진은 원본 파일(JPG·PNG 권장)로 첨부",
    ],
  },
  {
    num: "03", title: "시안 확인",
    icon: "👁️",
    desc: "담당자가 시안을 완성하면 카카오톡 알림으로 시안 확인 링크를 보내드려요. 시안을 확인하고 승인하거나 수정 요청을 해주세요.",
    note: "기본 수정은 2회까지 무료이며, 최종 시안 승인 후 인쇄·제작이 진행됩니다.",
  },
  {
    num: "04", title: "결제",
    icon: "💳",
    desc: "시안 승인 후 결제 페이지에서 카드, 카카오페이, 토스페이 등으로 간편하게 결제하세요.",
    warn: "결제 완료 후 즉시 제작이 시작됩니다. 결제 후 취소·환불은 제작 전에만 가능합니다.",
  },
  {
    num: "05", title: "제작 및 배송",
    icon: "🚚",
    desc: "시안 확인 후 48시간(2영업일) 이내 제작 완료 후 CJ대한통운으로 발송됩니다.",
    items: [
      "배송비 기본 4,000원 (50,000원 이상 무료배송)",
      "출고 후 1~2영업일 내 수령 가능",
      "절기·연말 성수기에는 일정이 다소 늦어질 수 있습니다",
      "도서·산간 지역은 추가 배송비 발생 가능",
    ],
  },
];

const MEMBER_BENEFITS = [
  { icon: "📋", title: "주문 내역 조회",  desc: "언제든 접수 현황 확인" },
  { icon: "🔔", title: "제작 현황 알림",  desc: "카카오톡으로 실시간 안내" },
  { icon: "❤️", title: "찜 목록 저장",   desc: "마음에 드는 시안 보관" },
  { icon: "💰", title: "회원 할인 혜택",  desc: "재주문 고객 추가 할인" },
];

const FAQS = [
  {
    q: "주문한 디자인을 수정하고 싶어요.",
    a: "시안 확인 단계에서 수정 요청이 가능합니다. 기본 2회까지 무료 수정을 제공하며, 최종 승인 후 인쇄 진행 시에는 수정이 불가합니다. 인쇄 전에 꼭 꼼꼼히 확인해주세요.",
  },
  {
    q: "규격이 정해져 있나요? 원하는 사이즈로 주문 가능한가요?",
    a: "네, 원하시는 규격으로 주문 가능합니다. 다만 비규격 주문 시 재단비(2,000~5,000원)가 추가될 수 있습니다. 가격표의 규격(70·90·105·120·150cm)에 맞추시면 더 저렴하게 제작하실 수 있습니다.",
  },
  {
    q: "교회 로고나 사진 파일을 어떻게 보내나요?",
    a: "주문서 내 첨부파일 기능을 이용하시면 됩니다. 파일 용량이 크거나(20MB 이상), 여러 장인 경우에는 카카오톡 또는 이메일로 보내주시면 됩니다. 이미지는 원본 해상도(300DPI 이상)로 제공해주시면 선명한 인쇄물을 받으실 수 있습니다.",
  },
  {
    q: "급하게 주문해야 하는데 빠른 제작이 가능한가요?",
    a: "주문서 기타란에 희망 수령일을 기재해주시면 최대한 맞춰드립니다. 당일·익일 발송이 필요한 경우 전화 문의(평일 09:00~18:00)를 통해 사전에 확인해주세요. 절기·연말 성수기에는 제작 일정이 다소 늦어질 수 있습니다.",
  },
  {
    q: "제품을 받았는데 불량이 있어요. 어떻게 하나요?",
    a: "수령 후 2일 이내에 제품 불량 사진과 함께 고객센터로 연락주시면 재제작 또는 환불 처리해드립니다. 단, 고객 요청 오류(문구 오탈자, 사이즈 오기재 등)로 인한 경우는 교환·환불이 어려울 수 있습니다.",
  },
  {
    q: "현수막 소재는 어떻게 되나요?",
    a: "현수막은 기본 타포린(방수) 소재를 사용합니다. 실내 배너는 PVC 또는 패브릭 소재로 제작 가능하며, 주문 시 소재 선택이 가능합니다. 야외용 현수막은 UV 코팅 처리로 색상이 오래 유지됩니다.",
  },
];

export default function GuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* 히어로 */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 text-sm mb-2">홈 › 이용안내</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">이용안내</h1>
          <p className="text-white/80 text-base">주보라 주문부터 배송까지, 전 과정을 안내해드립니다</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* 주문 프로세스 */}
        <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-8">
          📦 <span className="text-primary-600">주문 프로세스</span>
        </h2>
        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 hidden sm:block" />
          <div className="flex flex-col gap-5">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-5 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {/* 번호 */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-extrabold text-sm z-10">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <span>{step.icon}</span>{step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{step.desc}</p>
                  {step.items && (
                    <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside mt-2">
                      {step.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  )}
                  {step.note && (
                    <div className="mt-3 bg-blue-50 border-l-4 border-primary-500 rounded-r-xl px-4 py-2 text-sm text-gray-700">
                      {step.note}
                    </div>
                  )}
                  {step.warn && (
                    <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl px-4 py-2 text-sm text-yellow-800">
                      ⚠️ {step.warn}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 회원 서비스 */}
        <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-6 mt-14">
          👤 <span className="text-primary-600">회원 서비스</span>
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-12">
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            회원가입은 무료이며, 구글 계정으로 1초 만에 가입하실 수 있습니다.<br />
            주보라는 창의적인 디자인과 최상의 품질, 합리적인 가격으로 현수막 제작을 도와드립니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MEMBER_BENEFITS.map((b, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="font-bold text-sm text-gray-900 mb-0.5">{b.title}</div>
                <div className="text-xs text-gray-500">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-lg font-extrabold text-gray-900 border-b-2 border-primary-600 pb-3 mb-6">
          💬 <span className="text-primary-600">자주 묻는 질문</span>
        </h2>
        <div className="space-y-2 mb-14">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <span className="text-primary-600 font-extrabold shrink-0">Q</span>
                <span className="flex-1">{faq.q}</span>
                <span className={`text-gray-400 text-xs transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg p-8 text-center text-white">
          <h3 className="text-xl font-extrabold mb-2">지금 바로 주문하시겠어요?</h3>
          <p className="text-white/80 text-base mb-6">교회 현수막·배너 전문 주보라가 빠르고 정확하게 제작해드립니다</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/order" className="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              📋 주문하기
            </Link>
            <Link href="/price" className="bg-white/15 border border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/25 transition-colors">
              💰 가격 확인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
