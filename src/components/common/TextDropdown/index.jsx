import React from 'react';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
import TextDropdownContainer from './style';

export default function TextDropdown({ title, dropdownText }) {
  return (
    <TextDropdownContainer>
      <div className="dropdown_box">
        <div className="title">
          <span>{title}</span>
          <BiChevronDown />
        </div>
        <div className="dropdownText_box">
          {dropdownText.map((item) => (
            <div key={item}>
              <Link href={item.href}>{item.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </TextDropdownContainer>
  );
}
