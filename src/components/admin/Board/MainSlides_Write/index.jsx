'use client';
import { MainSlides_Wrtie_container } from './styles';
import { useMainSlides } from 'hooks/supabase/main/slides/useMainSlides';
import { Read_Mainslides } from 'components/admin/Read/Read_Mainslides';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getByteSize } from 'utils/getByteSize';

export const MainSlides_Wrtie = () => {
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
        setFormData((formData) => ({ ...formData, [name]: files[0] }));
        return;
      }
    }
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  const deleteData = (name) => {
    setFormData((formData) => ({ ...formData, [name]: '' }));
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
    <MainSlides_Wrtie_container>
      <form className="" onSubmit={handleSubmit}>
        <h2 className="title">메인 슬라이드 등록</h2>
        <div className="option_container file_box">
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
                <div className="delete_btn" onClick={() => deleteData('img')}>
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="option_container file_box">
          <h2>제목</h2>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="title_1"
              value={formData.title_1 ?? ''}
              placeholder="첫번째줄"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="title_2"
              value={formData.title_2 ?? ''}
              placeholder="두번째줄"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="option_container file_box">
          <h2>내용</h2>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="content_1"
              value={formData.content_1 ?? ''}
              placeholder="첫번째줄"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <input
              className="C_basic_input"
              type="text"
              name="content_2"
              value={formData.content_2 ?? ''}
              placeholder="두번째줄"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="option_container file_box">
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
          <button className="C_basic_button" disabled={isUploading}>
            {isUploading ? '업로드중...' : '제품 등록하기'}
          </button>
        </div>
      </form>
      <h2>메인 슬라이드</h2>
      <Read_Mainslides />
    </MainSlides_Wrtie_container>
  );
};
