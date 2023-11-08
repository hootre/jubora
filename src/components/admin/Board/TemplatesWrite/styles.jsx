import styled from '@emotion/styled';
import Common from 'styles/Common';

const TemplatesWriteContainer = styled.div`
  /* 현수막, 인쇄물, 실사 css */
  .tag_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tag_box {
      display: flex;
      > main {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: start;
        justify-content: start;
        gap: 10px;
        .tag_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 15px;
          border: 1px solid ${Common.colors.bd100};
          background: ${Common.colors.white};
          border-radius: 10px;
          font-size: 12px;
          color: ${Common.colors.black};
          cursor: pointer;
          .icon {
            margin-left: 5px;
            cursor: pointer;
          }
          &:hover,
          &.active {
            color: ${Common.colors.white};
            background: ${Common.colors.black};
          }
        }
      }
    }
  }
  .accordion {
    display: flex;
    flex-direction: column;
  }
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: ${Common.size.containerWidth};
    margin: 0 auto;
  }
  > .title {
    width: 100%;
    text-align: left;
    font-size: 22px;
    padding: 20px;
  }
  .from_item_btn {
    padding: 10px 40px;
    border-radius: 2px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-weight: bold;
    color: ${Common.colors.white};
    background: ${Common.colors.black};
  }
  .optionContainer {
    width: 100%;
    display: flex;
    -webkit-box-align: baseline;
    align-items: center;
    min-height: 40px;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: 1px solid ${Common.colors.bd100};

    h2 {
      flex: 0 0 140px;
      font-size: 15px;
      padding: 0 20px;
    }
    > div {
      display: flex;
    }
  }
  .submit_btn {
    margin-top: 10px;
  }
`;

export default TemplatesWriteContainer;
