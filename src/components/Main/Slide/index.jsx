'use client';
import useInterval from 'hooks/custom/useInterval';
import React, { useState } from 'react';
import Image from 'next/image';
import { Slide_container } from './style';

// 메인
export const Slide = ({ slides }) => {
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

  return (
    <Slide_container>
      <div className="slide">
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
                    <div className="frame">
                      <div className="title">
                        <ul className="icon_list">
                          <li>
                            <div>{item.state}</div>
                          </li>
                        </ul>
                        <h1>{item.title.title_1}</h1>
                        <h1>{item.title.title_2}</h1>
                        <p>{item.content.content_1}</p>
                        <p>{item.content.content_2}</p>
                      </div>
                    </div>
                    <a>
                      <Image src={item.img} alt="" width={2600} height={400} />
                    </a>
                  </div>
                );
              })}
          </div>
          <div className="nav_btn">
            <ul>
              {slides &&
                slides.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`${currentIndex === idx ? 'current_slide' : ''}`}
                      onClick={() => handleSwipe(idx)}
                    ></li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </Slide_container>
  );
};
