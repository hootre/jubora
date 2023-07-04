import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Search_input_box = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 18px;
  background: ${Common.colors.bg100};
  border: 1px solid ${Common.colors.bg200};
  box-sizing: border-box;
  border-radius: 17px;
  height: 34px;
  margin-right: 25px;
  transition: all 0.3s;
  &:hover {
    border-color: ${Common.colors.primary300};
  }
  &:focus-within {
    background-color: ${Common.colors.white};
    box-shadow: 0px 9px 11px 5px rgba(0, 0, 0, 0.05);
  }
  > svg {
    color: ${Common.colors.text200};
  }
  > input {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.64;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${Common.colors.text100};
    width: 100%;
    line-height: 22px;
    border: none;
    background: inherit;
    height: 22px;
    margin-left: 5px;
  }
`;
