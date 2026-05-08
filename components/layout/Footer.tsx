import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* 회사 정보 */}
        <div className="col-span-2">
          <div className="mb-4">
            <img src="/logo.png" alt="주보라" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            현수막·배너 전문 온라인 제작 서비스
          </p>
          <div className="space-y-1.5 text-sm text-gray-500">
            <p>영업시간 : 평일 09:00–18:00 | 토 09:00–13:00</p>
            <p>카카오톡 상담 : 주보라</p>
          </div>
        </div>

        {/* 서비스 */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">서비스</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {[["시안 갤러리", "/templates"], ["주문하기", "/order"], ["가격 안내", "/price"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-primary-600 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 고객지원 */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">고객지원</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {[["이용안내", "/guide"], ["주문조회", "/mypage"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-primary-600 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* 하단 사업자 정보 */}
      <div className="border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-400 space-y-1">
          <p>상호 : 보라미디어 | 사업자등록번호 : 593-56-00232 | 정보관리자 : 전동준</p>
          <p>주소 : 경기도 하남시 미사강변한강로 135</p>
          <p className="mt-2">Copyright(C) jubora.co.kr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
