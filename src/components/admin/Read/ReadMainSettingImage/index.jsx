'use client';

import React from 'react';

import { Skeleton } from '@mui/material';
import useMainSettingImage from 'hooks/supabase/main/settingImage/useSettingImage';
import MainLoading from 'components/Loading/MainLoading';
import ReadMainSettingImageContainer from './style';

export default function ReadMainSettingImage() {
  const { useGetMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading } = useGetMainSettingImage();
  let logoImage;
  let topImage;
  let centerImage;
  let center2Image;
  let noticeImage;
  if (isLoading) {
    return <MainLoading />;
  }
  MainSettingImageData.map((item) => {
    if (item.position === 'logo') {
      logoImage = item.image;
    } else if (item.position === 'top') {
      topImage = item.image;
    } else if (item.position === 'center') {
      centerImage = item.image;
    } else if (item.position === 'center2') {
      center2Image = item.image;
    } else if (item.position === 'notice') {
      noticeImage = item.image;
    }
    return false;
  });
  return (
    <ReadMainSettingImageContainer>
      <img src={logoImage} alt="logo" className="logo mainImage" />
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '100px' }} />
      </Skeleton>
      <img src={topImage} alt="topImg" className="mainImage" />

      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '200px' }} />
      </Skeleton>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '200px' }} />
      </Skeleton>

      <img src={centerImage} alt="center" className="mainImage" />
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '400px' }} />
      </Skeleton>
      <img src={center2Image} alt="center2" className="mainImage" />
      <div className="notice_box">
        <Skeleton variant="rectangular" width="100%">
          <div style={{ height: '250px' }} />
        </Skeleton>
        <img src={noticeImage} alt="notice" className="notice mainImage" />
      </div>
    </ReadMainSettingImageContainer>
  );
}
