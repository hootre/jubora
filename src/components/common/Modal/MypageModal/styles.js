import styled from 'styled-components';

export const MypageModalBox = styled.article`
  position: absolute;
  top: 25px;
  right: 0;
  width: 240px;
  background: var(--base-white);
  border-radius: 4px;
  box-shadow: 0 2px 14px #00000040;
  padding: 22px 36px;
  box-sizing: border-box;
  .head {
    display: block;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--bd-100);
    > h1 {
      display: inline-block;
      color: var(--text-100);
      font-size: 18px;
      font-weight: bold;
      position: relative;
      margin-bottom: 5px;
      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--accent-100);
      }
    }
    > h2 {
      color: var(--text-200);
      font-size: 10px;
    }
  }
  .content {
    margin-top: 20px;
    > ul {
      li {
        position: relative;
        cursor: pointer;
        padding: 10px 0;
        display: block;
        &:hover {
          font-weight: bold;
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -10px;
            width: 5px;
            height: 5px;
            background: var(--accent-100);
          }
        }
      }
    }
  }
`;