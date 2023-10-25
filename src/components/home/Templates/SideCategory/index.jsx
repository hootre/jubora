'use client';
import React from 'react';
import { useTemplatesActions } from 'store';
import { useTemplateTagList } from 'store';
import { SideCategory_container } from './style';
import { useTemplatesTag } from 'hooks/supabase/templatesTag/useTemplatesTag';
import { MainLoading } from 'components/Loading/MainLoading';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname } from 'next/navigation';
export const SideCategory = () => {
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
  console.log(pathname);
  if (tagLoading) {
    return <MainLoading />;
  }
  return (
    <SideCategory_container>
      {tag
        ?.filter((item) => item.from_nav === pathname)
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
                  {item.tagList.list.map((item) => {
                    return (
                      <li
                        key={item}
                        className={`${
                          TagList.includes(item) ? 'category_btn active' : 'category_btn'
                        }`}
                        onClick={() => handleCategory(item)}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </SideCategory_container>
  );
};
