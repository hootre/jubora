import styled from 'styled-components';

export const FilterAsideBox = styled.aside`
  transition: all 0.5s ease-in-out;
  border-right: 1px solid var(--bd-100);
  transform: translateX(-350px);
  overflow: hidden;
  flex: 0;
  &.filterOpen {
    flex: 1 1 0;
    transform: translateX(0);
  }
  .fiterTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11.5px 16px 11.5px 20px;
    border-bottom: 1px solid #dcdcdc;
    .title {
      display: flex;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        margin-right: 6px;
      }
      h2 {
        font-weight: bold;
        font-size: 18px;
      }
    }
    .icon {
      font-size: 18px;
      cursor: pointer;
    }
  }
  ul {
    width: 100%;
  }
`;