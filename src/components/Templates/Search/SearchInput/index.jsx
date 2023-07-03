'use client';
import React from 'react';
import { GoSearch } from 'react-icons/go';
import { useTemplatesActions } from 'store';
import './SearchInput.scss';
import { useState } from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-hot-toast';
export const SearchInput = () => {
  const [text, setText] = useState('');
  const { setTemplateSearchText, setAddTemplateTagList } = useTemplatesActions();

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
    }
  };
  const handleSubmit = () => {
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
  };

  // input state
  const handleSearchInput = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="search_input_box">
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
    </div>
  );
};
