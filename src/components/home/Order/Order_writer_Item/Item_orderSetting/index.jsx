import React, { useEffect, useState } from 'react';
import { Public_order_container } from '../style';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import { AiOutlineClose } from 'react-icons/ai';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export const Item_orderSetting = ({ valueName, index }) => {
  // react hooks form
  const { watch, setValue, register, reset } = useFormContext();
  const [text, setText] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '') {
        toast.error('빈값입니다');
        setText('');
        return;
      }
      if (watch(`${valueName}_${index}`)?.includes(text)) {
        toast.error('이미 존재하는 값입니다');
        setText('');
      } else {
        setValue(
          `${valueName}_${index}`,
          watch(`${valueName}_${index}`) ? [...watch(`${valueName}_${index}`), text] : [text]
        );
        setValue(`list_${text}`, text);
        setText('');
      }
    }
  };

  const onChangeImage = (e, text) => {
    e.preventDefault();
    const image = e.target.files[0];
    setValue(`image_${text}`, image);
    if (typeof image !== 'string' > 0) {
      if (image.size > 10485760) {
        setValue(`image_${text}`, '');
        toast.error('이미지 사이즈가 10mb보다 큽니다');
      } else {
        setValue(`image_preview_${text}`, URL.createObjectURL(image));
      }
    }
  };
  const deleteCategory = async (text) => {
    if (typeof watch(`public_id_${text}`) === 'string') {
      setValue(
        'delete_images',
        watch(`delete_images`)
          ? [...watch(`delete_images`), watch(`public_id_${text}`)]
          : [watch(`public_id_${text}`)]
      );
    }

    setValue(
      `${valueName}_${index}`,
      watch(`${valueName}_${index}`).filter((item) => item != text)
    );
  };
  return (
    <Public_order_container className="orderSetting_container">
      <div className="category_box">
        <input
          className="C_basic_input"
          type="text"
          name="title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="포함 태그를 입력하세요"
          onKeyDown={handleKeyDown}
        />
        <ul className="category_tag_list">
          {watch(`${valueName}_${index}`) &&
            watch(`${valueName}_${index}`).map((text) => (
              <li key={text} className="tag_btn">
                <div className="tag_content">
                  <span>{watch(`list_${text}`)}</span>
                  <div className="icon_box">
                    <label htmlFor={`file_${text}`}>
                      <FileUploadIcon className="icon" />
                    </label>
                    <input
                      id={`file_${text}`}
                      className="upload_input"
                      type="file"
                      accept="image/*"
                      name="file"
                      required
                      onChange={(e) => onChangeImage(e, text)}
                    />
                    <AiOutlineClose
                      className="icon"
                      onClick={() => deleteCategory(watch(`list_${text}`))}
                    />
                  </div>
                </div>
                {watch(`image_preview_${text}`) ? (
                  <img src={watch(`image_preview_${text}`)} alt="preview" />
                ) : (
                  <img src="https://placehold.co/150x150" alt="mainImage" />
                )}

                <div className="description">
                  <h3>설명</h3>
                  <textarea
                    type="text"
                    className=" tag_textarea"
                    {...register(`description_${text}`)}
                  />
                </div>
                <div className="add_price">
                  <h3>추가금액</h3>
                  <input
                    type="number"
                    placeholder="ex) 3000,4000 숫자만"
                    {...register(`add_price_${text}`)}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Public_order_container>
  );
};
