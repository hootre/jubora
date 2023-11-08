import styled from '@emotion/styled';
import Common from 'styles/Common';

const SianUpdateContainer = styled.div`
  .sian_modify_box {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 40px;
    .skeleton_mainImg {
      width: 500px;
      height: 500px;
      background: ${Common.colors.bg200};
      display: flex;
      align-items: center;
      justify-content: center;
      > .main_image {
        width: 100%;
        object-fit: contain;
      }
      > h2 {
        font-size: 30px;
        color: ${Common.colors.white};
      }
    }
    .modify_box {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .sell_text {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        background: ${Common.colors.primaryBg};
        h2 {
          margin-bottom: 10px;
        }
        textarea {
          width: 100%;
          height: 70px;
          border: 0;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          border: none;
          resize: none;
          outline: none;
          background: ${Common.colors.white};
        }
      }
      .modify_text {
        width: 100%;
        padding: 10px;
        h2 {
          margin-bottom: 10px;
        }
        .textarea_box {
          border: 1px solid ${Common.colors.bd100};
          textarea,
          pre {
            width: 100%;
            height: 70px;
            border: 0;
            padding: 10px 15px;
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            border: none;
            resize: none;
            outline: none;
          }
        }
      }
      .sianupdate_btn_box {
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .sian_btn {
          padding: 10px 20px;
          background: ${Common.colors.text100};
          color: ${Common.colors.white};
          cursor: pointer;
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          font-size: 0;
          visibility: hidden;
        }
      }
      .caution_text {
        margin-top: 20px;
      }
    }
  }
`;
export default SianUpdateContainer;
