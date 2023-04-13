import React, { useCallback, useState } from 'react';
import show from 'assets/MainPage/show.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { TemplatesSixContentBox } from './styles';

export const TemplatesSixContent = ({
  templatesList,
  category,
  currentItemNum,
  hendleCurrentItem,
}) => {
  const { bannerType, bannerList } = templatesList;
  console.log(currentItemNum);
  return (
    <TemplatesSixContentBox className="contentBox">
      <div className="content">
        <div className="imgBox">
          <Image src={bannerList[currentItemNum].img} width={1200} height={1200} alt="img" />
        </div>
        <div className="side">
          <div className="nav">
            <div className="price">
              <h1>{category.title}</h1>
              <h2>{category.minPrice}원~ (1장기준)</h2>
            </div>
            <div className="check">
              <Link href={`detail/${bannerList[currentItemNum].id}`}>이 디자인 구매하기</Link>
            </div>
          </div>
          <section>
            <div className="header">
              <h1>다양한 디자인을 구경해보세요</h1>
              <Link href={`templates?category=${category.id}`}>전체보기</Link>
            </div>
            <ul className={bannerType}>
              {bannerList.map((item, idx) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => hendleCurrentItem(idx)}
                    className={currentItemNum === idx ? 'currentContent' : ''}
                  >
                    <Image src={item.img} width={1200} height={1200} alt="img" />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </TemplatesSixContentBox>
  );
};
