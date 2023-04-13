import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { firebaseAppAuth, providers } from 'api/firebase';
import { Slide } from 'components/Main/Slide';
import { Showcase } from 'components/Templates/Showcase';
import { Notice } from 'components/Main/Notice';
import { noticeList, showCaseList, slides } from 'assets/data';
import { MainBox } from './styles';
import { TemplatesContents } from 'components/Main/TemplatesContents';

export default function Home({ signInWithGoogle, signInWithGithub, signOut, user }) {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    if (typeof user !== 'undefined') {
      setUserId(user?.uid);
    }
  }, [user]);
  return (
    <MainBox>
      <Slide slides={slides} />
      <div className="mainShowcase">
        <TemplatesContents />
      </div>
      <Notice noticeList={noticeList} />
      {/* <Dashboard user={user} userId={userId} /> */}

      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>
    </MainBox>
  );
}
