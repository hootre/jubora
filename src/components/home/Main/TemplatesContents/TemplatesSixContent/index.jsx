import React from 'react';
import { TemplatesSixContent_container } from './style.jsx';
import { ImageItem } from 'components/common/ImageItem/index.jsx';
export const TemplatesSixContent = ({ templatesList, bannerType }) => {
  return (
    <TemplatesSixContent_container>
      <div className="content">
        <section>
          <ul className={bannerType}>
            {templatesList.map((item) => {
              return (
                <li key={item.id}>
                  <ImageItem
                    img_src={
                      bannerType === 'banner_row'
                        ? item.img_row
                        : bannerType === 'banner_col'
                        ? item.img_col
                        : item.img_square
                    }
                    href={`/home/templates/${item.category}/detail/${item.id}?bannerType=${bannerType}`}
                    text={'구매하기'}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </TemplatesSixContent_container>
  );
};
