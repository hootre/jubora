'use client';
import * as React from 'react';
import { Read_OrderList_container } from './styles';
import { useState } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { useUser } from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { LoginRequest } from 'components/common/LoginRequest';
import { useQnA } from 'hooks/supabase/qna/useQnA';
import { useOrder } from 'hooks/supabase/order/useOrder';
const Read_OrderList = () => {
  // user상태관리
  const { useGetUserInfo } = useUser();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // notice
  const { useGetOrder, useDeleteOrder } = useOrder();
  const { data: orderData, isLoading } = useGetOrder();
  const { mutate: handleDelete } = useDeleteOrder();

  // 삭제 확인
  const deleteNotice = () => {
    confirmAlert({
      title: '정말로 삭제하시겠습니까?',
      message: '복구 불가능합니다',
      buttons: [
        {
          label: '삭제',
          onClick: () => {
            checkedList.map((id) => {
              handleDelete(id);
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

        orderData.forEach((item) => checkedListArray.push(item.id));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [orderData]
  );

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
  if (isLoading || userLoading) {
    return <h1>Loading</h1>;
  }
  if (!user.id) {
    return (
      <Read_OrderList_container>
        <div className="login_check">
          <LoginRequest />
        </div>
      </Read_OrderList_container>
    );
  }
  return (
    <Read_OrderList_container>
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
                    : checkedList.length === orderData.length
                    ? true
                    : false
                }
              />
            </span>
          ) : (
            <></>
          )}
          <span className="id">번호</span>
          <span className="state">주문상태</span>
          <span className="title">제목</span>
          <span className="name">업체</span>
          <span className="date">등록일</span>
        </div>
      </div>
      <div>
        {orderData
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <div className="board_item" key={item.id}>
              <div>
                {user.role === 'admin' ? (
                  <span>
                    <input
                      type="checkbox"
                      onChange={(e) => onCheckedElement(e.target.checked, item.id)}
                      checked={checkedList.includes(item.id) ? true : false}
                    />
                  </span>
                ) : (
                  <></>
                )}
                <span className="id">{item.id}</span>
                <span className="state">[{item.state}]</span>
                <span className="title">
                  <Link href={`/admin/order/${item.id}`}>{item.title}</Link>
                </span>
                <span className="name">{item.name}</span>
                <span className="date">{String(item.created_at).substring(5, 10)}</span>
              </div>
            </div>
          ))}
      </div>
    </Read_OrderList_container>
  );
};
export default Read_OrderList;
