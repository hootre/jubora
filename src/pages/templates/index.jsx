import { Showcase } from 'components/Main/Showcase';
import React from 'react';
import { TemplatesBox } from './styles';
const showCaseList = [
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/17/14/00/kgfdtetok83rh9rh/thumb.png?size=800',
    0,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/14/30/kjh84rueqjvhz8oe/thumb.jpg?size=800',
    1,
  ],
  [
    'https://file.miricanvas.com/template_thumb/2023/02/16/10/00/k3l8milxccowogv5/thumb.jpg?size=800',
    2,
  ],
];
const templates = () => {
  return (
    <TemplatesBox>
      <Showcase showCaseList={showCaseList} />
    </TemplatesBox>
  );
};
export default templates;
