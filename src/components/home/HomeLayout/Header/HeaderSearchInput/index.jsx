'use client';
import React from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';
import { useState } from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Search_input_box } from './style.jsx';
export const HeaderSearchInput = () => {
  const [text, setText] = useState('');
  const { setTemplateSearchText, setTemplateTagList } = useTemplatesActions();
  const router = useRouter();
  // input 관련
  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '') {
        toast.error('빈값입니다');
        setText('');
        return;
      }
      setTemplateSearchText(text);
      setTemplateTagList(text);
      setText('');
      router.push('/home/templates/banner');
    }
  };

  // input state
  const handleSearchInput = (e) => {
    setText(e.target.value);
  };
  return (
    <Search_input_box>
      <input
        type="text"
        placeholder="상품 검색"
        value={text}
        onKeyDown={handleKeyDownEnter}
        onChange={handleSearchInput}
      />
      <GoSearch className="icon" />
    </Search_input_box>
  );
};
