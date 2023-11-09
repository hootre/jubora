'use client';

import useInterval from 'hooks/custom/useInterval';
import React, { useState } from 'react';
import Image from 'next/image';
import useMainSlides from 'hooks/supabase/main/slides/useMainSlides';
import MainSlidesContainer from './style';

// 메인
export default function MainSlides() {
  const { useGetMainSlides } = useMainSlides();
  const { data: slides } = useGetMainSlides();
  // 기본 변수
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  // 슬라이드 이동 함수
  const handleSlide = (index) => {
    // left
    if (index >= slides.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };
  // 자동 슬라이드
  useInterval(
    () => {
      handleSlide(currentIndex + 1);
    },
    isSwiping ? null : 5000
  );

  const handleSwipe = (direction) => {
    setIsSwiping(true);
    handleSlide(direction);
    setTimeout(() => {
      setIsSwiping(false);
    }, 1000);
  };
  // if (isLoading) {
  //   return <MainSlides />;
  // }
  return (
    <MainSlidesContainer>
      <div className="slide ">
        <div className="slide_list">
          <div className="slide_track">
            {slides &&
              slides.map((item, index) => (
                <div
                  key={item.subtitle}
                  className={`slide_item ${currentIndex === index ? 'current_slide' : ''}`}
                  style={{
                    transition: 'all 0.5s',
                  }}
                >
                  <div className="frame CContainer">
                    <div className="title">
                      <ul className="icon_list" />
                      <h1>{item.title1}</h1>
                      <h1>{item.title2}</h1>
                      <p>{item.content1}</p>
                      <p>{item.content2}</p>
                    </div>
                  </div>
                  <div>
                    <Image src={item.img} alt="" width={2600} height={400} />
                  </div>
                </div>
              ))}
            <div className="nav_btn">
              <ul>
                {slides &&
                  slides.map((item, idx) => (
                    <li
                      role="presentation"
                      key={item.subtitle}
                      className={`${currentIndex === idx ? 'current_slide' : ''}`}
                      onClick={() => handleSwipe(idx)}
                    >
                      <span className="progress_bar" />
                      <span className="text">{item.subtitle}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainSlidesContainer>
  );
}
