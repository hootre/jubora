'use client';
import * as React from 'react';
import { Question_Read_container } from './styles';
import { useState } from 'react';
import { useCallback } from 'react';
import Link from 'next/link';
import { useUser } from 'hooks/supabase/auth/useUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useQuestion } from 'hooks/supabase/question/useQuestion';
import { BiChevronDown } from 'react-icons/bi';
import { Accordion } from 'components/common/Accordion';
const Question_Read = () => {
  // user상태관리
  const { useGetUserInfo } = useUser();
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
            console.log(checkedList);
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
    return <h1>Loading</h1>;
  }
  return (
    <Question_Read_container>
      <div className="top_box">
        {user.role === 'admin' ? (
          <span>
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === questionData.length
                  ? true
                  : false
              }
            />
          </span>
        ) : (
          <></>
        )}
        {user.role === 'admin' ? (
          <div className="btn_box">
            <div className="C_basic_button">
              <Link href="/admin/board/write">글쓰기</Link>
            </div>
            <div
              className="C_basic_button delete_btn"
              onClick={() => (checkedList.length > 0 ? deleteQuestion() : null)}
            >
              선택 삭제
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {questionData
          .sort((a, b) => b.id - a.id)
          ?.map((item) => (
            <Accordion contents={item.contents} key={item.id}>
              <div className="board_item" key={item.id}>
                <div>
                  {user.role === 'admin' ? (
                    <span>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          onCheckedElement(e.target.checked, { id: item.id, images: item.images })
                        }
                        checked={
                          checkedList.filter((el) => el.id === item.id).length ? true : false
                        }
                      />
                    </span>
                  ) : (
                    <></>
                  )}

                  <span className="state">[{item.type}]</span>
                  <span className="title">{item.title}</span>
                </div>
                <div className="icon">
                  <BiChevronDown />
                </div>
              </div>
            </Accordion>
          ))}
      </div>
    </Question_Read_container>
  );
};
export default Question_Read;
