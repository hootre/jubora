'use client';

import React, { useState } from 'react';
import { Showcase } from 'components/home/Templates/Showcase';
import { Read_Template_container } from './style';

export const Read_Template = () => {
  return (
    <Read_Template_container className="C_container">
      <Showcase category={'banner'} />
    </Read_Template_container>
  );
};
