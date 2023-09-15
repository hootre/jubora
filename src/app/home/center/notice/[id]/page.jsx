import { Notice_detail } from 'components/home/Center/Notice/Notice_detail';
import React from 'react';

const page = ({ params: { id } }) => {
  return <Notice_detail id={id} />;
};
export default page;
