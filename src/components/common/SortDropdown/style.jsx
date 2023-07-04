import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SortDropdown_container = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  .sort_title {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    button {
      color: ${Common.colors.text200};
      padding: 10px 5px;
    }
  }
  > ul {
    opacity: 0;
    position: absolute;
    top: 30px;
    transition: all 0.3s ease;
    &.active {
      opacity: 1;
      transform: translateY(10px);
    }
    li {
      padding: 5px 10px;
      min-width: 70px;
      cursor: pointer;
      &:hover {
        font-weight: bold;
        color: ${Common.colors.primary100};
      }
    }
    border: 1px solid ${Common.colors.bd100};
    background: ${Common.colors.white};
  }
`;
