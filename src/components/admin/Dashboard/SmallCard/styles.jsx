import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const SmallCard_container = styled.div`
  flex: 1;
  background: ${Common.colors.adminBg};
  box-shadow: 0 -3px 31px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
  > div {
    position: relative;
    padding: 25px;
    color: ${Common.colors.white};
    > h2 {
      font-size: 16px;
      margin-bottom: 15px;
    }
    > h1 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .percent_box {
      display: flex;
      align-items: center;
      .percent {
        font-size: 12px;
        line-height: 12px;
        background: ${Common.colors.primary300};
        padding: 3px 5px;
        border-radius: 3px;
        margin-right: 5px;
      }
      .text {
        font-size: 12px;
      }
    }
    .logo {
      position: absolute;
      top: 15px;
      right: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      transition: all 0.2s ease;
      &:hover {
        font-weight: bold;
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }
`;
