import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Search_input_box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 18px;
  background: ${Common.colors.white};
  border: 1px solid ${Common.colors.primary100};
  box-sizing: border-box;
  border-radius: 17px;
  width: 400px;
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
  &:hover {
    border-color: ${Common.colors.primary300};
  }
  &:focus-within {
    background-color: ${Common.colors.white};
    box-shadow: 0px 2px 3px 3px rgba(252, 255, 55, 0.082);
  }
  > svg {
    color: ${Common.colors.text300};
  }
  > input {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.64;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${Common.colors.text300};
    width: 100%;
    line-height: 22px;
    border: none;
    background: inherit;
    height: 22px;
    margin-left: 5px;
    &:placeholder {
      color: ${Common.colors.text300};
    }
  }
`;
