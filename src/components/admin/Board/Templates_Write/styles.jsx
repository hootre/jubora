import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const Templates_Write_container = styled.div`
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: ${Common.size.container_width};
    margin: 0 auto;
  }
  > .title {
    width: 100%;
    text-align: left;
    font-size: 22px;
    padding: 20px;
  }
  .from_item_btn {
    padding: 10px 40px;
    border-radius: 2px;
    transition: all 0.2s ease;
    cursor: pointer;
    font-weight: bold;
    color: ${Common.colors.white};
    background: ${Common.colors.black};
  }
  .option_container {
    width: 100%;
    display: flex;
    -webkit-box-align: baseline;
    align-items: center;
    min-height: 40px;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: 1px solid ${Common.colors.bd100};

    h2 {
      flex: 0 0 140px;
      font-size: 15px;
      padding: 0 20px;
    }
    > div {
      display: flex;
    }
  }
  .submit_btn {
    margin-top: 10px;
  }
`;
