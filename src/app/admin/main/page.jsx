'use client';

import { Slide } from 'components/Main/Main_Slides';
import Create_Mainslides from 'components/admin/Create/Create_Mainslides';
import { Read_Mainslides } from 'components/admin/Read/Read_Mainslides';

export default function main() {
  return (
    <div>
      <Create_Mainslides />
      <Read_Mainslides />
    </div>
  );
}
