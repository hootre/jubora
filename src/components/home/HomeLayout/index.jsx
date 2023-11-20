'use client';

import React from 'react';
import QuickBar from 'components/home/Main/QuickBar';
import useMainSettingImage from 'hooks/supabase/main/settingImage/useSettingImage';
import MainLoading from 'components/Loading/MainLoading';
import Header from './Header';
import Footer from './Footer';

function HomeLayout({ children }) {
  // 해더 이미지 가져오기
  const { useGetMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading: imageLoading } = useGetMainSettingImage();

  let logoImage;
  let topImage;
  if (imageLoading) {
    return <MainLoading />;
  }
  MainSettingImageData.map((item) => {
    if (item.position === 'logo') {
      logoImage = item.image;
    } else if (item.position === 'top') {
      topImage = item.image;
    }
    return false;
  });
  return (
    <>
      {/* <PC> */}
      <Header logoImage={logoImage} topImage={topImage} />
      <QuickBar />
      {children}
      <Footer logoImage={logoImage} />
      {/* </PC>
      <Mobile>
        <h1>MOBILE</h1>
        {children}
      </Mobile> */}
    </>
  );
}
export default HomeLayout;
