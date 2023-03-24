import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { firebaseAppAuth, providers } from 'lib/firebase';
import { Slide } from 'components/Main/Slide';
import { Showcase } from 'components/Main/Showcase';
import { Notice } from 'components/Main/Notice';
import { DEFAULT_SANS_SERIF_FONT } from 'next/dist/shared/lib/constants';

const slides = [
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fbanners%2F1981%2Fce5ff60a.jpg&w=1060&q=100',
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fbanners%2F1967%2F85bf6622.jpg&w=1060&q=100',
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fbanners%2F1972%2F2edb496e.jpg&w=1060&q=100',
];
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
const noticeList = [
  ['[공지]오류 및 보완 조치사항 안내', 'notice'],
  ['[공지]리소스 검색 기능 안내', 'notice'],
  ['[공지]그냥 이렇게 만들어보자', 'notice'],
  ['[이벤트]오류 및 보완 조치사항 안내', 'event'],
];
export default function Home({ signInWithGoogle, signInWithGithub, signOut, user }) {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    if (typeof user !== 'undefined') {
      setUserId(user?.uid);
    }
  }, [user]);
  return (
    <>
      <Slide slides={slides} />
      <Showcase showCaseList={showCaseList} />
      <Notice noticeList={noticeList} />
      {/* <Dashboard user={user} userId={userId} /> */}

      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>
    </>
  );
}
