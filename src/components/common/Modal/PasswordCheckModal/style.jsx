import styled from '@emotion/styled';
import { Common } from 'styles/Common';

export const PasswordCheck_container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${Common.colors.bg200};
  border: 2px solid ${Common.colors.bg200};
  box-shadow: 24px;
  padding: 4px;
`;
