'use client';

import Link from 'next/link';
import { CenterLayout_container } from './style';
import { usePathname } from 'next/navigation';

const CenterLayout = ({ children }) => {
  const pathName = usePathname().substring(1).split('/')[2];
  return (
    <CenterLayout_container className="C_container">
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
    </CenterLayout_container>
  );
};
export default CenterLayout;
