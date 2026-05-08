#!/bin/bash
# ============================================
# 주보라 (jubora.co.kr) Vercel 배포 스크립트
# ============================================
# 사용법: 터미널에서 이 스크립트가 있는 폴더로 이동한 후
#   chmod +x deploy.sh && ./deploy.sh
# ============================================

set -e

echo ""
echo "🚀 주보라 Vercel 배포를 시작합니다"
echo "=================================="
echo ""

# 1. Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI를 설치합니다..."
    npm install -g vercel
    echo "✅ Vercel CLI 설치 완료!"
else
    echo "✅ Vercel CLI가 이미 설치되어 있습니다. ($(vercel --version))"
fi

echo ""

# 2. Vercel 로그인
echo "🔑 Vercel 로그인을 진행합니다..."
echo "   브라우저가 열리면 로그인해주세요."
echo ""
vercel login

echo ""
echo "✅ 로그인 완료!"
echo ""

# 3. 프로젝트 연결 및 배포
echo "🌐 Vercel 프로젝트를 설정하고 배포합니다..."
echo "   질문이 나오면 아래처럼 답해주세요:"
echo "   - Set up and deploy? → Y"
echo "   - Which scope? → 본인 계정 선택"
echo "   - Link to existing project? → N"
echo "   - Project name? → jubora (또는 Enter)"
echo "   - Directory? → ./ (Enter)"
echo ""

vercel --prod

echo ""
echo "=================================="
echo "🎉 배포 완료!"
echo ""
echo "다음 단계:"
echo "  1. https://vercel.com 에서 프로젝트 Settings → Domains 에서"
echo "     jubora.co.kr 도메인을 추가하세요."
echo ""
echo "  2. 환경변수 설정:"
echo "     Vercel 대시보드 → Settings → Environment Variables 에서"
echo "     .env.local 의 값들을 모두 추가하세요."
echo ""
echo "  3. 도메인 DNS 설정:"
echo "     cafe24 도메인 관리에서 CNAME 레코드를"
echo "     cname.vercel-dns.com 으로 변경하세요."
echo "=================================="
