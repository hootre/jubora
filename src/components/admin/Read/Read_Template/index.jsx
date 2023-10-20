'use client';
import * as React from 'react';
import { Read_Template_container } from './styles';
import { useState } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { useNotice } from 'hooks/supabase/notice/useNotice';
import { useUser } from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useTemplates } from 'hooks/supabase/templates/useTemplates';
import { Board_item } from './Board_item';
export const Read_Template = () => {
  // user상태관리
  const { useGetUserInfo } = useUser();
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
            checkedList.map((item) => {
              console.log(item);
              handleDelete(item);
            });
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
            images: [item.public_id_row, item?.public_id_col, item?.public_id_square],
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
    return <h1>Loading</h1>;
  }
  return (
    <Read_Template_container>
      <div className="top_box">
        {user.role === 'admin' ? (
          <div className="btn_box">
            <div
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteNotice() : '')}
            >
              선택 삭제
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="board_header">
        <div>
          {user.role === 'admin' ? (
            <span>
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList.length === 0
                    ? false
                    : checkedList.length === templatesData.length
                    ? true
                    : false
                }
              />
            </span>
          ) : (
            <></>
          )}

          <span className="id">번호</span>
          <span className="state">분류</span>
          <span className="title">제목</span>
          <span className="date">날짜</span>
        </div>
      </div>
      <ul>
        {templatesData?.map((item) => (
          <Board_item
            user={user}
            item={item}
            checkedList={checkedList}
            onCheckedElement={onCheckedElement}
          />
        ))}
      </ul>
    </Read_Template_container>
  );
};
