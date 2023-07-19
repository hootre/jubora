import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const BoardCardHeader_container = styled.div`
  display: flex;
  justify-content: center;
  > div {
    width: 1280px;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    transition: all 0.2s ease;
    > span {
      &.id {
        flex: 0 0 50px;
        text-align: center;
      }
      &.state {
        flex: 0 0 100px;
        text-align: center;
      }
      &.title {
        flex: 1;
        text-align: center;
      }
      &.name {
        flex: 0 0 100px;
        text-align: center;
      }
      &.date {
        flex: 0 0 100px;
        text-align: center;
      }
    }
  }
`;
