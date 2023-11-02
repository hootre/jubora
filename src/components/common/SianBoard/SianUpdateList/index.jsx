'use client';
import React, { useCallback, useState } from 'react';
import { SianUpdateList_container } from './style';
import { useSian } from 'hooks/supabase/sian/useSian';
import { SianUpdate } from '../SianUpdate';
import { Skeleton_SianUpdate } from 'components/common/Skeleton/Skeleton_SianUpdate';
import { Sian_Admin_Skeleton } from 'components/admin/Board/Admin_Write_Item/Sian_Admin_Skeleton';
import { confirmAlert } from 'react-confirm-alert';

export const SianUpdateList = ({ order_id, role, state }) => {
  // sian Data
  const { useGetOnlySian, useCreateEmptySian, useDeleteSian } = useSian();
  const { data: sianData } = useGetOnlySian(order_id);
  const { mutate: DeleteSian } = useDeleteSian(order_id);
  const { mutate: CreateEmptySian } = useCreateEmptySian(order_id);
  const handleCreateSian = () => {
    CreateEmptySian();
  };
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);

  // 시안 삭제
  const deleteSian = () => {
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            checkedList.map((id) => {
              DeleteSian(id);
            });
          },
        },
        { label: '취소' },
      ],
    });
  };

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedLists([...checkedList, list]);
      } else {
        setCheckedLists(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );
  return (
    <SianUpdateList_container>
      {role === 'admin' && (
        <div className="btn_box">
          <div className="create_sian" onClick={handleCreateSian}>
            시안등록하기
          </div>
          <div
            className="delete_sian"
            onClick={() => (checkedList.length > 0 ? deleteSian() : null)}
          >
            선택 삭제
          </div>
        </div>
      )}
      {sianData?.length ? (
        sianData.map((item, index) => (
          <li className="sian_item" key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => onCheckedElement(e.target.checked, item.id)}
              checked={checkedList.includes(item.id) ? true : false}
              disabled
            />
            <SianUpdate
              key={item.id}
              data={item}
              index={index}
              expand={index === sianData.length - 1}
              role={role}
              disabled={state !== '확인전' && state !== '시안확인'}
            />
          </li>
        ))
      ) : role === 'admin' ? (
        <Sian_Admin_Skeleton order_id={order_id} />
      ) : (
        <Skeleton_SianUpdate />
      )}
    </SianUpdateList_container>
  );
};
