import styled from '@emotion/styled';
import Common from 'styles/Common';

const SelectTextBoxContainer = styled.ul`
  position: relative;
  height: 50px;
  padding: 15px;
  background-color: ${Common.colors.black};
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  color: ${Common.colors.white};
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      height: 100%;
    }
  }
  .drop_down {
    color: ${Common.colors.white};
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
        &.cur_category {
          font-weight: bold;
          color: ${Common.colors.black};
          background-color: ${Common.colors.bg100};
        }
        background-color: ${Common.colors.black};
        width: 100%;
        a {
          padding: 10px;
          display: inline-block;
          width: 100%;
          height: 100%;
          color: ${Common.colors.white};
          text-align: left;
          text-decoration: none;
        }
      }
    }
    &.active {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
export default SelectTextBoxContainer;
