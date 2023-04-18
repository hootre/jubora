import styled from 'styled-components';

export const ShowcaseBox = styled.section`
  margin-top: 30px;
  .topNav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: var(--text-100);
      position: relative;
      display: inline-block;
      &:after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: var(--primary-300);
      }
    }
    // Category 수정 css
    .selectTextBox {
      flex: none;
      color: var(--base-black);
      background-color: transparent;
      .dropDown {
      }
    }
  }
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
      margin: 5px 0px;
      padding: 0px;
      li {
        position: relative;
        overflow: hidden;
        display: flex;
        transition: all 0.3s ease 0s;
        .choice {
          position: absolute;
          bottom: 10px;
          right: 15px;
          transition: all 0.3s ease 0s;
          filter: opacity(0);
          width: 50px;
          height: 20px;
          a {
            font-size: 12px;
            width: 50px;
            height: 100%;
          }
        }
        &:hover {
          filter: drop-shadow(rgba(0, 0, 0, 0.15) 4px 4px 10px);
          .choice {
            filter: opacity(1);
          }
        }
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