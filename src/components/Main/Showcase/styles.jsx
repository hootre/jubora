import styled from 'styled-components';

export const ShowcaseBox = styled.section`
  padding: 50px 0;
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    nav ul {
      display: flex;
      justify-content: space-between;
      li {
        position: relative;
        padding: 8px 24px;
        .back {
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.2s ease;
          width: 100%;
          height: 100%;
          background: var(--base-black);
          z-index: -1;
          border-radius: 0.375rem;
        }
        a {
          cursor: pointer;
          z-index: -1;
          border-radius: 5px;
          color: var(--text-200);
          &:hover {
            color: var(--base-black);
          }
          &.active {
            color: var(--base-white);
          }
        }
      }
    }
  }
  .showcase {
    overflow: overlay;
    ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 24px;
      -webkit-box-align: center;
      align-items: center;
      list-style: none;
      margin: 24px;
      padding: 0px;
      li {
        position: relative;
        overflow: hidden;
        display: flex;
        border: 1px solid var(--bg-100);
        border-radius: 8px;
        height: 80px;
        &:hover {
          filter: drop-shadow(rgba(0, 0, 0, 0.15) 4px 4px 10px);
        }
        transition: all 0.3s ease 0s;
        div {
          cursor: pointer;
          display: flex;
          user-select: none;
          width: 100%;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: var(--bg-100);
            transition: opacity 1s ease-out 0s;
          }
        }
      }
    }
  }
`;
