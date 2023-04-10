import styled from 'styled-components';

export const OptionBox = styled.li`
  display: flex;
  -webkit-box-align: baseline;
  align-items: baseline;
  margin: 8px 0px;
  flex-direction: row;
  h2 {
    font-size: 16px;
    flex: 0 0 100px;
  }
  .optionBox {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    color: rgb(99, 99, 99);
    flex: 1 1 0%;
    .optionTitle {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 42px;
      box-sizing: border-box;
      border: 1px solid var(--bd-100);
      cursor: pointer;
      padding-left: 14px;
      padding-right: 7px;
      background-color: var(--base-white);
      user-select: none;
      span {
        flex: 1 1 0%;
      }
      &.open {
        .openContent {
          display: block;
        }
      }
      .openContent {
        position: absolute;
        border: 1px solid var(--primary-100);
        background-color: var(--base-white);
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
                color: var(--primary-100);
                position: absolute;
                top: 0;
                width: 100%;
                height: calc(100% - 10px);
                background-color: rgba(41, 134, 255, 0.3);
                border: 1px solid var(--primary-100);
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
