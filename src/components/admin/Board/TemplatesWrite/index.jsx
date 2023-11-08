'use client';

import React, { useState } from 'react';
import PublicOrderContainer from 'components/home/Order/OrderWriterItem/style';

import ReadTemplate from 'components/admin/Read/ReadTemplate';
import TemplatesWriteContainer from './styles';
import TemplatesBanner from './TemplatesBanner';
import TemplatesPrint from './TemplatesPrint';
import TemplatesReal from './TemplatesReal';

export default function TemplatesWrite() {
  const [bannerState, setbannerState] = useState('banner');
  return (
    <TemplatesWriteContainer>
      <h2 className="title">현수막 제품 등록</h2>
      <PublicOrderContainer className="contents">
        <h2>카테고리</h2>
        <div className="C_basic_flex">
          <select
            className="C_basic_input"
            name="category"
            required
            value={bannerState}
            onChange={(e) => setbannerState(e.target.value)}
          >
            <option value="banner">현수막</option>
            <option value="print">인쇄물</option>
            <option value="real">실사</option>
          </select>
        </div>
      </PublicOrderContainer>
      {bannerState === 'banner' ? (
        <TemplatesBanner bannerState={bannerState} />
      ) : bannerState === 'print' ? (
        <TemplatesPrint bannerState={bannerState} />
      ) : (
        <TemplatesReal bannerState={bannerState} />
      )}
      <ReadTemplate />
    </TemplatesWriteContainer>
  );
}
