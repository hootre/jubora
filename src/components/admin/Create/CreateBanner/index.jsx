'use client';
import React, { memo, useState } from 'react';
import { Create_container } from './styles';
import { useProductsCategory } from 'hooks/supabase/public/useProductsCategory';
import { useTemplates } from 'hooks/supabase/templates/useTemplates';

const CreateBanner = () => {
  // 제품 카테고리 목록
  const { useGetProductsCategory } = useProductsCategory();
  const { data: categoryList, isLoading } = useGetProductsCategory();

  // 배너 생성
  const { useCreateTemplate } = useTemplates();
  const { mutate: handleCreateBanner } = useCreateTemplate();

  // form data
  const [formData, setFormData] = useState({ category: 'banner' });
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
  if (!categoryList) {
    return <h1>Loading</h1>;
  }
  return (
    <Create_container className="">
      <h2 className="">새로운 제품 등록</h2>
      {/* {product.file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(product.file)}
          alt="local file"
        />
      )} */}
      <form className="" onSubmit={handleSubmit}>
        <div className="option_container file_box">
          <h2>가로형</h2>
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
          <h2>태그</h2>
          <div className="basic_flex">
            <select
              className="basic_input"
              name="tag"
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
