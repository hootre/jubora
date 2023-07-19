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
            height: 400px;
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
        left: 50%;
        bottom: 20px;
        width: 1200px;
        transform: translateX(-50%);
        > ul {
          width: 100%;
          display: flex;
          justify-content: start;
          align-items: center;
          > li {
            cursor: pointer;
            height: 50px;
            width: 120px;
            margin: 0 20px;
            .progress_bar {
              display: block;
              height: 3px;
              width: 120px;
              border-radius: 15px;
              background-color: ${Common.colors.bd100};
              opacity: 1;
              transition: all 0.5s;
              position: relative;
              &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 3px;
                width: 0px;
                background-color: ${Common.colors.primary300};
              }
            }
            .text {
              display: inline-block;
              padding: 10px;
              color: ${Common.colors.text300};
              width: 100%;
              text-align: center;
            }
            &.current_slide {
              .progress_bar {
                &:after {
                  transition: all 5s linear;
                  width: 120px;
                }
              }
              .text {
                color: ${Common.colors.black};
              }
            }
          }
        }
      }
    }
  }
`;
