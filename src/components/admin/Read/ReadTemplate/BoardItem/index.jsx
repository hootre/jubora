'use client';

import * as React from 'react';
import BasicModal from 'components/common/Modal/BasicModal';
import { useState } from 'react';
import ModalView from '../ModalView';

function BoardItem({ user, item, checkedList, onCheckedElement }) {
  const [isModal, setIsModal] = useState(false);
  return (
    <li className="BoardItem" key={item.id}>
      <div>
        {user.role === 'admin' && (
          <span>
            <input
              type="checkbox"
              onChange={(e) =>
                onCheckedElement(e.target.checked, {
                  id: item.id,
                  images: [item.publicIdRow, item?.publicIdCol, item?.publicIdSquare],
                  bannerState: item.bannerState,
                })
              }
              checked={!!checkedList.filter((el) => el.id === item.id).length}
            />
          </span>
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
          <button type="button" className="modal_title" onClick={() => setIsModal(true)}>
            {item.title}
          </button>
          <BasicModal state={isModal} onClose={() => setIsModal(false)}>
            <ModalView item={item} />
          </BasicModal>
        </span>
        <span className="date">{String(item.createdAt).substring(5, 10)}</span>
      </div>
    </li>
  );
}

export default BoardItem;
