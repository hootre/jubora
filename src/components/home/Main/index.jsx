'use client';

import MainSlides from 'components/home/Main/MainSlides';
import MainNotice from 'components/home/Main/MainNotice';
import TemplatesContents from 'components/home/Main/TemplatesContents';
import HomeLayout from 'components/home/HomeLayout';
import MainTemplatesCardList from 'components/home/Main/MainTemplatesCardList';
import useTemplates from 'hooks/supabase/templates/useTemplates';
import useMainSettingImage from 'hooks/supabase/main/settingImage/useSettingImage';
import MainLoading from 'components/Loading/MainLoading';
import MainContainer from './style';

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
        <img src={centerImage} alt="centerImage" className="mainImage" />
        <img src={center2Image} alt="center2Image" className="mainImage" />
        <MainNotice noticeImage={noticeImage} />
      </HomeLayout>
    </MainContainer>
  );
}
