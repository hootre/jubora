import styled from 'styled-components';

export const AsideListItemBox = styled.li`
  position: relative;
  border-bottom: 1px solid #dcdcdc;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11.5px 16px 11.5px 25px;
    &:hover {
      background-color: var(--bg-200);
    }
    h2 {
      font-size: 18px;
    }
    .icon {
      font-size: 18px;
    }
  }
  .dropFilter {
    transition: height 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    .filterItem {
      display: inline-block;
      transition: background 0.2s ease-in-out;
      cursor: pointer;
      padding: 10px 10px;
      color: var(--text-100);
      border: 1px solid var(--bd-100);
      border-radius: 5px;
      margin: 5px 5px;
      text-align: center;
      &:hover {
        color: var(--base-white);
        background-color: var(--base-black);
      }
    }
  }
  &.open {
    .title {
      .icon {
        transform: rotate(-45reg);
      }
    }
    .dropFilter {
      visibility: hidden;
      height: 0;
    }
  }
`;
