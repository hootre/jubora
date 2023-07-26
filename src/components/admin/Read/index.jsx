'use client';

import React, { useState } from 'react';
import { Showcase } from 'components/Templates/Showcase';
import { ReadTemplateAll_container } from './style';

export const Read = () => {
  return (
    <ReadTemplateAll_container className="container">
      <Showcase category={'banner'} />
    </ReadTemplateAll_container>
  );
};
