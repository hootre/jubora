import styled from '@emotion/styled';
import Common from 'styles/Common';

const SideDatailContainer = styled.div`
  width: 300px;
  height: 700px;
  > h1 {
    padding: 10px;
    font-size: 25px;
  }
  .price_box {
    display: flex;
    flex-direction: column;

    .add_price {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      > h1 {
        font-size: 15px;
      }
      > h2 {
        color: ${Common.colors.primary100};
        font-size: 15px;
      }
    }
    .price {
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
  .side_content {
    padding: 15px;
    border: 1px solid #000;
    > img {
      width: 100%;
      object-fit: contain;
    }
    > h1 {
      font-size: 20px;
      font-weight: bold;
      padding: 10px 0;
    }
    > .description {
      border-top: 1px solid#000;
      color: ${Common.colors.text200};
      line-height: 25px;
      padding: 10px 0;
      white-space: pre-line;
      line-height: 20px;
    }
    > .price_box {
      border-top: 1px solid#000;
      > .add_price {
        padding: 10px 0;
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
export default SideDatailContainer;
