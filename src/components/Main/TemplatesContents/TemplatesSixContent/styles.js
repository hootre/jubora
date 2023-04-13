import styled from 'styled-components';

export const TemplatesSixContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    height: 550px;
    max-width: 1400px;
    .imgBox {
      display: flex;
      align-items: center;
      padding: 20px;
      max-height: 520px;
      width: 500px;
      background: var(--bg-100);
      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .side {
      flex: 1.5;
      padding: 10px;
      width: 800px;
      .nav {
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--bd-100);
        .price {
          width: 100%;
          > h1 {
            font-weight: bold;
            font-size: 20px;
            padding: 10px 0 15px 0;
          }
          > h2 {
            font-size: 16px;
            color: var(--primary-100);
          }
        }
        .check {
          display: flex;
          align-items: end;
          a {
            text-align: center;
            min-width: 200px;
            display: block;
            padding: 10px 10px;
            border-radius: 15px;
            background: var(--primary-300);
            transition: all 0.2s ease;
            &:hover {
              background: var(--primary-200);
            }
          }
        }
      }
      section {
        padding-top: 20px;
        .header {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          > h1 {
            font-weight: bold;
          }
          > a {
            color: var(--text-200);
            text-decoration: underline;
            font-size: 13px;
            cursor: pointer;
            &:hover {
              color: var(--base-black);
            }
          }
        }
        ul {
          display: grid;
          gap: 10px;
          &.row {
            grid-template-rows: repeat(2, 0.5fr);
            grid-template-columns: repeat(2, 1fr);
          }
          &.col {
            grid-template-columns: repeat(6, 1fr);
          }
          &.square {
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
          }
          li {
            position: relative;
            &.currentContent {
              cursor: pointer;
              border: 1px solid var(--primary-100);
              &:before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 13px 15px;
                border-radius: 50%;
                background-color: var(--primary-300);
                content: 'V';
                font-weight: bold;
                color: var(--base-white);
                z-index: 2;
              }
              &:after {
                content: '';
                width: 100%;
                height: 100%;
                background-color: var(--primary-300);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                opacity: 0.5;
              }
            }
            > img {
              cursor: pointer;
              width: 100%;
              height: 100%;
              object-fit: cover;
              &:hover {
                box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
                  rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
              }
            }
          }
        }
      }
    }
  }
`;
