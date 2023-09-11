import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Question_Write_container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 5px solid ${Common.colors.primary300};
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
  .top_box {
    display: flex;
    align-items: center;
    gap: 10px;
    .box {
      &.title {
        width: 300px;
      }
      h1 {
        color: ${Common.colors.text200};
        font-size: 15px;
        padding: 5px;
      }
    }
  }
  .btn_box {
    width: 100%;
    display: flex;
    > div {
      flex: 1;
    }
  }
`;
