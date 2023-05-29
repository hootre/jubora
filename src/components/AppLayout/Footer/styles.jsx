import styled from 'styled-components';

export const FooterBox = styled.footer`
  background-color: var(--base-black);
  color: var(--text-200);
  font-size: 12px;
  .footer {
    padding: 40px 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footerContent {
      display: flex;
      flex-direction: column;
      nav {
        margin-bottom: 15px;
        ul {
          display: flex;
          align-items: center;
          li {
            font-weight: 500;
            span {
              display: block;
              width: 1px;
              height: 14px;
              background-color: var(--bg-200);
              margin: 0 20px;
            }
          }
        }
      }
      .footerInfo {
        display: flex;
        align-items: center;
        img {
          width: 120px;
          height: auto;
          margin-right: 20px;
          filter: grayscale(30%);
        }
        p {
          line-height: 1.67;
          b {
            color: var(--base-white);
            font-weight: 800;
          }
        }
      }
    }
    .footerCs {
      p {
        &.footerTitle {
          color: var(--base-white);
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        line-height: 1.67;
      }
    }
  }
`;
