import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const BoardDetail_container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  > div {
    width: 1200px;
    .title_box {
      display: flex;
      align-items: center;
      .title {
        font-size: 30px;
        color: ${Common.colors.text200};
        padding: 20px 0;
      }
    }

    .img {
      > img {
        width: 500px;
      }
    }
    img {
      width: 300px;
    }
  }
`;
