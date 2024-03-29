import styled from '@emotion/styled';
import Common from 'styles/Common';

const OptionContainer = styled.div`
  display: flex;
  -webkit-box-align: baseline;
  align-items: baseline;
  margin: 8px 0px;
  flex-direction: row;
  width: 100%;
  h2 {
    font-size: 16px;
    flex: 0 0 100px;
  }
  .option_box {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    color: rgb(99, 99, 99);
    flex: 1 1 0%;
    .option_title {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 42px;
      box-sizing: border-box;
      border: 1px solid ${Common.colors.text100};
      cursor: pointer;
      padding-left: 14px;
      padding-right: 7px;
      background-color: ${Common.colors.white};
      user-select: none;
      span {
        flex: 1 1 0%;
      }
      &.open {
        .open_content {
          display: block;
        }
      }
      .open_content {
        position: absolute;
        border: 1px solid ${Common.colors.primary100};
        background-color: ${Common.colors.white};
        top: 0;
        left: 0;
        top: 42px;
        width: 100%;
        display: none;
        z-index: 1;
        ul {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .img {
              position: relative;
              &:after {
                content: 'V';
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${Common.colors.primary100};
                position: absolute;
                top: 0;
                width: 100%;
                height: calc(100% - 10px);
                background-color: rgba(41, 134, 255, 0.3);
                border: 1px solid ${Common.colors.primary100};
              }
            }
            span {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
`;
export default OptionContainer;
