'use client';

import { useCallback, useState } from 'react';
import useSian from 'hooks/supabase/sian/useSian';
import SkeletonSianUpdate from 'components/common/Skeleton/SkeletonSianUpdate';

import { confirmAlert } from 'react-confirm-alert';
import SianAdminSkeleton from 'components/admin/Board/AdminWriteItem/SianAdminSkeleton';
import SianUpdate from '../SianUpdate';
import SianUpdateListContainer from './style';

export default function SianUpdateList({ orderId, role, state }) {
  // sian Data
  const { useGetOnlySian, useCreateEmptySian, useDeleteSian } = useSian();
  const { data: sianData } = useGetOnlySian(orderId);
  const { mutate: DeleteSian } = useDeleteSian(orderId);
  const { mutate: CreateEmptySian } = useCreateEmptySian(orderId);
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
            checkedList.map((id) => DeleteSian(id));
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
    <SianUpdateListContainer>
      {role === 'admin' && (
        <div className="btn_box">
          <button type="button" className="create_sian" onClick={handleCreateSian}>
            시안등록하기
          </button>
          <button
            type="button"
            className="delete_sian"
            onClick={() => (checkedList.length > 0 ? deleteSian() : null)}
          >
            선택 삭제
          </button>
        </div>
      )}
      {sianData?.length ? (
        sianData.map((item, index) => (
          <li className="sian_item" key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => onCheckedElement(e.target.checked, item.id)}
              checked={!!checkedList.includes(item.id)}
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
        <SianAdminSkeleton orderId={orderId} />
      ) : (
        <SkeletonSianUpdate />
      )}
    </SianUpdateListContainer>
  );
}
