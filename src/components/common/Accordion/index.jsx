'use client';
import React, { useState } from 'react';
import { Accordion_container } from './style';

export const Accordion = ({ children, contents }) => {
  const [state, setState] = useState(false);
  return (
    <Accordion_container>
      <div className={state ? 'main active' : 'main'} onClick={() => setState((prev) => !prev)}>
        {children}
      </div>
      <div
        className={state ? 'content active' : 'content'}
        dangerouslySetInnerHTML={{ __html: contents }}
      ></div>
    </Accordion_container>
  );
};
