import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Search_container = styled.section`
  display: flex;
  align-items: center;
  padding: 15px 0;
  .filter_btn {
    display: block;
    margin-right: 15px;
    > div {
      position: relative;
      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54px;
        height: 50px;
        cursor: pointer;
        background: ${Common.colors.white};
        border: 1px solid ${Common.colors.bd100};
        border-radius: 4px;
        transition: 0.2s all ease;
        &:hover {
          border: 1px solid #999;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    &.open {
      display: none;
    }
  }
  .search_box {
    flex: auto;
    .search {
      display: flex;
      align-items: center;
    }
  }
`;
