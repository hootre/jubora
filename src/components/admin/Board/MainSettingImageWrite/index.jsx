'use client';

import useMainSettingImage from 'hooks/supabase/main/settingImage/useSettingImage';
import ReadMainSettingImage from 'components/admin/Read/ReadMainSettingImage';
import MainLoading from 'components/Loading/MainLoading';
import EmptyCard from './EmptyCard';
import MainSettingImageWriteContainer from './styles';

export default function MainSettingImageWrite() {
  const { useGetMainSettingImage, useUpdateMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading } = useGetMainSettingImage();
  const { mutate: updataMainSettingImage } = useUpdateMainSettingImage();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <MainSettingImageWriteContainer>
      {MainSettingImageData.map((item) => (
        <EmptyCard key={item.id} item={item} updataData={updataMainSettingImage} />
      ))}
      <ReadMainSettingImage />
    </MainSettingImageWriteContainer>
  );
}
