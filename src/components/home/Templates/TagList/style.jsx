import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TagList_container = styled.section`
  display: flex;
  ul {
    display: flex;
    gap: 10px;
    .tag_btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 120px;
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
`;
