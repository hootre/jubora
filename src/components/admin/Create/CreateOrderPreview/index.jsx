'use client';
import React, { memo, useState } from 'react';
import { Create_container } from './styles';
import { TextField } from '@mui/material';
import { useOrderItemPreview } from 'hooks/supabase/order/orderItemPreview/useOrderItemPreview';

const CreateOrderPreview = () => {
  // 주문 상세보기 셋팅
  const { useGetOrderItemPreview, useCreateOrderItemPreview } = useOrderItemPreview();
  const { data, isLoading } = useGetOrderItemPreview();

  // 현재 상세보기 버튼 종류모음

  // form data
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'url') {
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
    useCreateOrderItemPreview(formData, {
      onSuccess: () => {
        setFormData({});
        setIsUploading(false);
      },
    });
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <Create_container className="">
      <form className="" onSubmit={handleSubmit}>
        <h2 className="title">주문 상세보기 등록</h2>
        <div className="option_container file_box">
          <h2>설정 태그</h2>
          <div className="C_basic_flex">
            <select
              className="C_basic_input"
              name="from_category"
              required
              onChange={handleChange}
              value={formData.from_category ?? '원하는 항목'}
            >
              <option disabled value="원하는 항목">
                대분류
              </option>
              {data.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>{' '}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>상세 이미지</h2>
          <div>
            <label htmlFor="url" className="from_item_btn">
              첨부파일 등록
            </label>
            <input
              id="url"
              className="file_input"
              type="file"
              accept="image/*"
              name="url"
              required
              onChange={handleChange}
            />
            {formData?.url?.name && (
              <div className="file_text">
                <span className="file_name">{formData?.url?.name}</span>
                <div className="delete_btn" onClick={() => deleteData('url')}>
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
              className="C_basic_input"
              type="text"
              name="title"
              value={formData.title ?? ''}
              placeholder="제품명"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" option_container contents">
          <h2>설명</h2>
          <TextField
            className="textarea"
            id="outlined-multiline-static"
            label="주문내용"
            multiline
            required
            rows={4}
            name="description"
            onChange={handleChange}
          />
        </div>

        <div className="C_basic_flex">
          <button className="C_basic_button" disabled={isUploading}>
            {isUploading ? '업로드중...' : '제품 등록하기'}
          </button>
        </div>
      </form>
    </Create_container>
  );
};

export default memo(CreateOrderPreview);
