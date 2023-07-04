import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TemplatesSixContent_container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    height: 550px;
    max-width: 1400px;

    .side {
      padding: 10px;
      .nav {
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid ${Common.colors.bd100};
        justify-content: end;
        .check {
          display: flex;
          align-items: center;
        }
      }
      section {
        padding-top: 20px;
        .header {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          > h1 {
            font-weight: bold;
          }
          > a {
            color: ${Common.colors.text200};
            text-decoration: underline;
            font-size: 13px;
            cursor: pointer;
            &:hover {
              color: ${Common.colors.black};
            }
          }
        }
        ul {
          display: grid;
          gap: 10px;
          &.row {
            grid-template-rows: repeat(2, 0.5fr);
            grid-template-columns: repeat(3, 1fr);
          }
          &.col {
            grid-template-columns: repeat(6, 1fr);
          }
          &.square {
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
          }
          li {
            position: relative;
            &.current_content {
              cursor: pointer;
              box-shadow: 0 0 4px ${Common.colors.primary100};
              &:before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 13px 15px;
                border-radius: 50%;
                background-color: ${Common.colors.primary300};
                content: 'V';
                font-weight: bold;
                color: ${Common.colors.white};
                z-index: 2;
              }
              &:after {
                content: '';
                width: 100%;
                height: 100%;
                background-color: ${Common.colors.primary300};
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                opacity: 0.5;
              }
            }
            > img {
              cursor: pointer;
              width: 100%;
              height: 100%;
              object-fit: contain;
              transition: all 0.2s ease;
              &:hover {
                box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
                  rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
              }
            }
          }
        }
      }
    }
  }
`;
