import styled from '@emotion/styled';
import Common from 'styles/Common';

const PasswordCheckContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  box-shadow: 24px;
  padding: 15px;
  background: ${Common.colors.white};
  border-radius: 15px;
  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > h1 {
      padding: 10px;
    }
    .input_box {
      display: flex;
      > input {
        width: 150px;
        border: 2px solid ${Common.colors.primaryBg};
        line-height: 20px;
        margin-right: 10px;
        transition: all 0.2s ease;
        &:hover,
        &:focus {
          border: 2px solid ${Common.colors.primary100};
        }
      }
    }
  }
`;
export default PasswordCheckContainer;
