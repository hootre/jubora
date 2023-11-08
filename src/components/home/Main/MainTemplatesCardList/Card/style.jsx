import styled from '@emotion/styled';
import Common from 'styles/Common';

const CardContainer = styled.div`
  margin: 0 auto;
  img {
    width: 500px;
    height: 200px;
  }
  .title_box {
    display: flex;
    padding: 10px 0;
    > h1 {
      font-size: 24px;
      margin-right: 10px;
    }
    > span {
      display: flex;
      align-items: end;
      color: ${Common.colors.primary300};
    }
  }
  .subTitle {
    color: ${Common.colors.text300};
  }
`;
export default CardContainer;
