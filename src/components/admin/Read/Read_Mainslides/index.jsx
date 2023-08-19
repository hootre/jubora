import React, { useState } from 'react';
import { Read_Mainslides_container } from './style';
import { Main_Slides } from 'components/Main/Main_Slides';

export const Read_Mainslides = () => {
  return (
    <Read_Mainslides_container className="container">
      <Main_Slides />
    </Read_Mainslides_container>
  );
};
