import styled from '@emotion/styled';
import Common from 'styles/Common';

const MyModifyContainer = styled.div`
  padding: 10px;
  .noData {
    font-size: 20px;
    color: ${Common.colors.text200};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default MyModifyContainer;
