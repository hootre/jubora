'use client';
import * as React from 'react';
import { QnA_Read_container } from './styles';
import { useState } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { useUser } from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BiChevronDown } from 'react-icons/bi';
import { Accordion } from 'components/common/Accordion';
import { LoginRequest } from 'components/common/LoginRequest';
import { useQnA } from 'hooks/supabase/qna/useQnA';
import { useRouter } from 'next/navigation';
const QnA_Read = () => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // notice
  const { useGetQnA, useDeleteQnA } = useQnA();
  const { data: qnaData, isLoading } = useGetQnA();
  const { mutate: handleDelete } = useDeleteQnA();

  // 삭제 확인
  const deleteNotice = () => {
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            checkedList.map((item) => {
              handleDelete(item);
            });
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
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        qnaData.forEach((item) => checkedListArray.push({ id: item.id, images: item.images }));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [qnaData]
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
    <QnA_Read_container>
      <div className="top_box">
        {user.role === 'admin' ? (
          <div className="btn_box">
            <div className="C_basic_button">
              <Link href="/home/write">글쓰기</Link>
            </div>
            <div
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteNotice() : '')}
            >
              선택 삭제
            </div>
          </div>
        ) : user.role ? (
          <div className="btn_box">
            <div className="C_basic_button">
              <Link href="/home/write">글쓰기</Link>
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
                    : checkedList.length === qnaData.length
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
          <span className="name">작성자</span>
          <span className="date">날짜</span>
        </div>
      </div>
      <div>
        {qnaData
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <div className="board_item" key={item.id}>
              <div>
                {user.role === 'admin' ? (
                  <span>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        onCheckedElement(e.target.checked, { id: item.id, images: item.images })
                      }
                      checked={checkedList.filter((el) => el.id === item.id).length ? true : false}
                    />
                  </span>
                ) : (
                  <></>
                )}
                <span className="id">{item.id}</span>
                <span className="state">[{item.type}]</span>
                <span className="title">
                  <Link href={`/home/center/qna/${item.id}`}>{item.title}</Link>
                </span>

                <span className="name">{item.name}</span>

                <span className="date">{String(item.created_at).substring(5, 10)}</span>
              </div>
            </div>
          ))}
      </div>
    </QnA_Read_container>
  );
};
export default QnA_Read;
