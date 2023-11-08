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
                <ImageItem
                  imgSrc={
                    bannerType === 'banner_row'
                      ? item.publicIdRow
                      : bannerType === 'banner_col'
                      ? item.publicIdCol
                      : item.publicIdSquare
                  }
                  href={`/home/templates/${item.bannerState}/detail/${item.id}?bannerType=${bannerType}&categoryName=${item.categoryName}`}
                  text="구매하기"
                  bannerType={bannerType}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </TemplatesSixContentContainer>
  );
}
