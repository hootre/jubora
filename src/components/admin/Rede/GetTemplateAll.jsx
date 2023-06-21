'use client';
import { useTemplates } from 'hooks/templates/useTemplates';
import React, { useState } from 'react';
import Update from '../Update';

export const GetTemplateAll = () => {
  const { useGetTemplates, useDeleteTemplate } = useTemplates();
  const { data } = useGetTemplates();
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      <ul>
        {data &&
          data.map((item) => {
            return (
              <li style={{ display: 'flex', padding: '10px' }} key={item.id}>
                {isUpdate ? (
                  <Update hasFormData={item} isUpdate={isUpdate} setIsUpdate={setIsUpdate}>
                    {item.title}
                  </Update>
                ) : (
                  <h1>{item.title}</h1>
                )}
                <button onClick={() => useDeleteTemplate(item)}>삭제</button>
              </li>
            );
          })}
      </ul>
    </>
  );
};
