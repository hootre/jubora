'use client';

import React, { useState } from 'react';
import { Showcase } from 'components/Templates/Showcase';
import { Read_Template_container } from './style';

export const Read_Template = () => {
  return (
    <Read_Template_container className="container">
      <Showcase category={'banner'} />
    </Read_Template_container>
  );
};
