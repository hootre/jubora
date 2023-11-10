'use client';

import { useState, useCallback } from 'react';

import Link from 'next/link';
import User from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useOrder from 'hooks/supabase/order/useOrder';
import MainLoading from 'components/Loading/MainLoading';
import ReadOrderListContainer from './styles';

export default function ReadOrderList() {
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);
  // user상태관리
  const { useGetUserInfo } = User();
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
            checkedList.map((id) => handleDelete(id));
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
    return <MainLoading />;
  }
  return (
    <ReadOrderListContainer>
      <div className="top_box">
        {user.role === 'admin' ? (
          <div className="btn_box">
            <button
              type="button"
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteNotice() : '')}
            >
              선택 삭제
            </button>
          </div>
        ) : (
          user.role && (
            <div className="btn_box">
              <div className="C_basic_button">
                <Link href="/home/write">글쓰기</Link>
              </div>
            </div>
          )
        )}
      </div>
      <div className="board_header">
        <div>
          {user.role === 'admin' && (
            <span>
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={checkedList.length === 0 ? false : checkedList.length === orderData.length}
              />
            </span>
          )}
          <span className="id">번호</span>
          <span className="state">주문상태</span>
          <span className="title">제목</span>
          <span className="name">업체</span>
          <span className="date">등록일</span>
        </div>
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData
            .sort((a, b) => b.id - a.id)
            ?.map((item) => (
              <div
                className={item.state === '배송완료' ? `BoardItem success` : `BoardItem`}
                key={item.id}
              >
                <div>
                  {user.role === 'admin' && (
                    <span>
                      <input
                        type="checkbox"
                        onChange={(e) => onCheckedElement(e.target.checked, item.id)}
                        checked={!!checkedList.includes(item.id)}
                      />
                    </span>
                  )}
                  <span className="id">{item.id}</span>
                  <span className="state">[{item.state}]</span>
                  <span className="title">
                    <Link href={`/admin/board/write/sian/${item.id}`}>{item.title}</Link>
                  </span>
                  <span className="name">{item.name}</span>
                  <span className="date">{String(item.createdAt).substring(5, 10)}</span>
                </div>
              </div>
            ))
        ) : (
          <div className="noBoard">
            <h1>게시된 글이 없습니다</h1>
          </div>
        )}
      </div>
    </ReadOrderListContainer>
  );
}
