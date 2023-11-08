import styled from '@emotion/styled';
import Common from 'styles/Common';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 24px;
  padding: 30px;
  background: ${Common.colors.white};
`;
export default ModalContainer;
