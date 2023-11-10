'use client';

import * as React from 'react';
import { useState, useCallback } from 'react';

import Link from 'next/link';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useQuestion from 'hooks/supabase/question/useQuestion';
import { BiChevronDown } from 'react-icons/bi';
import Accordion from 'components/common/Accordion';
import MainLoading from 'components/Loading/MainLoading';
import User from 'hooks/supabase/auth/useUser';
import QuestionReadContainer from './styles';

export default function QuestionRead() {
  // user check 관리
  const [checkedList, setCheckedLists] = useState([]);
  // user상태관리
  const { useGetUserInfo } = User();
  const { data: user, isLoading: userLoading } = useGetUserInfo();

  // Question
  const { useGetQuestion, useDeleteQuestion } = useQuestion();
  const { data: questionData, isLoading } = useGetQuestion();
  const { mutate: handleDelete } = useDeleteQuestion();

  const deleteQuestion = () => {
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

        questionData.forEach((item) => checkedListArray.push({ id: item.id, images: item.images }));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [questionData]
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
    <QuestionReadContainer>
      <div className="top_box">
        {user.role === 'admin' && (
          <span>
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0 ? false : checkedList.length === questionData.length
              }
            />
          </span>
        )}
        {user.role === 'admin' && (
          <div className="btn_box">
            <div className="C_basic_button">
              <Link href="/admin/board/write/question">글쓰기</Link>
            </div>
            <button
              type="button"
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteQuestion() : null)}
            >
              선택 삭제
            </button>
          </div>
        )}
      </div>
      <div className="main">
        {questionData.length > 0 ? (
          questionData
            .sort((a, b) => b.id - a.id)
            ?.map((item) => (
              <Accordion contents={item.contents} key={item.id}>
                <div className="BoardItem" key={item.id}>
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

                    <span className="state">[{item.type}]</span>
                    <span className="title">{item.title}</span>
                  </div>
                  <div className="icon">
                    <BiChevronDown />
                  </div>
                </div>
              </Accordion>
            ))
        ) : (
          <div className="noBoard">
            <h1>게시된 글이 없습니다</h1>
          </div>
        )}
      </div>
    </QuestionReadContainer>
  );
}
