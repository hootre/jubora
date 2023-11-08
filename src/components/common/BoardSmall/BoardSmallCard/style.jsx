import styled from '@emotion/styled';
import Common from 'styles/Common';

const BoardSmallCardContainer = styled.div`
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;
  background: ${Common.colors.white};
  cursor: pointer;
  .main_text {
    h1 {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 5px;
      width: 250px;
    }
    h2 {
      font-size: 13px;
      font-weight: 400;
      width: 250px;
      color: ${Common.colors.text200};
    }
  }
  .date {
    font-size: 12px;
    color: ${Common.colors.text200};
  }
`;
export default BoardSmallCardContainer;
