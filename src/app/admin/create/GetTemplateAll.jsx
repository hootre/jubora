'use client';
import { Templates } from 'hooks/templates/useTemplates';
import React from 'react';

export const GetTemplateAll = async () => {
  const { useGetTemplates } = Templates();
  const { data } = await useGetTemplates();
  return (
    <>
      <ul>{data && data.map((item, idx) => <li key={idx}>{item.category_table}</li>)}</ul>
    </>
  );
};
