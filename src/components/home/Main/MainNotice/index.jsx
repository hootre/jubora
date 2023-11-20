'use client';

import React from 'react';
import useNotice from 'hooks/supabase/notice/useNotice';
import Link from 'next/link';
import MainLoading from 'components/Loading/MainLoading';
import MainNoticeContainer from './style';

export default function MainNotice({ noticeImage }) {
  const { useGetMainNotice4 } = useNotice();
  const { data, isLoading } = useGetMainNotice4();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MainNoticeContainer>
      <div className="CContainer">
        <div className="title">
          <h1>Notice</h1>
        </div>
        <div className="notice">
          <ul className="notice_list">
            {data.map((item) => (
              <li key={item.id}>
                <span className={item.type === '공지' ? 'notice state' : 'state'}>
                  {`[${item.type}]`}
                </span>
                <Link href={`/home/center/notice/${item.id}`}>
                  <h2>{item.title}</h2>
                  <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18">
                    <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="bottom_banner">
            <img src={noticeImage} alt="noticeImage" />
          </div>
        </div>
      </div>
    </MainNoticeContainer>
  );
}
