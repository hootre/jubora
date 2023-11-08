import * as React from 'react';
import { CldImage } from 'next-cloudinary';
import ModalViewContainer from './styles';

export default function ModalView({ item }) {
  return (
    <ModalViewContainer>
      {item.bannerState === 'banner' ? (
        <>
          <CldImage width={900} height={100} loading="lazy" src={item.imgRow} alt="제품 이미지" />
          <CldImage width={200} height={620} loading="lazy" src={item.imgCol} alt="제품 이미지" />
          <CldImage
            width={500}
            height={500}
            loading="lazy"
            src={item.imgSquare}
            alt="제품 이미지"
          />
        </>
      ) : item.bannerState === 'print' ? (
        <CldImage width={500} height={500} loading="lazy" src={item.imgRow} alt="제품 이미지" />
      ) : (
        <CldImage width={500} height={500} loading="lazy" src={item.imgRow} alt="제품 이미지" />
      )}
    </ModalViewContainer>
  );
}
