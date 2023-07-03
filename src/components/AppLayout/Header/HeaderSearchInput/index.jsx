'use client';
import React from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';
import './HeaderSearchInput.scss';
import { useState } from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
export const HeaderSearchInput = () => {
  const [text, setText] = useState('');
  const { setTemplateSearchText, setAddTemplateTagList } = useTemplatesActions();
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
      setAddTemplateTagList({
        id: v4(),
        text: text,
      });
      setText('');
      router.push('/templates/banner_row');
    }
  };

  // input state
  const handleSearchInput = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="search">
      <GoSearch className="icon" />
      <input
        type="text"
        placeholder="상품 검색"
        value={text}
        onKeyDown={handleKeyDownEnter}
        onChange={handleSearchInput}
      />
    </div>
  );
};
