'use client';

import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SearchInputContainer from './style';

function HeaderSearchInput() {
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
    <SearchInputContainer>
      <input
        type="text"
        placeholder="상품 검색"
        value={text}
        onKeyDown={handleKeyDownEnter}
        onChange={handleSearchInput}
      />
      <GoSearch className="icon" />
    </SearchInputContainer>
  );
}
export default HeaderSearchInput;
