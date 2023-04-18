import toast from 'react-hot-toast';
import { Slide } from 'components/Main/Slide';
import { Notice } from 'components/Main/Notice';
import { noticeList, slides } from 'assets/data';
import { MainBox } from './styles';
import { TemplatesContents } from 'components/Main/TemplatesContents';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { authState, isLoggedInState } from 'states';
import { onUserStateChange } from 'api/firebase';

export default function Home() {
  const setAuth = useSetRecoilState(authState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  useEffect(() => {
    onUserStateChange((authUser) => {
      if (authUser) {
        setAuth(authUser);
        setIsLoggedIn(true);
      }
      console.log(authUser);
    });
  }, []);
  return (
    <MainBox>
      <Slide slides={slides} />
      <div className="mainShowcase">
        <TemplatesContents />
      </div>
      <Notice noticeList={noticeList} />
    </MainBox>
  );
}
