import React, { useState } from 'react';
import { BoardCard_container } from './style';
import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { PasswordCheckModal } from 'components/common/Modal/PasswordCheckModal';
import { useRouter } from 'next/navigation';
import { useUser } from 'hooks/supabase/auth/useUser';

export const BoardCard = ({
  item: { id, public_id, state, title, writer_user_email, name, created_at },
  table,
}) => {
  return (
    <BoardCard_container>
      <div>
        <span className="id">{id}</span>
        <span className="state">[{state}]</span>
        <span className="title">{title}</span>
        <span className="name">{name}</span>
        <span className="date">{String(created_at).substring(5, 10)}</span>
      </div>
      {/* <button onClick={() => deleteOrder(id, public_id)} className="C_basic_button">
        삭제
      </button> */}
    </BoardCard_container>
  );
};
