'use client';

import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';

import { toast } from 'react-hot-toast';
import SearchInputContainer from './style';

export default function SearchInput() {
  const [text, setText] = useState('');
  // zustand
  const { setTemplateSearchText, setToggleTemplateTagList } = useTemplatesActions();

  // input 관련
  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      if (text.trim() === '') {
        toast.error('빈값입니다');
        setText('');
        return;
      }
      setTemplateSearchText(text);
      setToggleTemplateTagList(text);
      setText('');
    }
  };
  const handleSubmit = () => {
    if (text.trim() === '') {
      toast.error('빈값입니다');
      setText('');
      return;
    }
    setTemplateSearchText(text);
    setToggleTemplateTagList(text);
    setText('');
  };

  // input state
  const handleSearchInput = (e) => {
    setText(e.target.value);
  };
  return (
    <SearchInputContainer>
      <div className="search_input">
        <GoSearch className="icon" />
        <input
          type="text"
          placeholder="검색"
          value={text}
          onKeyDown={handleKeyDownEnter}
          onChange={handleSearchInput}
        />
        <button type="button" className="submit" onClick={handleSubmit}>
          검색
        </button>
      </div>
    </SearchInputContainer>
  );
}
