import React, { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import useScroll from 'hooks/custom/useScroll';
import QuickBarContainer from './style';

export default function QuickBar() {
  // path 이름
  const pathName = usePathname().substring(1).split('/')[0];
  // scroll event
  const { scrollY } = useScroll();
  const [ScrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    if (scrollY > (pathName === '' ? 550 : 143)) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }, [scrollY]);
  return (
    <QuickBarContainer ScrollActive={ScrollActive}>
      <div>
        <ul>
          <li>가격계산기</li>
          <li>인쇄단가표</li>
          <li>주문가이드</li>
          <li>고객센터</li>
        </ul>
        <div className="img_box">
          <img src="/image/quickItem1.png" alt="quickItem1" />
          <img src="/image/quickItem2.png" alt="quickItem2" />
        </div>
      </div>
    </QuickBarContainer>
  );
}
