import React from 'react';
import { TextDropdown_container } from './style';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';
export const TextDropdown = ({ title, dropdownText }) => {
  return (
    <TextDropdown_container>
      <div className="dropdown_box">
        <div className="title">
          <span>{title}</span>
          <BiChevronDown />
        </div>
        <div className="dropdownText_box">
          {dropdownText.map((item, idx) => (
            <div key={idx}>
              <Link href={item.href}>{item.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </TextDropdown_container>
  );
};
