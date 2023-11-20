import styled from '@emotion/styled';
import Common from 'styles/Common';

const MainNoticeContainer = styled.section`
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
      width: 720px;
      height: 250px;
      background: ${Common.colors.bg300};
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      padding: 8px 10px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      li {
        border-bottom: 1px solid ${Common.colors.bg200};
        &:last-child {
          border-bottom: none;
        }
        padding: 13px 0 15px;
        display: flex;
        align-items: center;
        > .state {
          color: ${Common.colors.black};
          flex: 0 0 50px;
          display: flex;
          justify-content: center;
          font-size: 15px;
          &.notice {
            font-weight: bold;
            color: ${Common.colors.red};
          }
        }

        > a {
          display: flex;
          justify-content: space-between;
          flex: 4;
          &:hover {
            h2 {
              color: ${Common.colors.black};
            }
            svg {
              opacity: 1;
            }
          }
          h2 {
            font-size: 14px;
            font-weight: 500;
            line-height: 24px;
            margin: 0 10px;
            color: ${Common.colors.text200};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > svg {
            width: 24px;
            height: 24px;
            opacity: 0.2;
          }
        }
      }
    }
    .bottom_banner {
      flex: 0 1 auto;
      width: 100%;
      img {
        position: relative;
        width: 100%;
        height: 250px;
        border-radius: 4px;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }
`;
export default MainNoticeContainer;
