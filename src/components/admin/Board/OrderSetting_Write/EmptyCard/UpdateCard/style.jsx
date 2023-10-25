import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const UpdateCard_container = styled.div`
  .item_title {
    display: inline-block;
    font-size: 18px;
    padding: 20px 0px 10px 0px;
    border-bottom: 1px solid ${Common.colors.accent100};
  }
  .orderSetting_box {
    .update_box {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 40px;
      flex-direction: row;
      padding: 10px 0;
      color: ${Common.colors.text300};
      border-bottom: 1px solid ${Common.colors.bd100};
      .update_title_box {
        flex: 0 0 140px;
        > h2 {
          font-size: 15px;
        }
        > div {
          padding: 10px 0px;
          margin-bottom: 10px;
          min-height: 40px;
        }
      }
      .update_item_box {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
    }
  }
`;
