import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const BoardCard_container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 1280px;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px;
    border-bottom: 1px solid ${Common.colors.bd100};
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background: ${Common.colors.bg100};
      .id,
      .name,
      .date {
        color: ${Common.colors.black};
      }
      .title {
        color: ${Common.colors.primary100};
      }
    }
    > span {
      color: ${Common.colors.text200};
      &.id {
        flex: 0 0 50px;
        text-align: center;
      }
      &.state {
        color: ${Common.colors.primary100};
        flex: 0 0 100px;
        text-align: center;
        &.active {
          color: ${Common.colors.text200};
        }
      }
      &.title {
        flex: 1;
        text-align: center;
        overflow: hidden;
      }
      &.name {
        flex: 0 0 100px;
        text-align: center;
        overflow: hidden;
      }
      &.date {
        flex: 0 0 100px;
        text-align: center;
      }
    }
  }
`;
