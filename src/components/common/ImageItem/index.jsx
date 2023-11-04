import React, { useState } from 'react';
import { ImageItem_container } from './style';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export const ImageItem = ({ img_src, href, text, bannerType }) => {
  return (
    <ImageItem_container>
      <CldImage
        width={bannerType === 'banner_row' ? 900 : bannerType === 'banner_col' ? 200 : 300}
        height={bannerType === 'banner_row' ? 100 : bannerType === 'banner_col' ? 620 : 380}
        loading="lazy"
        src={img_src}
        alt="제품 이미지"
      />
      <div className="purchase_box">
        <div className="purchase">
          <Link href={href}>{text}</Link>
        </div>
      </div>
    </ImageItem_container>
  );
};
