'use client';

import React from 'react';
import { PulseLoader } from 'react-spinners';
import MainLoadingContainer from './style';

export default function MainLoading() {
  return (
    <MainLoadingContainer>
      <PulseLoader color="#36d7b7" className="Loaidng" />
    </MainLoadingContainer>
  );
}
