'use client';
import * as React from 'react';
import { BasicModal } from 'components/common/Modal/BasicModal';
import { useState } from 'react';
import { Modal_view } from '../Modal_view';
export const Board_item = ({ user, item, checkedList, onCheckedElement }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <li className="board_item" key={item.id}>
        <div>
          {user.role === 'admin' ? (
            <span>
              <input
                type="checkbox"
                onChange={(e) =>
                  onCheckedElement(e.target.checked, {
                    id: item.id,
                    images: [item.public_id_row, item?.public_id_col, item?.public_id_square],
                    bannerState: item.bannerState,
                  })
                }
                checked={checkedList.filter((el) => el.id === item.id).length ? true : false}
              />
            </span>
          ) : (
            <></>
          )}

          <span className="id">{item.id}</span>
          <span className="state">
            {item.bannerState === 'banner'
              ? '현수막'
              : item.bannerState === 'print'
              ? '인쇄물'
              : item.bannerState === 'real'
              ? '실사'
              : ''}
          </span>
          <span className="title">
            <div className="modal_title" onClick={() => setIsModal(true)}>
              {item.title}
            </div>
            <BasicModal state={isModal} onClose={() => setIsModal(false)}>
              <Modal_view item={item} />
            </BasicModal>
          </span>
          <span className="date">{String(item.created_at).substring(5, 10)}</span>
        </div>
      </li>
    </>
  );
};
