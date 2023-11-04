import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Notice_Write_container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 5px solid ${Common.colors.primary300};
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);

  > .top_box {
    display: flex;
    align-items: end;
    width: 100%;
    gap: 10px;
    .direct_board {
      text-decoration: underline;
      color: ${Common.colors.text200};
    }
  }
  > .btn_box {
    width: 100%;
    display: flex;
    > div {
      flex: 1;
    }
  }
`;
