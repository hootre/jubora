'use client';
import React, { memo, useState } from 'react';
import { useTemplates } from 'hooks/templates/useTemplates';

const Create = () => {
  const [formData, setFormData] = useState({ category: 'banner_row', type: 'square' });
  const [isUploading, setIsUploading] = useState(false);

  const { useCreateTemplates } = useTemplates();
  const { mutate: createTemplate } = useCreateTemplates();
  const handleReset = (e) => {
    setFormData({});
    setFile();
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData((formData) => ({ ...formData, [name]: files[0] }));
      return;
    }
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    createTemplate(formData);
    setFormData({});
    setIsUploading(false);
  };
  return (
    <section className="">
      <h2 className="">새로운 제품 등록</h2>
      {/* {product.file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(product.file)}
          alt="local file"
        />
      )} */}
      <form className="" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input
          type="text"
          name="title"
          value={formData.title ?? ''}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange} value={formData.category ?? 'banner_row'}>
          <option value="banner_row">현수막</option>
          <option value="banner_col">배너</option>
          <option value="poster">스티커/포스터</option>
          <option value="flag">어깨띠/깃발</option>
          <option value="church_item">교회용품</option>
          <option value="business_card">명함</option>
        </select>
        <select name="type" onChange={handleChange} value={formData.type ?? 'square'}>
          <option value="square">정사각형</option>
          <option value="row">가로형</option>
          <option value="col">세로형</option>
        </select>
        <input
          type="text"
          name="tag"
          value={formData.tag ?? ''}
          placeholder="태그 (절기, 부활절)"
          required
          onChange={handleChange}
        />
        <button disabled={isUploading}>{isUploading ? '업로드중...' : '제품 등록하기'}</button>
        <button disabled={isUploading} onClick={handleReset}>
          초기화
        </button>
      </form>
    </section>
  );
};

export default memo(Create);
