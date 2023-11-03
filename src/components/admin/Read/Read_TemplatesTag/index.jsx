import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';
import React, { useState } from 'react';
import { Read_TemplatesTag_container } from './styles';
import { Board_item } from './Board_item';

export const Read_TemplatesTag = () => {
  // 태그 관리
  const { useGetTemplatesTag, useUpdateTemplatesTag, useDeleteTemplatesTag } = useTemplatesTag();
  const { data: templatesTagData, isLoading } = useGetTemplatesTag();
  const { mutate: updateTemplatesTag } = useUpdateTemplatesTag();
  const { mutate: deleteTemplatesTag } = useDeleteTemplatesTag();
  if (isLoading) {
    return;
  }
  return (
    <Read_TemplatesTag_container>
      {templatesTagData.map((item) => (
        <Board_item
          key={item.id}
          item={item}
          updateTemplatesTag={updateTemplatesTag}
          deleteTemplatesTag={deleteTemplatesTag}
        />
      ))}
    </Read_TemplatesTag_container>
  );
};
