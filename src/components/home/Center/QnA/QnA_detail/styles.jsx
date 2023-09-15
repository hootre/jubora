import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const QnA_detail_container = styled.section`
  width: 100%;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .contents_header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    .title {
      font-size: 30px;
      font-weight: bold;
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
