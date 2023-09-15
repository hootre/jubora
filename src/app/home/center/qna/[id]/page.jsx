import { QnA_detail } from 'components/home/Center/QnA/QnA_detail';
import React from 'react';

const page = ({ params: { id } }) => {
  return <QnA_detail id={id} />;
};
export default page;
