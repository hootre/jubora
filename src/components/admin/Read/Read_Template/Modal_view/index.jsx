import * as React from 'react';
import { CldImage } from 'next-cloudinary';
import { Modal_view_container } from './styles';
export const Modal_view = ({ item }) => {
  return (
    <Modal_view_container>
      {item.bannerState === 'banner' ? (
        <>
          <CldImage width={900} height={100} loading="lazy" src={item.img_row} alt="제품 이미지" />
          <CldImage width={200} height={620} loading="lazy" src={item.img_col} alt="제품 이미지" />
          <CldImage
            width={500}
            height={500}
            loading="lazy"
            src={item.img_square}
            alt="제품 이미지"
          />
        </>
      ) : item.bannerState === 'print' ? (
        <CldImage width={500} height={500} loading="lazy" src={item.img_row} alt="제품 이미지" />
      ) : (
        <CldImage width={500} height={500} loading="lazy" src={item.img_row} alt="제품 이미지" />
      )}
    </Modal_view_container>
  );
};
