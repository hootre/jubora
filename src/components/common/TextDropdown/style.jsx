import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const TextDropdown_container = styled.div`
  .dropdown_box {
    position: relative;
    .title {
      height: 20px;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }
    .dropdownText_box {
      display: none;
      position: absolute;
      flex-direction: column;
      gap: 5px;
      background: ${Common.colors.white};
      box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      padding: 15px;
      width: 120px;
      top: 20px;
      left: -30px;
      z-index: 10;
      animation: smoothAppear 0.5s;
      a {
        display: block;
        border-radius: 10px;
        &:hover {
          color: ${Common.colors.primary100};
          font-weight: bold;
        }
      }
    }
    &:hover {
      > .dropdownText_box {
        display: flex;
      }
    }
  }
`;
