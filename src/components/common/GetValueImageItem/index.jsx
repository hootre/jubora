import React, { useState } from 'react';
import { GetValueImageItem_container } from './style';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { useFormContext } from 'react-hook-form';

export const GetValueImageItem = ({ img_src, text, bannerType, toaggleModal }) => {
  // react hooks form
  const { register, setValue } = useFormContext();
  const handleImageSelect = () => {
    setValue('image', img_src);
    toaggleModal();
  };
  return (
    <GetValueImageItem_container>
      <CldImage
        width={bannerType === 'banner_row' ? 900 : bannerType === 'banner_col' ? 200 : 300}
        height={bannerType === 'banner_row' ? 100 : bannerType === 'banner_col' ? 620 : 380}
        loading="lazy"
        src={img_src}
        alt="제품 이미지"
      />
      <div className="purchase_box">
        <div className="purchase">
          <div onClick={handleImageSelect}>{text}</div>
        </div>
      </div>
    </GetValueImageItem_container>
  );
};
