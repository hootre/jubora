import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Modal_showcase_container, Public_order_container } from '../style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { memo } from 'react';
import { useState } from 'react';
import { Showcase } from 'components/home/Templates/Showcase';
import { BasicModal } from 'components/common/Modal/BasicModal';

export const Item_selectImg = memo(({ bannerType, detail_data }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // 샘플선택
  const [open, setOpen] = useState(false);
  const toaggleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Public_order_container className="productImg">
      <div>
        <h1>선택 이미지</h1>
        <img
          src={
            bannerType === 'banner_row'
              ? detail_data.img_row
              : bannerType === 'banner_col'
              ? detail_data.img_col
              : bannerType === 'banner_square'
              ? detail_data.img_square
              : detail_data.image
          }
          alt=""
        />
      </div>
      <button onClick={toaggleModal} className="sample_btn" type="button" value="샘플선택">
        샘플선택 +
      </button>
      <BasicModal state={open} onClose={toaggleModal}>
        <Showcase category={detail_data.category} />
      </BasicModal>
    </Public_order_container>
  );
});
