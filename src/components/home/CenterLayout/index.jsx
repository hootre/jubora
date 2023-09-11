'use client';

import Link from 'next/link';
import { CenterLayout_container } from './style';
import { usePathname } from 'next/navigation';

const CenterLayout = ({ children }) => {
  const pathName = usePathname().substring(1).split('/')[2];
  return (
    <CenterLayout_container className="C_container">
      <div className="header">
        <h1>고객센터</h1>
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
            <Link href="/home/center/qanda" className={pathName === 'qanda' ? ' active' : ''}>
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
