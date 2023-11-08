'use client';

import QnaWrite from '../Center/QnA/QnaWrite';
import WriteContaier from './styles';

export default function Write({ name }) {
  return (
    <WriteContaier className="CContainer">
      <QnaWrite name={name} />
    </WriteContaier>
  );
}
