'use client';
import React from 'react';
import { Main_Slides } from 'components/home/Main/Main_Slides';
import { Main_Notice } from 'components/home/Main/Main_Notice';
import { TemplatesContents } from 'components/home/Main/TemplatesContents';
import HomeLayout from 'components/home/HomeLayout';
import { Main_TemplatesCardList } from 'components/home/Main/Main_TemplatesCardList';
import { useTemplates } from 'hooks/supabase/templates/useTemplates';
import { Main_container } from './style';
import { useMainSettingImage } from 'hooks/supabase/main/settingImage/useSettingImage';
import { Skeleton } from '@mui/material';
export const Main = () => {
  const { useGetSixTemplates } = useTemplates();
  const { data: six_data, isLoading: templateLoadgin } = useGetSixTemplates();
  const { useGetMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading: imageLoading } = useGetMainSettingImage();
  let logoImage, topImage, centerImage, center2Image, noticeImage;
  if (imageLoading || templateLoadgin) {
    return (
      <Skeleton variant="rectangular" width="100%">
        <div style={{ height: '2000px' }} />
      </Skeleton>
    );
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
  });
  return (
    <Main_container>
      <HomeLayout logoImage={logoImage} topImage={topImage}>
        <Main_Slides />
        <TemplatesContents six_data={six_data} />
        <img src={centerImage} alt="centerImage" className="mainImage" />
        <Main_TemplatesCardList />
        <img src={center2Image} alt="center2Image" className="mainImage" />
        <Main_Notice noticeImage={noticeImage} />
      </HomeLayout>
    </Main_container>
  );
};
