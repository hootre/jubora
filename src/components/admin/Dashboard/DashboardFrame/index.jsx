import React from 'react';
import DashboardFrameContainer from './style';

export default function DashboardFrame({ children, title, flexSize }) {
  return (
    <DashboardFrameContainer flexSize={flexSize}>
      <h1 className="title">
        <span>{title}</span>
        <span className="modify">더보기</span>
      </h1>
      <main>{children}</main>
    </DashboardFrameContainer>
  );
}
