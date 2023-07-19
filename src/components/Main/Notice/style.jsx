import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Notice_container = styled.section`
  margin-top: 50px;
  padding: 50px 0;
  background: ${Common.colors.bg100};
  > div {
    position: relative;
    .title {
      position: absolute;
      top: -68px;
      h1 {
        font-size: 20px;
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
          bottom: -12px;
          left: 0;
          width: 100%;
          height: 6px;
          background-color: ${Common.colors.primary300};
        }
      }
    }
  }
  .notice {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ul {
      width: 360px;
      flex: 0 0 360px;
      background: ${Common.colors.bg300};
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      padding: 8px 30px;
      margin-right: 30px;
      li {
        border-bottom: 1px solid ${Common.colors.bg200};
        &:last-child {
          border-bottom: none;
        }
        padding: 14px 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          color: ${Common.colors.text200};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 260px;
        }
        svg {
          width: 24px;
          height: 24px;
          opacity: 0.2;
        }
      }
    }
    .bottom_banner {
      flex: 0 1 auto;
      width: 100%;
      img {
        position: relative;
        width: 100%;
        height: 236px;
        border-radius: 4px;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
`;
