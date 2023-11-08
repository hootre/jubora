'use client';

import React, { useState } from 'react';
import AccordionContainer from './style';

export default function Accordion({ children, contents }) {
  const [state, setState] = useState(false);
  return (
    <AccordionContainer>
      <button
        type="button"
        className={state ? 'main active' : 'main'}
        onClick={() => setState((prev) => !prev)}
      >
        {children}
      </button>
      <div
        className={state ? 'content active' : 'content'}
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </AccordionContainer>
  );
}
