'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import supabase from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
};

export const VIEWS = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);
  const { accessToken, ...rest } = props;

  //SignOut
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('로그아웃 실패');
    } else {
      toast.success('로그 아웃');
    }
  }
  // SignIn
  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          toast.error('로그인정보가 올바르지 않습니다.');
          break;
        default:
          break;
      }
    } else {
      toast.success('로그인 성공하였습니다!');
    }
  }
  // GoogleSignIn
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      toast.error(`GoogleLogin : ${error.message}`);
    } else {
      toast.success('Google 로그인 성공하였습니다!');
    }
  }
  // SignUp

  async function signUp(formData) {
    console.log(formData);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          phone: formData.phone,
          privacy_check: formData.check,
          address: '',
        },
      },
    });

    if (error) {
      switch (error.message) {
        case 'User already registered':
          toast.error('이미 등록된 이메일입니다.');
          break;
        default:
          break;
      }
    } else {
      toast.success('회원가입 성공하였습니다!');
    }
  }
  // 비밀번호 초기화
  async function onResetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('비밀번호 초기화 성공!');
    }
  }
  useEffect(() => {
    async function getActiveSession() {
      console.log('getAuth 실행');
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('onAuthStateChange 실행');
      //   if (currentSession?.access_token !== accessToken) {
      //     router.refresh();
      //   }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signIn,
      googleSignIn,
      signUp,
      onResetPassword,
      signOut,
    };
  }, [initial, session, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthContext안에서 사용해야 합니다.');
  }
  return context;
};
