import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import PublicOrderContainer from '../style';

export default function ItemCategory({ title, valueName, placeholder = '' }) {
  // react hooks form
  const { watch, setValue } = useFormContext();
  useEffect(() => {
    setValue(valueName, placeholder);
  }, []);
  const [text, setText] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '') {
        toast.error('빈값입니다');
        setText('');
        return;
      }
      setValue(valueName, [...watch(valueName), text]);
      setText('');
    }
  };
  const deleteCategory = (data) => {
    setValue(
      valueName,
      watch(valueName).filter((item) => item !== data)
    );
  };
  return (
    <PublicOrderContainer className="categoryContainer">
      <h2>{title}</h2>
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
          {watch(valueName) &&
            watch(valueName).map((item) => (
              <li key={item} className="tag_btn">
                {item}
                <AiOutlineClose className="icon" onClick={() => deleteCategory(item)} />
              </li>
            ))}
        </ul>
      </div>
    </PublicOrderContainer>
  );
}
