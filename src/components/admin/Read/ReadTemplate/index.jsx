'use client';

import { useState, useCallback } from 'react';

import User from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useTemplates from 'hooks/supabase/templates/useTemplates';
import MainLoading from 'components/Loading/MainLoading';
import BoardItem from './BoardItem';
import ReadTemplateContainer from './styles';

export default function ReadTemplate() {
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // 제품목록
  const { useGetTemplates, useDeleteTemplates } = useTemplates();
  const { data: templatesData, isLoading } = useGetTemplates();
  const { mutate: handleDelete } = useDeleteTemplates();

  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);
  const deleteNotice = () => {
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            checkedList.map((item) => handleDelete(item));
            setCheckedLists([]);
          },
        },
        {
          label: '취소',
          onClick: () => {
            setCheckedLists([]);
          },
        },
      ],
    });
  };

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        templatesData.forEach((item) =>
          checkedListArray.push({
            id: item.id,
            images: [item.publicIdRow, item?.publicId_col, item?.publicId_square],
            bannerState: item.bannerState,
          })
        );

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [templatesData]
  );

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedLists([...checkedList, list]);
      } else {
        setCheckedLists(checkedList.filter((el) => el.id !== list.id));
      }
    },
    [checkedList]
  );

  if (isLoading || userLoading) {
    return <MainLoading />;
  }
  return (
    <ReadTemplateContainer>
      <div className="top_box">
        {user.role === 'admin' && (
          <div className="btn_box">
            <button
              type="button"
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteNotice() : '')}
            >
              선택 삭제
            </button>
          </div>
        )}
      </div>
      <div className="board_header">
        <div>
          {user.role === 'admin' && (
            <span>
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList.length === 0 ? false : checkedList.length === templatesData.length
                }
              />
            </span>
          )}

          <span className="id">번호</span>
          <span className="state">분류</span>
          <span className="title">제목</span>
          <span className="date">날짜</span>
        </div>
      </div>
      <ul>
        {templatesData?.map((item) => (
          <BoardItem
            key={item.id}
            user={user}
            item={item}
            checkedList={checkedList}
            onCheckedElement={onCheckedElement}
          />
        ))}
      </ul>
    </ReadTemplateContainer>
  );
}
