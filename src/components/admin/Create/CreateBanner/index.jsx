'use client';
import React, { memo, useState } from 'react';
import { Create_container } from './styles';
import { useProductsCategory, useProductsTag } from 'hooks/supabase/public/useProductsCategory';
import { useTemplates } from 'hooks/supabase/templates/useTemplates';
import { useOrderSetting } from 'hooks/supabase/order/orderSetting/useOrderSetting';

const CreateBanner = () => {
  // 제품 카테고리 목록
  const { useGetProductsTag } = useProductsTag();
  const { data: categoryList, isLoading: prodctsTag_loading } = useGetProductsTag();

  // 제품 목록 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();

  // from_btn 목록
  const { useGetWantOrderSetting } = useOrderSetting();
  const { data: fromBtnList, isLoading: from_btn_loading } = useGetWantOrderSetting([
    'id',
    'category_name',
  ]);

  // form data
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img_row' || name === 'img_col' || name === 'img_square') {
      setFormData((formData) => ({ ...formData, [name]: files[0] }));
      return;
    }
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const deleteData = (name) => {
    setFormData((formData) => ({ ...formData, [name]: '' }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    handleCreateBanner(formData, {
      onSuccess: () => {
        setFormData({});
        setIsUploading(false);
      },
    });
  };
  if (prodctsTag_loading || from_btn_loading) {
    return <h1>Loading</h1>;
  }
  console.log(fromBtnList);
  return (
    <Create_container className="">
      <form className="" onSubmit={handleSubmit}>
        <h2 className="title">현수막 제품 등록</h2>
        <div className="option_container file_box">
          <h2>가로형(기본)</h2>
          <div>
            <label htmlFor="img_row" className="from_item_btn">
              첨부파일 등록
            </label>
            <input
              id="img_row"
              className="file_input"
              type="file"
              accept="image/*"
              name="img_row"
              required
              onChange={handleChange}
            />
            {formData?.img_row?.name && (
              <div className="file_text">
                <span className="file_name">{formData?.img_row?.name}</span>
                <div className="delete_btn" onClick={() => deleteData('img_row')}>
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>세로형</h2>
          <div>
            <label htmlFor="img_col" className="from_item_btn">
              첨부파일 등록
            </label>
            <input
              id="img_col"
              className="file_input"
              type="file"
              accept="image/*"
              name="img_col"
              required
              onChange={handleChange}
            />
            {formData?.img_col?.name && (
              <div className="file_text">
                <span className="file_name">{formData?.img_col?.name}</span>
                <div className="delete_btn" onClick={() => deleteData('img_col')}>
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>포스터형</h2>
          <div>
            <label htmlFor="img_square" className="from_item_btn">
              첨부파일 등록
            </label>
            <input
              id="img_square"
              className="file_input"
              type="file"
              accept="image/*"
              name="img_square"
              required
              onChange={handleChange}
            />
            {formData?.img_square?.name && (
              <div className="file_text">
                <span className="file_name">{formData?.img_square?.name}</span>
                <div className="delete_btn" onClick={() => deleteData('img_square')}>
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>제목</h2>
          <div>
            <input
              className="basic_input"
              type="text"
              name="title"
              value={formData.title ?? ''}
              placeholder="제품명"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="option_container file_box">
          <h2>카테고리</h2>
          <div className="basic_flex">
            <select
              className="basic_input"
              name="category"
              required
              onChange={handleChange}
              value={formData.category ?? '선택'}
            >
              <option disabled value="선택">
                선택
              </option>
              <option value="banner">현수막</option>
              <option value="print">인쇄물</option>
              <option value="real">실사</option>
            </select>{' '}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>분류 기준</h2>
          <div className="basic_flex">
            <select
              className="basic_input"
              name="from_btn"
              required
              onChange={handleChange}
              value={formData.from_btn ?? '선택'}
            >
              <option disabled value="선택">
                선택
              </option>
              {fromBtnList
                .sort((a, b) => b.id - a.id)
                .map((item) => (
                  <option key={item.id} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))}
            </select>{' '}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>태그</h2>
          <div className="basic_flex">
            <select
              className="basic_input"
              name="tag"
              required
              onChange={handleChange}
              value={formData.tag ?? '대분류'}
            >
              <option disabled value="대분류">
                대분류
              </option>
              {categoryList.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>{' '}
            <select
              className="basic_input"
              name="tag_detail"
              required
              onChange={handleChange}
              value={formData.tag_detail ?? '소분류'}
            >
              <option disabled value="소분류">
                소분류
              </option>
              {categoryList
                .filter((item) => item.title === (formData.tag ?? categoryList[0].title))[0]
                .category_list.list.map((listItem, idx) => (
                  <option key={idx} value={listItem}>
                    {listItem}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="basic_flex">
          <button className="basic_button" disabled={isUploading}>
            {isUploading ? '업로드중...' : '제품 등록하기'}
          </button>
        </div>
      </form>
    </Create_container>
  );
};

export default memo(CreateBanner);
