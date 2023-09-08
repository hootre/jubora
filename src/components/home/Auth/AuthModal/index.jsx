import React from 'react';
import { useState } from 'react';
import { Auth_container } from '../style';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgetPassword from '../ForgetPassword';
import { AiOutlineClose } from 'react-icons/ai';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

import { useTemplatesActions } from 'store';
import { useAuthState } from 'store';
export const AuthModal = () => {
  //Auth Modal 관련
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
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={authState}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={authState}>
        <Box>
          <Auth_container>
            <button className="closeBtn" onClick={onClose}>
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
          </Auth_container>
        </Box>
      </Fade>
    </Modal>
  );
};
