import styled from '@emotion/styled';
import Common from 'styles/Common';

const CenterLayoutContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 50px 0;
  .header {
    width: 100%;
    > .title {
      display: flex;
      justify-content: center;
      color: ${Common.colors.text100};
      font-size: 35px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .nav_box {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 100px;
      .nav_item {
        width: 80%;
        display: flex;
        > a {
          flex: 1;
          text-align: center;
          font-size: 20px;
          padding: 10px 20px;
          border: 1px solid ${Common.colors.bd100};
          color: ${Common.colors.text300};
          transition: all 0.2s ease;
          &.active,
          &:hover {
            border: 1px solid ${Common.colors.black};
            color: ${Common.colors.text100};
          }
        }
      }
    }
  }
`;
export default CenterLayoutContainer;
