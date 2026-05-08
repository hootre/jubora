import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-primary-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/" className="btn-primary">홈으로 돌아가기</Link>
    </div>
  );
}
