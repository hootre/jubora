import React from 'react';
import { DashboardFrame_container } from './style';

export const DashboardFrame = ({ children, title, flexSize }) => {
  return (
    <DashboardFrame_container flexSize={flexSize}>
      <h1 className="title">
        <span>{title}</span>
        <span className="modify">더보기</span>
      </h1>
      <main>{children}</main>
    </DashboardFrame_container>
  );
};
