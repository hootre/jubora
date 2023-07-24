import React from 'react';
import { ImageItem_container } from './style';
import Link from 'next/link';

export const ImageItem = ({ img_src, href, text }) => {
  return (
    <ImageItem_container>
      <img src={img_src} alt="img" />
      <div className="purchase_box">
        <div className="purchase">
          <Link href={href}>{text}</Link>
        </div>
      </div>
    </ImageItem_container>
  );
};
