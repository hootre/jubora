'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CenterLayoutContainer from './style';

function CenterLayout({ children }) {
  const pathName = usePathname().substring(1).split('/')[2];
  return (
    <CenterLayoutContainer className="CContainer">
      <div className="header">
        <Link href="/home/center/notice" className="title">
          고객센터
        </Link>
        <div className="nav_box">
          <div className="nav_item">
            <Link href="/home/center/notice" className={pathName === 'notice' ? ' active' : ''}>
              공지사항
            </Link>
          </div>
          <div className="nav_item">
            <Link href="/home/center/question" className={pathName === 'question' ? ' active' : ''}>
              자주 묻는 질문
            </Link>
          </div>
          <div className="nav_item">
            <Link href="/home/center/qna" className={pathName === 'qna' ? ' active' : ''}>
              Q&A
            </Link>
          </div>
        </div>
      </div>
      {children}
    </CenterLayoutContainer>
  );
}
export default CenterLayout;
