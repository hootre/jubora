'use client';

import React from 'react';
import { useTemplatesActions, useTemplateTagList } from 'store';

import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import MainLoading from 'components/Loading/MainLoading';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname } from 'next/navigation';
import SideCategoryContainer from './style';

export default function SideCategory() {
  // useTemplatesTag 관리
  const { useGetTemplatesTag } = useTemplatesTag();
  const { data: tag, isLoading: tagLoading } = useGetTemplatesTag();
  // zustand
  const { setToggleTemplateTagList } = useTemplatesActions();
  const TagList = useTemplateTagList();
  const handleCategory = (data) => {
    setToggleTemplateTagList(data);
  };
  // path 관련
  const pathname = usePathname().substring(1).split('/')[2];
  if (tagLoading) {
    return <MainLoading />;
  }
  return (
    <SideCategoryContainer>
      {tag
        ?.filter((item) => item.fromNav === pathname)
        .map((item) => (
          <div key={item.id} className="category_box">
            <Accordion className="accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <h2 className="category_title">{item.title}</h2>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {item.tagList.list.map((item2) => (
                    <li
                      role="presentation"
                      key={item2}
                      className={`${
                        TagList.includes(item2) ? 'category_btn active' : 'category_btn'
                      }`}
                      onClick={() => handleCategory(item2)}
                    >
                      {item2}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </SideCategoryContainer>
  );
}
