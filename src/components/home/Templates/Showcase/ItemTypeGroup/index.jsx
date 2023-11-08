import React from 'react';
import ItemTypeGroupContainer from './style';

export default function ItemTypeGroup({ bannerType, handleBannerType }) {
  return (
    <ItemTypeGroupContainer>
      <button
        className={bannerType === 'banner_row' ? 'from_item_btn active' : `from_item_btn`}
        type="button"
        value="banner_row"
        onClick={handleBannerType}
      >
        가로형
      </button>
      <button
        className={bannerType === 'banner_col' ? 'from_item_btn active' : `from_item_btn`}
        type="button"
        value="banner_col"
        onClick={handleBannerType}
      >
        세로형
      </button>
      <button
        className={bannerType === 'banner_square' ? 'from_item_btn active' : `from_item_btn`}
        type="button"
        value="banner_square"
        onClick={handleBannerType}
      >
        포스터형
      </button>
    </ItemTypeGroupContainer>
  );
}
