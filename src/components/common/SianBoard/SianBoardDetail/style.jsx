import styled from '@emotion/styled';
import Common from 'styles/Common';

const SianBoardDetailContainer = styled.div`
  section {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    .title_box {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-bottom: 10px;
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
          color: ${Common.colors.primary100};
        }
      }
      .payment_box {
        width: 100%;
        border-top: 2px solid ${Common.colors.primary100};
        margin-top: 10px;
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: start;
      }
      .btn_box {
        width: 100%;
        display: flex;
        justify-content: end;
        gap: 10px;
        > div {
          padding: 10px 15px;
          border-radius: 5px;
          border: 1px solid ${Common.colors.bd100};
          cursor: pointer;
          transition: all 0.2s ease;
          &:hover {
            transform: translateY(-2px);
          }
        }
        .update_order {
          border: none;
          color: ${Common.colors.white};
          background: ${Common.colors.primary100};
        }
        .modify_byn {
          cursor: pointer;
          padding: 15px;
          background: ${Common.colors.primary100};
          color: ${Common.colors.white};
          font-weight: bold;
          border-radius: 5px;
          width: 400px;
          transition: all 0.2s;
          &:hover {
            background: ${Common.colors.primary300};
            transform: translateY(-2px);
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          }
          &:active {
            transform: translateY(0px);
          }
        }
      }
    }
  }
`;
export default SianBoardDetailContainer;
