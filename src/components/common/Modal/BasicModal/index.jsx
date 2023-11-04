import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';
import { Modal_container } from './style';

export const BasicModal = ({ state, onClose, children }) => {
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
          <Modal_container width={1280}>{children}</Modal_container>
        </Box>
      </Fade>
    </Modal>
  );
};
