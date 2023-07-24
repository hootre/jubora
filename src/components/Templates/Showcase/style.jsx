import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Showcase_container = styled.section`
  margin-top: 30px;
  .top_nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: ${Common.colors.text100};
      position: relative;
      display: inline-block;
      &:after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: ${Common.colors.primary300};
      }
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    nav ul {
      display: flex;
      justify-content: space-between;
      li {
        position: relative;
        padding: 8px 24px;
        .back {
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.2s ease;
          width: 100%;
          height: 100%;
          background: ${Common.colors.black};
          z-index: -1;
          border-radius: 0.375rem;
        }
        a {
          cursor: pointer;
          z-index: -1;
          border-radius: 5px;
          color: ${Common.colors.text200};
          &:hover {
            color: ${Common.colors.black};
          }
          &.active {
            color: ${Common.colors.white};
          }
        }
      }
    }
  }
  .showcase {
    overflow: overlay;
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      -webkit-box-align: center;
      align-items: center;
      list-style: none;
      margin: 5px 0px;
      padding: 0px;
      li {
        position: relative;
        overflow: hidden;
        transition: all 0.2s ease;
        .purchase_box {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px;
          transition: all 0.4s ease;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          .purchase {
            transition: all 0.2s ease;

            &:hover {
              > a {
                color: ${Common.colors.black};
              }
              background: ${Common.colors.white};
              transform: translateY(-2px);
            }
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px 0;
            width: 80px;
            height: 20px;
            text-align: center;
            color: ${Common.colors.white};
            border: 1px solid ${Common.colors.white};
            border-radius: 5px;
            transform: translateY(20px);
          }
        }
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
          .purchase_box {
            opacity: 1;
            .purchase {
              transform: translateY(0px);
            }
          }
        }

        &.current_content {
          cursor: pointer;
          box-shadow: 0 0 4px ${Common.colors.primary100};
        }
        > img {
          cursor: pointer;
          height: 100px;
          width: 100%;
          object-fit: cover;
          transition: all 0.2s ease;
        }
      }
    }
  }
`;
