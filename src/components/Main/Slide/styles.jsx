import styled from 'styled-components';

export const SlideBox = styled.section`
  position: relative;
  left: 0;
  padding-top: 25px;
  height: 340px;
  .slide {
    width: 100%;
    user-select: none;
    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 60px;
      opacity: 0.5;
      border: 0px;
      border-radius: 15px;
      background-color: #fff;
      font-size: 16px;
      z-index: 10;
      &.prev {
        left: calc((100% - 1350px) / 2);
      }
      &.next {
        right: calc((100% - 1350px) / 2);
      }
    }
    .slideList {
      overflow: hidden;
      margin: 0;
      height: auto;
      .slideTrack {
        position: absolute;
        left: 0;
        display: flex;
        -webkit-user-drag: none;
        .slideItem {
          margin: 0 12px;
          :not(.currentSlide) {
            filter: brightness(0.7);
            transition: all 1s;
          }
        }
        img {
          width: 1200px;
          object-fit: contain;
          -webkit-user-drag: none;
        }
      }
    }
  }
`;
