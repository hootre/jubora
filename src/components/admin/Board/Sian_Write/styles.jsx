import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Sian_Write_container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 5px solid ${Common.colors.primary300};
  box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.05);
  .file_box {
    display: flex;
    flex-direction: column;
    .from_item_btn {
      font-size: 12px;
      text-align: center;
      width: 150px;
      padding: 10px 20px;
      color: ${Common.colors.text100};
      background: ${Common.colors.white};
      border: 1px solid ${Common.colors.bd100};
      border-radius: 2px;
      transition: all 0.2s ease;
      cursor: pointer;
      &.active,
      &:hover {
        font-weight: bold;
        color: ${Common.colors.white};
        background: ${Common.colors.black};
      }
    }
  }

  .box {
    &.title {
      width: 400px;
    }
    h1 {
      color: ${Common.colors.text200};
      font-size: 15px;
      padding: 5px;
    }
  }
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
