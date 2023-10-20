import React from 'react';
import { ConfirmToast_container } from './style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

export const ConfirmToast = ({ openState, title, handleOpen, handleClose }) => {
  return (
    <ConfirmToast_container>
      <h1>정말로 삭제하시겠습니까?</h1>
      <div>
        <div>삭제</div>
        <div>취소</div>
      </div>
    </ConfirmToast_container>
  );
};
