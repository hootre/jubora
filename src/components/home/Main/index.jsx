'use client';

import TemplatesContents from 'components/home/Main/TemplatesContents';
import HomeLayout from 'components/home/HomeLayout';
import useTemplates from 'hooks/supabase/templates/useTemplates';
import useMainSettingImage from 'hooks/supabase/main/settingImage/useSettingImage';
import MainLoading from 'components/Loading/MainLoading';
import MainContainer from './style';
import MainSlides from './MainSlides';
import MainTemplatesCardList from './MainTemplatesCardList';
import MainNotice from './MainNotice';

export default function Main() {
  const { useGetSixTemplates } = useTemplates();
  const { data: sixData, isLoading: templateLoadgin } = useGetSixTemplates();
  const { useGetMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading: imageLoading } = useGetMainSettingImage();
  let centerImage;
  let center2Image;
  let noticeImage;
  if (imageLoading || templateLoadgin) {
    return <MainLoading />;
  }
  MainSettingImageData.map((item) => {
    if (item.position === 'center') {
      centerImage = item.image;
    } else if (item.position === 'center2') {
      center2Image = item.image;
    } else if (item.position === 'notice') {
      noticeImage = item.image;
    }
    return false;
  });
  return (
    <MainContainer>
      <HomeLayout>
        <MainSlides />
        <TemplatesContents sixData={sixData} />
        <img src={centerImage} alt="centerImage" className="mainImage" />
        <MainTemplatesCardList />
        <img src={center2Image} alt="center2Image" className="mainImage" />
        <MainNotice noticeImage={noticeImage} />
      </HomeLayout>
    </MainContainer>
  );
}
