'use client';
import useInterval from 'hooks/custom/useInterval';
import React, { useState } from 'react';
import Image from 'next/image';
import { Main_Slides_container } from './style';
import { useMainSlides } from 'hooks/supabase/main/slides/useMainSlides';

// 메인
export const Main_Slides = () => {
  const { useGetMainSlides } = useMainSlides();
  const { data: slides, isLoading } = useGetMainSlides();
  // 기본 변수
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  // 자동 슬라이드
  const slideTimer = useInterval(
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
  // 슬라이드 이동 함수
  const handleSlide = (index) => {
    // left
    if (index >= slides.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Main_Slides_container>
      <div className="slide ">
        <div className="slide_list">
          <div className="slide_track">
            {slides &&
              slides.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`slide_item ${currentIndex === index ? 'current_slide' : ''}`}
                    style={{
                      transition: 'all 0.5s',
                    }}
                  >
                    <div className="frame container">
                      <div className="title">
                        <ul className="icon_list"></ul>
                        <h1>{item.title_1}</h1>
                        <h1>{item.title_2}</h1>
                        <p>{item.content_1}</p>
                        <p>{item.content_2}</p>
                      </div>
                    </div>
                    <a>
                      <Image src={item.img} alt="" width={2600} height={400} />
                    </a>
                  </div>
                );
              })}
            <div className="nav_btn">
              <ul>
                {slides &&
                  slides.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className={`${currentIndex === idx ? 'current_slide' : ''}`}
                        onClick={() => handleSwipe(idx)}
                      >
                        <span className="progress_bar"></span>
                        <span className="text">{item.subtitle}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main_Slides_container>
  );
};
