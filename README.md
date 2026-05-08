# 주보라 – Next.js 15 마이그레이션

> 현수막·배너 온라인 제작 + AI 에디터 플랫폼

---

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어 API 키 입력

# 3. 개발 서버 실행
npm run dev
# http://localhost:3000
```

---

## 📋 필요한 API 키

| 서비스 | 발급 URL | 비용 |
|---|---|---|
| **Gemini API** | https://aistudio.google.com/app/apikey | **무료** (일 1,500건) |
| Firebase | 기존 키 그대로 사용 | 무료 |
| Cloudinary | 기존 계정 그대로 | 무료 |
| **Toss Payments** | https://developers.tosspayments.com | 무료 (수수료 3.3%) |
| **카카오 알림톡** | https://solapi.com | 건당 ~8원 |

---

## 🏗️ 주문 흐름

```
메인 → 템플릿 선택 → AI 에디터 → 주문서 작성 → 주문 접수
→ 관리자 시안 제작 → 카카오 알림 → 시안 확인 → 결제 → 제작·배송
```

---

## 📁 주요 파일

| 파일 | 역할 |
|---|---|
| `app/(public)/editor/page.tsx` | AI 에디터 메인 |
| `components/editor/AIChatPanel.tsx` | Gemini AI 채팅 패널 |
| `components/editor/CanvasEditor.tsx` | Fabric.js Canvas 편집기 |
| `app/(public)/order/page.tsx` | 주문서 작성 |
| `app/(public)/order/[id]/proof/page.tsx` | 시안 확인 |
| `app/(public)/order/[id]/payment/page.tsx` | Toss 결제 |
| `app/(admin)/admin/page.tsx` | 관리자 대시보드 |
| `app/api/ai/chat/route.ts` | Gemini API 라우트 |
| `lib/firestore.ts` | Firestore CRUD |
| `lib/kakao.ts` | 카카오 알림톡 |
| `constants/pricing.ts` | 가격 계산 |

---

## 🌐 Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경변수는 Vercel 대시보드에서 설정
# Settings → Environment Variables
```

> ⚠️ .env.local 파일은 절대 git에 올리지 마세요. .gitignore에 포함되어 있습니다.

---

## 🔧 Gemini API 키 발급 (무료, 5분)

1. https://aistudio.google.com/app/apikey 접속
2. Google 계정으로 로그인
3. "API 키 만들기" 클릭
4. 키 복사 → `.env.local`의 `GEMINI_API_KEY`에 붙여넣기

---

## 💳 Toss Payments 연동

1. https://developers.tosspayments.com 가입
2. 테스트 키로 개발 시작 (실제 결제 안 됨)
3. 심사 신청 후 실제 키 발급 (무료)
