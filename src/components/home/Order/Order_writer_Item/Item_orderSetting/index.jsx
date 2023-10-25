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
  useEffect(() => {
    setValue(`${valueName}_${index}`, []);
  }, []);
  const [text, setText] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '') {
        toast.error('빈값입니다');
        setText('');
        return;
      }
      const id = v4();
      setValue(`${valueName}_${index}`, [...watch(`${valueName}_${index}`), id]);
      setValue(`list_${id}`, text);
      setText('');
    }
  };

  const [imagePreview, setImagePreview] = useState('');
  const onChangeImage = (e, id) => {
    e.preventDefault();
    const image = e.target.files[0];
    setValue(`image_${id}`, image);
    if (typeof image !== 'string' > 0) {
      if (image.size > 10485760) {
        setValue(`image_${id}`, '');
        toast.error('이미지 사이즈가 10mb보다 큽니다');
      } else {
        setValue(`image_preview_${id}`, URL.createObjectURL(image));
      }
    }
  };
  const deleteCategory = (id) => {
    setValue(
      `${valueName}_${index}`,
      watch(`${valueName}_${index}`).filter((item) => item != id)
    );
  };

  const deleteData = (name) => {
    setValue(name, '');
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
            watch(`${valueName}_${index}`).map((id) => (
              <li key={id} className="tag_btn">
                <div className="tag_content">
                  <span>{watch(`list_${id}`)}</span>
                  <div className="icon_box">
                    <label htmlFor={`file_${id}`}>
                      <FileUploadIcon className="icon" />
                    </label>
                    <input
                      id={`file_${id}`}
                      className="upload_input"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) => onChangeImage(e, id)}
                    />
                    <AiOutlineClose className="icon" onClick={() => deleteCategory(id)} />
                  </div>
                </div>
                {watch(`image_preview_${id}`) ? (
                  <img src={watch(`image_preview_${id}`)} alt="preview" />
                ) : (
                  <img src="https://placehold.co/150x150" alt="mainImage" />
                )}
                {watch(`image_${id}`)?.[0]?.name && (
                  <div className="file_text">
                    <span className="file_name">{watch(`image_${id}`)[0].name}</span>
                    <div className="delete_btn" onClick={() => deleteData(`image_${id}`)}>
                      삭제
                    </div>
                  </div>
                )}
                <div className="description">
                  <h3>설명</h3>
                  <textarea
                    type="text"
                    className=" tag_textarea"
                    {...register(`description_${id}`)}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Public_order_container>
  );
};
