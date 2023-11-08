import React, { memo, useState } from 'react';

import Showcase from 'components/home/Templates/Showcase';
import BasicModal from 'components/common/Modal/BasicModal';
import PublicOrderContainer from '../style';

const ItemSelectImg = memo(({ bannerType, detailData }) => {
  // 샘플선택
  const [open, setOpen] = useState(false);
  const toaggleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <PublicOrderContainer className="productImg">
      <div>
        <h1>선택 이미지</h1>
        <img
          src={
            bannerType === 'banner_row'
              ? detailData.imgRow
              : bannerType === 'banner_col'
              ? detailData.imgCol
              : bannerType === 'banner_square'
              ? detailData.imgSquare
              : detailData.imgRow
          }
          alt=""
        />
      </div>
      <button onClick={toaggleModal} className="sample_btn" type="button" value="샘플선택">
        샘플선택 +
      </button>
      <BasicModal state={open} onClose={toaggleModal}>
        <Showcase category={detailData.category} />
      </BasicModal>
    </PublicOrderContainer>
  );
});
export default ItemSelectImg;
