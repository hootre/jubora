import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const BoardCommentInput_container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  form {
    width: 100%;
    > input {
      width: 100%;
      padding: 20px;
      border: 1px solid ${Common.colors.bd100};
      border-radius: 10px;
      &:active,
      &:focus {
        border: 1px solid ${Common.colors.primary100};
      }
    }
  }
`;
