import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Read_TemplatesTag_container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .tag_conatiner {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    &:nth-of-type(odd) {
      background-color: ${Common.colors.bg300};
    }
    .top_box {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 25px;
      }
      .btn_box {
        display: flex;
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
        .delete_btn {
          color: ${Common.colors.white};
          background-color: ${Common.colors.red};
        }
      }
    }
    .updata_box {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    ul {
      display: flex;
      gap: 10px;
      .tag_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        padding: 10px 15px;
        border: ${Common.colors.bd100};
        background: ${Common.colors.black};
        border-radius: 10px;
        font-size: 12px;
        color: ${Common.colors.white};
        .icon {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }
`;
