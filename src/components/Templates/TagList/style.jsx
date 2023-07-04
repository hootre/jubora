import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TagList_container = styled.section`
  display: flex;
  ul {
    display: flex;

    .tag_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border: ${Common.colors.bd100};
      background: ${Common.colors.black};
      border-radius: 10px;
      font-size: 12px;
      color: ${Common.colors.white};
      margin-right: 10px;
      .icon {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;
