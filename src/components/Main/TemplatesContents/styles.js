import styled from 'styled-components';

export const TemplatesContentsBox = styled.section`
  position: relative;
  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
    > li {
      cursor: pointer;
      padding: 15px;
      border-radius: 5px;
      transition: all 0.2s;
      &.active {
        background: var(--primary-100);
        color: var(--base-white);
        font-weight: bold;
      }
    }
  }
`;
