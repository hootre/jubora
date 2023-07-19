import React from 'react';
import { QuickBar_container } from './style';
import { useState } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTemplatesActions } from 'store';
import { useScroll } from 'hooks/custom/useScroll';

export const QuickBar = () => {
  // path 이름
  const pathName = usePathname().substring(1).split('/')[0];
  // scroll event
  const { scrollY } = useScroll();
  const [ScrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    if (scrollY > (pathName === '' ? 576 : 143)) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
    console.log(scrollY);
  }, [scrollY]);
  return (
    <QuickBar_container ScrollActive={ScrollActive}>
      <div>
        <ul>
          <li>가격계산기</li>
          <li>인쇄단가표</li>
          <li>주문가이드</li>
          <li>고객센터</li>
        </ul>
        <div className="img_box">
          <img src="http://jubora.co.kr/img/quick_top2.png" alt="" />
          <img src="http://jubora.co.kr/img/quick_top3.png" alt="" />
        </div>
      </div>
    </QuickBar_container>
  );
};
