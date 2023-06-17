import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import supabase_client from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

const useIsUser = () => {
  const client = useQueryClient();
  const user = client.getQueryData(gatherKeys.current_user);
  return user ? true : false;
};

// cookie에서 jwt 가져오기
const useGetSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase_client.auth.getSession();
    return session;
  } catch (error) {
    throw console.log(`session Error : ${error.message}`);
  }
};
// session 확인하여 유저정보 출력
const useGetUserInfo = () => {
  const getUser = async () => {
    const session = await useGetSession();
    if (session) {
      let { data: profiles, error } = await supabase_client
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      if (error) {
        throw console.log(`getUser Error : ${error.message}`);
      }
      return profiles;
    } else {
      return null;
    }
  };
  return useQuery(gatherKeys.current_user, () => getUser());
};
// 로그아웃
const useLogOut = () => {
  const logout = async () => {
    const { error } = await supabase_client.auth.signOut();
    if (error) {
      throw console.log(`유저 로그아웃 오류 : ${error.message}`);
    } else {
      toast.success('로그아웃');
    }
  };
  const client = useQueryClient();
  return useMutation(() => logout(), {
    onSuccess: () => {
      client.removeQueries();
    },
  });
};
// 회원가입
const useCreateUser = () => {
  const createUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${location.origin}/auth/callback`,
      // },
    });
    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          toast.error('이미 사용중인 이메일입니다.');
          throw console.log(`유저 회원가입 오류 : ${error.message}`);
        case 'User already registered':
          toast.error('이미 사용중인 이메일입니다.');
          throw console.log(`유저 회원가입 오류 : ${error.message}`);
        default:
          toast.error(error.message);
          throw console.log(`유저 회원가입 오류 : ${error.message}`);
      }
    } else {
      toast.success('회원가입에 성공하였습니다!');
    }

    return { data, formData };
  };
  return useMutation(createUser, {
    onSuccess: async ({ data, formData }) => {
      const { data: insertData, error: insertError } = await supabase_client
        .from('profiles')
        .insert({
          id: data.user.id,
          email: formData.email,
          name: formData.name,
          role: 'member',
          privacy_check: formData.check,
        });
      if (insertError) {
        throw console.log(`유저 정보 기입 오류 : ${insertError.message}`);
      }
    },
  });
};
// 유저 로그인
const useSignIn = () => {
  const login = async ({ email, password }) => {
    const { error } = await supabase_client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          throw toast.error('로그인정보가 올바르지 않습니다.');
        default:
          throw toast.error(`로그인 오류 : ${error.message}`);
      }
    } else {
      toast.success('로그인 성공하였습니다!');
    }
  };

  const client = useQueryClient();
  return useMutation(login, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.current_user);
    },
  });
};
// 구글 로그인
const useSignInGoogle = () => {
  const googleLogin = async () => {
    const { data, error } = await supabase_client.auth.signInWithOAuth({
      provider: 'google',
    });
    // if (data) {
    //   console.log(data.provider);
    //   const { data: insertData, error: insertError } = await supabase_client
    //     .from('profiles')
    //     .insert({
    //       id: data.id,
    //       email: data.email,
    //       role: 'member',
    //       privacy_check: 'true',
    //     });
    //   if (insertError) {
    //     throw console.log(`유저 정보 기입 오류 : ${insertError.message}`);
    //   } else {
    //     client.setQueryData(gatherKeys.current_user, getUser(data?.user.id));
    //     return insertData;
    //   }
    // }
    // if (error) {
    //   throw toast.error(`GoogleLogin : ${error.message}`);
    // }
    return data;
  };
  return useMutation(googleLogin);
};

export const useUser = () => {
  return {
    useIsUser,
    useGetSession,
    useGetUserInfo,
    useCreateUser,
    useSignIn,
    useSignInGoogle,
    useLogOut,
  };
};
