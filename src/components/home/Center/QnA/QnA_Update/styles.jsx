import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const QnA_Update_container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .contents_header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    .update_input_box {
      display: flex;
      gap: 10px;
      .title {
        font-size: 30px;
        font-weight: bold;
        > h2 {
          font-size: 15px;
          padding: 5px;
          color: ${Common.colors.text200};
        }
        > input {
          width: 100%;
          padding: 10px;
          border: 1px solid ${Common.colors.bd100};
          border-radius: 2px;
          &:active,
          &:focus {
            border: 1px solid ${Common.colors.primary100};
          }
        }
      }
      .subtitle {
        display: flex;
        align-items: end;
        gap: 10px;

        > div {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  .contents_body {
    min-height: 400px;
    padding: 20px;
  }
  .commnet_input {
    width: 100%;
  }
  .comment_box {
    padding: 20px;
    background: ${Common.colors.bg300};
    border: 1px solid ${Common.colors.bd100};
    > h2 {
      padding-bottom: 10px;
      border-bottom: 1px solid ${Common.colors.bd100};
    }
  }
`;
