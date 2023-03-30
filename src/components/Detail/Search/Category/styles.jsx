import styled from 'styled-components';

export const CategoryBox = styled.ul`
  position: relative;
  height: 50px;
  padding: 15px;
  flex: 0 0 135px;
  background-color: var(--base-black);
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  color: var(--base-white);
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      height: 100%;
    }
  }
  .dropDown {
    color: var(--base-white);
    position: absolute;
    top: 50px;
    left: 0;
    transition: all 0.2s ease-in;
    transform: scale(0);
    opacity: 0;
    transform-origin: 0 0;
    z-index: 1;
    width: 100%;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      li {
        &.curCategory {
          font-weight: bold;
          color: var(--base-black);
          background-color: var(--bg-100);
        }
        background-color: var(--base-black);
        width: 100%;
        padding: 10px;
        span {
          text-align: left;
        }
      }
    }
    &.active {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
