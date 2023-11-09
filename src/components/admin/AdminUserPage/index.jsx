import React, { useState, useCallback, useEffect, memo } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert';
import simpleDate from 'utils/simpleDate';
import MainLoading from 'components/Loading/MainLoading';
import AdminUserPageContainer from './styles';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Import css
const AdminUserPage = memo(({ data, handleDelete, updateRole }) => {
  // 유저 데이터
  const [userData, setUserData] = useState(data);
  const [selectState, setSelectState] = useState('email');
  const [checkedList, setCheckedLists] = useState([]);
  // form 데이터 관리
  const methods = useForm();
  const { handleSubmit, getValues, register, watch } = methods;
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
            checkedList.map((id) => handleDelete(id));
          },
        },
        { label: '취소' },
      ],
    });
  };
  // update 목록
  const [updateId, setUpdateId] = useState([]);
  // 수정하기 State
  const [sianUpdate, setSianUpdate] = useState();
  const toggleSianUpdate = () => {
    setSianUpdate((prev) => !prev);
  };
  // 수정완료
  const onUserUpdate = () => {
    checkedList.map((id) => updateRole({ id, role: watch(`role_${id}`) }));
    toggleSianUpdate();
    setCheckedLists([]);
    setUpdateId([]);
  };
  // 수정 취소
  const updateCancle = () => {
    setSianUpdate(false);
    setCheckedLists([]);
    setUpdateId([]);
  };
  // 선택 수정
  const updateUser = () => {
    if (checkedList.length > 0) {
      setUpdateId(checkedList);
      setSianUpdate(true);
    }
  };
  // user check 관리
  const handleChange = (event) => {
    setSelectState(event.target.value);
  };

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

  // 검색창 비어있을경우 리스트 리셋
  const handleKeyDownEnter = (e) => {
    if (e.key === 'Backspace' && getValues('searchText') === '') setUserData(data);
  };
  // 검색 Submit
  const onSubmit = (formData) => {
    if (formData.searchText === '') setUserData(data);
    setUserData(data.filter((user) => user[selectState].includes(formData.searchText)));
  };
  if (!userData) {
    return <MainLoading />;
  }
  return (
    <AdminUserPageContainer>
      <div className="top_box">
        <div className="searchContainer">
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
        <div className="button_box">
          {sianUpdate ? (
            <>
              <button type="button" className="C_basic_button update_btn" onClick={onUserUpdate}>
                수정완료
              </button>
              <button type="button" className="C_basic_button update_btn" onClick={updateCancle}>
                수정취소
              </button>
            </>
          ) : (
            <button type="button" className="C_basic_button update_btn" onClick={updateUser}>
              선택 수정
            </button>
          )}

          <button
            type="button"
            className="C_basic_button delete_btn"
            onClick={() => (checkedList.length > 0 ? deleteUser() : null)}
          >
            선택 삭제
          </button>
        </div>
      </div>
      <div className="grid-table">
        <div className="grid-table-row">
          <div className="grid-table-cell">
            <input
              type="checkbox"
              onChange={(e) => onCheckedAll(e.target.checked)}
              checked={checkedList.length === 0 ? false : checkedList.length === userData.length}
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
        {userData?.map((item) => {
          if (updateId.includes(item.id)) {
            return (
              <div className="grid-table-row" key={item.id}>
                <div className="grid-table-cell" data-title="Title">
                  {item.email !== 'zxv7295@naver.com' && (
                    <input
                      type="checkbox"
                      onChange={(e) => onCheckedElement(e.target.checked, item.id)}
                      checked={!!checkedList.includes(item.id)}
                    />
                  )}
                </div>
                <div className="grid-table-cell" data-title="Number">
                  {item.email}
                </div>

                <div className="grid-table-cell" data-title="Number">
                  <FormControl sx={{ minWidth: 150 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      defaultValue={item.role}
                      {...register(`role_${item.id}`)}
                    >
                      <MenuItem value="admin">관리자</MenuItem>
                      <MenuItem value="member">회원</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="grid-table-cell" data-title="Series">
                  {item.name}
                </div>
                <div className="grid-table-cell" data-title="Air Date">
                  {item.phone}
                </div>
                <div className="grid-table-cell" data-title="Number">
                  {`${item.address1} ${item.address2}`}
                </div>
                <div className="grid-table-cell" data-title="Series">
                  {simpleDate(item.updatedAt, 'y')}
                </div>
                <div className="grid-table-cell" data-title="Air Date">
                  {simpleDate(item.createdAt, 'y')}
                </div>
              </div>
            );
          }
          return (
            <div className="grid-table-row" key={item.id}>
              <div className="grid-table-cell" data-title="Title">
                {item.email !== 'zxv7295@naver.com' && item.email !== 'mm1895@naver.com' && (
                  <input
                    type="checkbox"
                    onChange={(e) => onCheckedElement(e.target.checked, item.id)}
                    checked={!!checkedList.includes(item.id)}
                  />
                )}
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
                {`${item.address1} ${item.address2}`}
              </div>
              <div className="grid-table-cell" data-title="Series">
                {simpleDate(item.updatedAt, 'y')}
              </div>
              <div className="grid-table-cell" data-title="Air Date">
                {simpleDate(item.createdAt, 'y')}
              </div>
            </div>
          );
        })}
      </div>
    </AdminUserPageContainer>
  );
});
export default AdminUserPage;
