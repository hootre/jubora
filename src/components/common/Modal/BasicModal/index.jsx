import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';

export const BasicModal = ({ state, setState, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={state}
      onClose={setState}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={state}>
        <Box>{children}</Box>
      </Fade>
    </Modal>
  );
};
