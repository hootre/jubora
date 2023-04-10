import styled from 'styled-components';

export const SearchBox = styled.section`
  display: flex;
  align-items: center;
  padding: 15px 0;
  .filterBtn {
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
        background: var(--base-white);
        border: 1px solid var(--bd-100);
        border-radius: 4px;
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
  .searchBox {
    flex: auto;
    .search {
      display: flex;
      align-items: center;

      .searchInputBox {
        flex: auto;
        height: 100%;
        .searchInput {
          position: relative;
          width: 100%;
          .icon {
            position: absolute;
            cursor: pointer;
            left: 20px;
            top: 15px;
            color: var(--text-200);
            width: 20px;
            height: 20px;
          }
          input {
            color: var(--base-black);
            font-size: 14px;
            width: inherit;
            border: solid 1px #dcdcdc;
            padding: 12px 18px 12px 60px;
            height: 50px;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }
`;
