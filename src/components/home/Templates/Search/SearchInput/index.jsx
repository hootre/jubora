'use client';
import React from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';
import { useState } from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { Search_input_box } from './style.jsx';
export const SearchInput = () => {
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
    <Search_input_box>
      <div className="search_input">
        <GoSearch className="icon" />
        <input
          type="text"
          placeholder="검색"
          value={text}
          onKeyDown={handleKeyDownEnter}
          onChange={handleSearchInput}
        />
        <button className="submit" onClick={handleSubmit}>
          검색
        </button>
      </div>
    </Search_input_box>
  );
};
