import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { memo } from 'react';
import { useState } from 'react';
import { Showcase } from 'components/home/Templates/Showcase';

export const Item_selectImg = memo(({ bannerType, detail_data }) => {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // 샘플선택
  const [open, setOpen] = useState(false);
  const handleSampleDesignModal = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
              : detail_data.img_square
          }
          alt=""
        />
      </div>
      <button
        onClick={handleSampleDesignModal}
        className="sample_btn"
        type="button"
        value="샘플선택"
      >
        샘플선택 +
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <div className="showcase_box">
              <Showcase category={detail_data.category} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </Public_order_container>
  );
});
