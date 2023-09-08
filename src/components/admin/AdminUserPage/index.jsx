import React from 'react';
import { AdminUserPage_container } from './styles';
import { useUser } from 'hooks/supabase/auth/useUser';
import { RiSearchLine, RiLoopRightFill } from 'react-icons/ri';
import { SimpleDate } from 'utils/SimpleDate';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export const AdminUserPage = memo(({ data, handleDelete }) => {
  //유저 데이터
  const [userData, setUserData] = useState(data);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  // 유저 삭제
  const deleteUser = () => {
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
        { label: '취소' },
      ],
    });
  };
  // user check 관리
  const [selectState, setSelectState] = useState('email');
  const handleChange = (event) => {
    setSelectState(event.target.value);
  };
  const [checkedList, setCheckedLists] = useState([]);

  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];

        data.forEach((user) => checkedListArray.push(user.id));

        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [data]
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

  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, getValues, register } = methods;

  // 검색창 비어있을경우 리스트 리셋
  const handleKeyDownEnter = (e) => {
    if (e.key === 'Backspace' && getValues('searchText') === '') setUserData(data);
  };
  // 검색 Submit
  const onSubmit = (formData) => {
    console.log(formData);
    if (formData.searchText === '') setUserData(data);
    setUserData(data.filter((user) => user[selectState].includes(formData.searchText)));
  };
  if (!userData) {
    return;
  }
  return (
    <AdminUserPage_container>
      <div className="top_box">
        <div className="button_box">
          <button
            className="C_basic_button"
            onClick={() => (checkedList.length > 0 ? deleteUser() : null)}
          >
            선택 삭제
          </button>
        </div>
        <div className="title">
          <h1>사용자 관리</h1>
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectState}
            onChange={handleChange}
          >
            <MenuItem value="email">이메일</MenuItem>
            <MenuItem value="role">권한</MenuItem>
            <MenuItem value="name">이름/업체명</MenuItem>
            <MenuItem value="phone">전화번호</MenuItem>
            <MenuItem value="address">주소</MenuItem>
          </Select>
        </FormControl>

        <form onSubmit={handleSubmit(onSubmit)} className="search_box">
          <input
            type="text"
            className="search_term"
            placeholder="검색 내용"
            onKeyDown={handleKeyDownEnter}
            {...register('searchText')}
          />
          <button type="submit" className="search_button">
            <RiSearchLine />
          </button>
        </form>
      </div>
      <div className="grid-table">
        <div className="grid-table-row">
          <div className="grid-table-cell">
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === userData.length
                  ? true
                  : false
              }
            />
          </div>
          <div className="grid-table-cell">이메일</div>
          <div className="grid-table-cell">권한</div>
          <div className="grid-table-cell">이름/업체명</div>
          <div className="grid-table-cell">전화번호</div>
          <div className="grid-table-cell">주소</div>
          <div className="grid-table-cell">최종접속일</div>
          <div className="grid-table-cell">생성일</div>
        </div>
        {userData?.map((item) => (
          <div className="grid-table-row" key={item.id}>
            <div className="grid-table-cell" data-title="Title">
              <input
                type="checkbox"
                onChange={(e) => onCheckedElement(e.target.checked, item.id)}
                checked={checkedList.includes(item.id) ? true : false}
              />
            </div>
            <div className="grid-table-cell" data-title="Number">
              {item.email}
            </div>

            <div className="grid-table-cell" data-title="Number">
              {item.role}
            </div>
            <div className="grid-table-cell" data-title="Series">
              {item.name}
            </div>
            <div className="grid-table-cell" data-title="Air Date">
              {item.phone}
            </div>
            <div className="grid-table-cell" data-title="Number">
              {`${item.address_1} ${item.address_2}`}
            </div>
            <div className="grid-table-cell" data-title="Series">
              {SimpleDate(item.updated_at, 'y')}
            </div>
            <div className="grid-table-cell" data-title="Air Date">
              {SimpleDate(item.created_at, 'y')}
            </div>
          </div>
        ))}
      </div>
    </AdminUserPage_container>
  );
});
