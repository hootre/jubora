'use client';
import React from 'react';
import { MainLoading_container } from './style.jsx';

import { PulseLoader } from 'react-spinners';
export const MainLoading = () => {
  return (
    <MainLoading_container>
      <PulseLoader color="#36d7b7" className="Loaidng" />
    </MainLoading_container>
  );
};
