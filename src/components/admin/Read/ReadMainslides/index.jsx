import React, { useState, useCallback } from 'react';
import MainSlides from 'components/home/Main/MainSlides';

import Link from 'next/link';
import User from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useMainSlides from 'hooks/supabase/main/slides/useMainSlides';
import MainLoading from 'components/Loading/MainLoading';

import ReadMainslidesContainer from './style';

export default function ReadMainslides({ view }) {
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // slides
  const { useGetMainSlides, useDeleteMainSlides } = useMainSlides();
  const { data: noticeData, isLoading } = useGetMainSlides();
  const { mutate: handleDelete } = useDeleteMainSlides();

  const deleteNotice = () => {
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            checkedList.map((item) => handleDelete(item));
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

        noticeData.forEach((item) => checkedListArray.push({ id: item.id, images: item.images }));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [noticeData]
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
    <ReadMainslidesContainer>
      <MainSlides />
      {!view && (
        <>
          <div className="top_box">
            {user.role === 'admin' && (
              <div className="btn_box">
                <div className="C_basic_button">
                  <Link href="/admin/board/write">글쓰기</Link>
                </div>
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
                      checkedList.length === 0 ? false : checkedList.length === noticeData.length
                    }
                  />
                </span>
              )}

              <span className="id">번호</span>
              <span className="title">제목</span>
              <span className="date">날짜</span>
            </div>
          </div>
          <ul>
            {noticeData
              .sort((item) => item.state === '공지')
              ?.map((item) => (
                <li className="BoardItem" key={item.id}>
                  <div>
                    {user.role === 'admin' && (
                      <span>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedElement(e.target.checked, { id: item.id, images: item.images })
                          }
                          checked={!!checkedList.filter((el) => el.id === item.id).length}
                        />
                      </span>
                    )}

                    <span className="id">{item.id}</span>
                    <span className="title">{item.subtitle}</span>
                    <span className="date">{String(item.createdAt).substring(5, 10)}</span>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </ReadMainslidesContainer>
  );
}
