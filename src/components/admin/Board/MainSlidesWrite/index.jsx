'use client';

import useMainSlides from 'hooks/supabase/main/slides/useMainSlides';
import ReadMainslides from 'components/admin/Read/ReadMainslides';
import { useState } from 'react';
import toast from 'react-hot-toast';
import getByteSize from 'utils/getByteSize';
import MainSlidesWrtieContainer from './styles';

export default function MainSlidesWrtie() {
  // 메인 슬라이드
  const { useCreateMainSlides } = useMainSlides();
  const { mutate: CreateMainSlide } = useCreateMainSlides();
  // form data
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      if (files[0].size > 10485760) {
        setFormData('');
        toast.error('이미지 사이즈가 10mb보다 큽니다');
      } else {
        setFormData((data) => ({ ...data, [name]: files[0] }));
        return;
      }
    }
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const deleteData = (name) => {
    setFormData((data) => ({ ...data, [name]: '' }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    CreateMainSlide(formData, {
      onSuccess: () => {
        setFormData({});
        setIsUploading(false);
      },
    });
  };
  return (
    <MainSlidesWrtieContainer>
      <form className="" onSubmit={handleSubmit}>
        <h2 className="title">메인 슬라이드 등록</h2>
        <div className="optionContainer file_box">
          <h2>메인 이미지</h2>
          <div>
            <div className="input_box">
              <label htmlFor="img" className="from_item_btn">
                첨부파일 등록
              </label>
              <span className="confirm_text">최대 이미지 크기는 10mb입니다</span>
            </div>
            <input
              id="img"
              className="file_input"
              type="file"
              accept="image/*"
              name="img"
              required
              onChange={handleChange}
            />
            {formData?.img?.name && (
              <div className="file_text">
                <span className="file_name">{formData?.img?.name}</span>
                <span className="file_size">{getByteSize(formData?.img?.size)}</span>
                <button type="button" className="delete_btn" onClick={() => deleteData('img')}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="optionContainer file_box">
          <h2>제목</h2>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="title1"
              value={formData.title1 ?? ''}
              placeholder="첫번째줄"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="title2"
              value={formData.title2 ?? ''}
              placeholder="두번째줄"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="optionContainer file_box">
          <h2>내용</h2>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="content1"
              value={formData.content1 ?? ''}
              placeholder="첫번째줄"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="content2"
              value={formData.content2 ?? ''}
              placeholder="두번째줄"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="optionContainer file_box">
          <h2>소제목</h2>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="subtitle"
              value={formData.subtitle ?? ''}
              placeholder="내용"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="C_basic_flex">
          <button type="button" className="C_basic_button" disabled={isUploading}>
            {isUploading ? '업로드중...' : '제품 등록하기'}
          </button>
        </div>
      </form>
      <h2>메인 슬라이드</h2>
      <ReadMainslides />
    </MainSlidesWrtieContainer>
  );
}
