import styled from '@emotion/styled';
import Common from 'styles/Common';

const MypageSideBarContainer = styled.div`
  flex: 0 0 120px;
  margin-right: 20px;
  .nav_box {
    .name_box {
      padding: 15px;
      background-color: ${Common.colors.bg300};
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .class {
        font-size: 12px;
        font-weight: bold;
        line-height: 18px;
        background-color: ${Common.colors.primaryBg};
        border: 1px solid ${Common.colors.primary100};
        color: ${Common.colors.primary200};
        -webkit-box-align: center;
        align-items: center;
        border-radius: 8px;
        box-sizing: border-box;
        display: inline-flex;
        padding: 4px 8px;
        text-transform: uppercase;
      }
      .name {
        padding: 10px;
        > span {
          font-weight: bold;
        }
      }
      .noLogin_text {
        font-weight: normal;
        font-size: 12px;
      }
    }
    .content_list {
      > div {
        cursor: pointer;
        width: 100%;
        transition: all 0.2s ease;
        > a {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          padding: 30px;
        }
        h1 {
          color: ${Common.colors.text300};
        }
        box-shadow: 0px 0px 3px rgba(100, 100, 100, 0.1);
        &:hover,
        &.active {
          h1 {
            color: ${Common.colors.primary100};
          }
          background: ${Common.colors.bg300};
          transform: translateY(-2px);
          box-shadow: 0px 0px 5px rgba(100, 100, 100, 0.2);
        }
      }
    }
  }
`;
export default MypageSideBarContainer;
