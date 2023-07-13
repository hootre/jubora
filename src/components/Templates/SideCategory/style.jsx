import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SideCategory_container = styled.aside`
  position: absolute;
  top: 0;
  left: -300px;
  width: 250px;
  padding: 15px;
  .category_title {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    .category_btn {
      margin: 5px;
      padding: 10px;
      min-width: 50px;
      align-items: center;
      border: 1px solid ${Common.colors.bd100};
      border-radius: 10px;
      font-size: 12px;
      color: ${Common.colors.black};
      margin-right: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 0 1px rgba(33, 33, 33, 0.2);
      &.active {
        background: ${Common.colors.black};
        color: ${Common.colors.white};
      }
      &:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
      }
      &:active {
        transform: translateY(-2px);
      }
    }
  }
`;