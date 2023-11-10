import React from 'react';
import ImageItem from 'components/common/ImageItem';
import TemplatesSixContentContainer from './style';

export default function TemplatesSixContent({ templatesList, bannerType }) {
  return (
    <TemplatesSixContentContainer>
      <div className="content">
        <section>
          <ul className={bannerType}>
            {templatesList.map((item) => (
              <li key={item.id}>
                <div className={bannerType === 'banner_row' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.publicIdRow}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_row"
                    loadingType="eager"
                  />
                </div>
                <div className={bannerType === 'banner_col' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.publicIdCol}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_col"
                    loadingType="eager"
                  />
                </div>
                <div className={bannerType === 'banner_square' ? 'active' : 'none'}>
                  <ImageItem
                    imgSrc={item.publicIdSquare}
                    href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                    text="구매하기"
                    bannerType="banner_square"
                    loadingType="eager"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </TemplatesSixContentContainer>
  );
}
