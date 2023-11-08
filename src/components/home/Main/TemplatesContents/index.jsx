'use client';

import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import Link from 'next/link';
import ItemTypeGroup from 'components/home/Templates/Showcase/ItemTypeGroup';
import TemplatesSixContent from './TemplatesSixContent';
import TemplatesContentsContainer from './style';

export default function TemplatesContents({ sixData }) {
  // 가로,세로,포스터
  const [bannerType, setBannerType] = useState('banner_row');
  const handleBannerType = (e) => {
    setBannerType(e.target.value);
  };

  return (
    <TemplatesContentsContainer className="CContainer">
      <div className="header">
        <div>
          <h1>BEST DESIGN</h1>
          <span>다양한 디자인을 구경해보세요</span>
        </div>

        <ItemTypeGroup bannerType={bannerType} handleBannerType={handleBannerType} />
        <Link href="/home/templates/banner">전체보기</Link>
      </div>

      {sixData.length === 0 ? (
        <h1>6개 미만입니다</h1>
      ) : (
        <TemplatesSixContent
          templatesList={sixData.sort((a, b) => b.id - a.id)}
          bannerType={bannerType}
        />
      )}
    </TemplatesContentsContainer>
  );
}
