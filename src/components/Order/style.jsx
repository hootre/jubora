import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Public_order_container = styled.div`
  display: flex;
  -webkit-box-align: baseline;
  align-items: center;
  min-height: 40px;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid ${Common.colors.bd100};
  &.productImg {
    display: flex;
    align-items: end;
    justify-content: start;
    > div {
      h1 {
        padding: 5px;
      }
      img {
        padding: 5px;
        border: 1px solid ${Common.colors.bd100};
        width: 400px;
        max-height: 400px;
        object-fit: contain;
      }
    }
    .sample_btn {
      margin: 5px;
      padding: 7px 60px;
      color: ${Common.colors.white};
      background: ${Common.colors.black};
      border-radius: 10px;
      transition: all 0.2s ease;
      cursor: pointer;
    }
  }
  .password_text {
    font-size: 13px;
    color: ${Common.colors.text200};
  }
  .point_text {
    height: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    color: var(--base-red);
    font-size: 13px;
    opacity: 0.2;
    transition: all 0.5s ease;
  }
  h2 {
    font-size: 15px;
    flex: 0 0 100px;
  }
  .text {
    font-size: 13px;
    flex: 1;
  }
  .type_btn_box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  &.name_box {
    > h2:not(:first-of-type) {
      flex: 0 0 80px;
    }
    > div {
      margin-right: 10px;
    }
  }
  .option_box {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 50px;
    line-height: 50px;
    position: relative;
    > option {
      > span {
        position: absolute;
        padding: 20px;
      }
    }
  }
`;
