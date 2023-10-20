import React from 'react';
import { DeleteAuthBtn_container, Modal_Content } from './style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

export const DeleteAuthBtn = ({ openState, title, handleOpen, handleClose }) => {
  return (
    <DeleteAuthBtn_container>
      <div onClick={handleOpen} className="delete_user_btn">
        {title}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openState}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openState}>
          <Box>
            <Modal_Content className="open_box">
              <div className="text_box">
                <h1>정말로 회원탈퇴를 진행하시겠습니까?</h1>
                <h2>되돌릴 수 없습니다!</h2>
              </div>
              <div className="btn_box">
                <button className="cancel" onClick={handleClose}>
                  취소
                </button>
                <button className="delete">삭제</button>
              </div>
            </Modal_Content>
          </Box>
        </Fade>
      </Modal>
    </DeleteAuthBtn_container>
  );
};
