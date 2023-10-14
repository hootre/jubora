'use client';
import { EmptyCard } from './EmptyCard';
import { MainSettingImage_Write_container } from './styles';
import { useMainSettingImage } from 'hooks/supabase/main/settingImage/useSettingImage';
import { Read_MainSettingImage } from 'components/admin/Read/Read_MainSettingImage';

export const MainSettingImage_Write = () => {
  const { useGetMainSettingImage, useUpdateMainSettingImage } = useMainSettingImage();
  const { data: MainSettingImageData, isLoading } = useGetMainSettingImage();
  const { mutate: updataMainSettingImage } = useUpdateMainSettingImage();
  if (isLoading) {
    return;
  }
  return (
    <MainSettingImage_Write_container>
      {MainSettingImageData.map((item) => (
        <EmptyCard key={item.id} item={item} updataData={updataMainSettingImage} />
      ))}
      <Read_MainSettingImage />
    </MainSettingImage_Write_container>
  );
};
