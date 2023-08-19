import React, { useState } from 'react';
import { BoardCard_container } from './style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { PasswordCheckModal } from 'components/common/Modal/PasswordCheckModal';
import { useRouter } from 'next/navigation';
import { useUser } from 'hooks/supabase/auth/useUser';

export const BoardCard = ({
  item: { id, public_id, title, writer_user_email, name, created_at },
  table,
  deleteOrder,
  modal = false,
}) => {
  const [open, setOpen] = useState(false);
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user } = useGetUserInfo();

  const router = useRouter();
  const handleCheckisModal = () => {
    if (user.email === writer_user_email) {
      router.push(`/${table}/${id}`);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <BoardCard_container>
      <div onClick={modal && handleCheckisModal}>
        <span className="id">{id}</span>
        <span className="state">[ 확인전 ]</span>
        <span className="title">{title}</span>
        <span className="name">{name}</span>
        <span className="date">{String(created_at).substring(5, 10)}</span>
      </div>
      <button onClick={() => deleteOrder(id, public_id)} className="basic_button">
        삭제
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <PasswordCheckModal table={table} id={id} />
          </Box>
        </Fade>
      </Modal>
    </BoardCard_container>
  );
};
