import { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { useTemplatesActions, useAuthState } from 'store';
import BasicModal from 'components/common/Modal/BasicModal';
import AuthContainer from '../style';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgetPassword from '../ForgetPassword';

export default function AuthModal() {
  // Auth Modal 관련
  // zustand
  const { setAuthState } = useTemplatesActions();
  const authState = useAuthState();
  // type여부 관리
  const [authType, setAuthType] = useState('signIn');
  const onClose = () => {
    setAuthState();
    setAuthType('signIn');
  };
  return (
    <BasicModal state={authState} onClose={onClose}>
      <AuthContainer>
        <button type="button" className="closeBtn" onClick={onClose}>
          <AiOutlineClose />
        </button>
        {authType === 'signIn' ? (
          <SignIn authType={authType} setAuthType={setAuthType} />
        ) : authType === 'signUp' ? (
          <SignUp authType={authType} setAuthType={setAuthType} />
        ) : authType === 'forgetPassword' ? (
          <ForgetPassword setAuthType={setAuthType} />
        ) : (
          <h1>Error</h1>
        )}
      </AuthContainer>
    </BasicModal>
  );
}
