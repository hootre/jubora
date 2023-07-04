import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Slide_container = styled.section`
  position: relative;
  left: 0;
  height: 400px;
  .slide {
    user-select: none;
    .slide_list {
      overflow: hidden;
      margin: 0;
      height: auto;

      .slide_track {
        .slide_item {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          &.current_slide {
            opacity: 1;
          }

          img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
          }
          .frame {
            position: absolute;
            width: 1400px;
            height: 400px;
            margin: 0 auto;
            left: 50%;
            transform: translateX(-50%);
            .title {
              position: absolute;
              left: 0;
              top: 72px;
              z-index: 11;
              .icon_list {
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
                  color: ${Common.colors.white};
                  background: ${Common.colors.primary200};
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
      }
      .nav_btn {
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
            border: 1px solid ${Common.colors.bd100};
            background-color: ${Common.colors.primary300};
            opacity: 0.5;
            transition: all 0.5s;
            &.current_slide {
              width: 70px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;
