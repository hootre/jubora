import React from 'react';
import { ImageItem_container } from './style';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export const ImageItem = ({ img_src, href, text, bannerType }) => {
  return (
    <ImageItem_container>
      {/* <img src={img_src} alt="img" loading="lazy" />
       */}
      <CldImage
        width={bannerType === 'banner_row' ? 900 : bannerType === 'banner_col' ? 300 : 400}
        height={bannerType === 'banner_row' ? 200 : bannerType === 'banner_col' ? 600 : 600}
        sizes="100vw"
        loading="lazy"
        src={img_src}
        alt="Description of my image"
      />
      <div className="purchase_box">
        <div className="purchase">
          <Link href={href}>{text}</Link>
        </div>
      </div>
    </ImageItem_container>
  );
};
