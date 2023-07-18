import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Showcase_container = styled.section`
  margin-top: 30px;
  .top_nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: ${Common.colors.text100};
      position: relative;
      display: inline-block;
      &:after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: ${Common.colors.primary300};
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
          background: ${Common.colors.black};
          z-index: -1;
          border-radius: 0.375rem;
        }
        a {
          cursor: pointer;
          z-index: -1;
          border-radius: 5px;
          color: ${Common.colors.text200};
          &:hover {
            color: ${Common.colors.black};
          }
          &.active {
            color: ${Common.colors.white};
          }
        }
      }
    }
  }
  .showcase {
    overflow: overlay;
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
            background-color: ${Common.colors.bg100};
            transition: opacity 1s ease-out 0s;
          }
          a {
            color: ${Common.colors.white};
          }
        }
      }
    }
  }
`;
