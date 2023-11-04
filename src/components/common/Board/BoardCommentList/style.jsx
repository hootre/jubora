import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const BoardCommentList_container = styled.ul`
  > li {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid ${Common.colors.bd100};
    .comment_header {
      margin-bottom: 10px;
      display: flex;
      align-items: end;
      gap: 5px;
      .name {
        font-weight: bold;
      }
      .date {
        font-size: 13px;
        color: ${Common.colors.text200};
      }
    }
    .delete_btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 18px;
      cursor: pointer;
    }
  }
`;
