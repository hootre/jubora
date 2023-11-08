import styled from '@emotion/styled';
import Common from 'styles/Common';

const DashboardFrameContainer = styled.div`
  flex: ${(props) => props.flexSize} ${(props) => props.flexSize} 0;
  box-shadow: 0 -3px 31px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
  background: ${Common.colors.white};
  height: 450px;
  > .title {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 15px;
    font-size: 20px;
    color: ${Common.colors.white};
    background: ${Common.colors.black};
    .modify {
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
      color: ${Common.colors.text200};
      &:hover {
        color: ${Common.colors.white};
      }
    }
  }
  main {
    height: 90%;
    overflow-y: auto;
  }
`;
export default DashboardFrameContainer;
