import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Side_datail_container = styled.div`
  width: 300px;
  height: 700px;
  > h1 {
    padding: 10px;
    font-size: 25px;
  }
  .side_content {
    padding: 15px;
    border: 1px solid #000;
    > img {
      width: 100%;
      object-fit: cover;
    }
    > h1 {
      font-size: 20px;
      font-weight: bold;
      padding: 10px 0;
    }
    > p {
      color: ${Common.colors.text200};
      line-height: 25px;
      margin-bottom: 10px;
    }
    .price {
      border-top: 1px solid#000;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      > h1 {
        font-size: 25px;
      }
      > h2 {
        color: ${Common.colors.primary100};
        font-size: 25px;
      }
    }
  }
  .purchaseBox {
    margin-top: 10px;
    > button {
      width: 100%;
    }
  }
`;
