import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';
import ModalContainer from './style';

export default function BasicModal({ state, onClose, children }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={state}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={state}>
        <Box>
          <ModalContainer width={1280}>{children}</ModalContainer>
        </Box>
      </Fade>
    </Modal>
  );
}
