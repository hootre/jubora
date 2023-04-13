import styled from 'styled-components';

export const SlideBox = styled.section`
  position: relative;
  left: 0;
  height: 400px;
  .slide {
    user-select: none;
    .slideList {
      overflow: hidden;
      margin: 0;
      height: auto;

      .slideTrack {
        .slideItem {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          &.currentSlide {
            opacity: 1;
          }

          img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
          }
          .title {
            position: absolute;
            left: 15%;
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
        }
      }
      .navBtn {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        > ul {
          display: flex;
          justify-content: center;
          align-items: center;
          > li {
            cursor: pointer;
            height: 10px;
            width: 30px;
            border: 1px solid var(--bd-100);
            background-color: var(--primary-300);
            opacity: 0.5;
            transition: all 0.5s;
            &.currentSlide {
              width: 70px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;
