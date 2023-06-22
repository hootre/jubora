import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import './Option.scss';
export const Option = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <li className="option_container">
      <h2>재질원단</h2>
      <div className="option_box">
        <div className={isOpen ? 'open option_title' : 'option_title'} onClick={toggleIsOpen}>
          <span>현수막천</span>
          <AiFillCaretDown className="icon" />
          <div className="open_content">
            <ul>
              <li>
                <div className="img">
                  <img
                    src="https://img1.bizhows.com/bhfile01/__CM_FILE_DATA/202009/10/16/1791835_1599721873428.png"
                    alt=""
                  />
                </div>
                <span>현수막천</span>
              </li>
              <li>
                <img
                  src="https://img1.bizhows.com/bhfile01/__CM_FILE_DATA/202009/10/16/1791835_1599721873428.png"
                  alt=""
                />
                <span>현수막천</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};
