import useInterval from 'hooks/useInterval';
import { useWindowSize } from 'hooks/useWindowSize';
import React, { useEffect, useRef, useState } from 'react';
import { SlideBox } from './styles';

/**
 * 무한 슬라이드를 위해 캐러샐 앞뒤로 슬라이드 추가 함수
 * @param {Array} slides 이미지주소배열
 * @param {int} cnt 보여줄 슬라이드 개수
 * @returns {Array} 양옆 슬라이드 추가된 배열
 */
const createSlides = (slides, cnt) => {
  let pre = [];
  let suf = [];
  for (let i = 1; i <= cnt; i++) {
    pre.unshift(slides[slides.length - i]);
    suf.push(slides[i - 1]);
  }
  return [...pre, ...slides, ...suf];
};

// 메인
export const Slide = ({ slides }) => {
  // 기본 변수
  const [windowWidth, windowHeight] = useWindowSize();
  const addSlide = 2;
  const slidesSize = 3;
  const slideList = createSlides(slides, addSlide);
  const [currentIndex, setCurrentIndex] = useState(addSlide);
  const transitionTime = 700;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [isSwiping, setIsSwiping] = useState(false);
  const [prevSlideX, setPrevSlideX] = useState(false);
  const [slideTransition, setTransition] = useState(transitionStyle);

  // debounce 적용
  useEffect(() => {
    setIsSwiping(true);
    setTransition('');
    console.log('reset');
    const debounce = setTimeout(() => {
      console.log(windowWidth);
    }, 300); //->setTimeout 설정
    return () => clearTimeout(debounce); //->clearTimeout 바로 타이머 제거
  }, [windowWidth]);
  // 자동 슬라이드
  useInterval(
    () => {
      handleSlide(currentIndex + 1);
    },
    !isSwiping && !prevSlideX ? 3000 : null,
  );

  const handleSwipe = direction => {
    setIsSwiping(true);
    handleSlide(currentIndex + direction);
  };
  // 무한 슬라이드용 함수
  const replaceSlide = index => {
    setTimeout(() => {
      setTransition('');
      setCurrentIndex(index);
    }, transitionTime - 100);
  };
  // 슬라이드 이동 함수
  const handleSlide = index => {
    setCurrentIndex(index);
    // left
    if (index - addSlide < 0) {
      index += slidesSize;
      replaceSlide(index);
    } else if (index - addSlide > slidesSize - 1) {
      index -= slidesSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  return (
    <SlideBox className="container">
      <div className="slide">
        <button className="prev" onClick={() => handleSwipe(-1)}>
          <svg class="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18">
            <path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path>
          </svg>
        </button>
        <button className="next" onClick={() => handleSwipe(1)}>
          <svg class="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18">
            <path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
          </svg>
        </button>
        <div className="slideList">
          <div
            className="slideTrack"
            onMouseOver={() => setIsSwiping(true)}
            onMouseOut={() => setIsSwiping(false)}
            style={{
              transform: `translateX(calc(${-1230 * currentIndex}px))`,
              transition: slideTransition,
            }}
          >
            {slides &&
              slideList.map((src, index) => {
                return (
                  <div key={index} className={`slideItem ${currentIndex === index ? 'currentSlide' : ''}`}>
                    <a>
                      <img src={src} alt="" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </SlideBox>
  );
};
