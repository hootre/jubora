import styled from 'styled-components';

export const SlideBox = styled.section`
  position: relative;
  left: 0;
  height: 400px;
  .slide {
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
      .title {
        position: absolute;
        left: 15%;
        width: 20%;
        top: 72px;
        z-index: 11;
        .iconList {
          margin: 0px 0px 8px;
          padding: 0px;
          border: 0px;
          display: flex;
          align-items: center;
          div {
            font-size: 13px;
            font-weight: bold;
            line-height: 15px;
            padding: 4px;
            padding-top: 6px;
            border-radius: 8px;
            color: var(--base-white);
            background: var(--primary-200);
          }
        }
        h1 {
          letter-spacing: -0.02em;
          line-height: 140%;
          font-weight: bold;
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          margin: 0px;
        }
        h2 {
          letter-spacing: -0.02em;
          line-height: 140%;
          font-weight: bold;
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          margin: 0px 0px 16px;
        }
        p {
          letter-spacing: -0.02em;
          font-size: 14px;
          font-weight: 500;
          line-height: 19px;
          white-space: pre-wrap;
          color: rgba(0, 0, 0, 0.7);
          margin: 0px;
        }
      }
      .slideTrack {
        .slideItem {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          &.currentSlide {
            opacity: 1;
          }
        }
        img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
        }
      }
    }
  }
`;
