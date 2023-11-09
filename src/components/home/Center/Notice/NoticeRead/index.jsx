'use client';

import { useState, useCallback } from 'react';

import Link from 'next/link';
import useNotice from 'hooks/supabase/notice/useNotice';
import { confirmAlert } from 'react-confirm-alert';
import MainLoading from 'components/Loading/MainLoading';
import User from 'hooks/supabase/auth/useUser';
import NoticeReadContainer from './styles';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Import css
function NoticeRead() {
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // notice
  const { useGetNotice, useDeleteNotice } = useNotice();
  const { data: noticeData, isLoading } = useGetNotice();
  const { mutate: handleDelete } = useDeleteNotice();

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
    <NoticeReadContainer>
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
          <span className="state">분류</span>
          <span className="title">제목</span>
          <span className="name">작성자</span>
          <span className="date">날짜</span>
        </div>
      </div>
      <ul className="main">
        {noticeData.length > 0 ? (
          noticeData
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
                  <span className={item.type === '공지' ? 'notice state' : 'state'}>
                    [{item.type}]
                  </span>
                  <span className="title">
                    <Link href={`/home/center/notice/${item.id}`}>{item.title}</Link>
                  </span>
                  <span className="name">{item.name}</span>
                  <span className="date">{String(item.createdAt).substring(5, 10)}</span>
                </div>
              </li>
            ))
        ) : (
          <h1>게시된 글이 없습니다</h1>
        )}
      </ul>
    </NoticeReadContainer>
  );
}
export default NoticeRead;
