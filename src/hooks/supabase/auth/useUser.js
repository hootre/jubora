import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import supabase_client from 'lib/supabase_client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { gatherKeys } from 'utils/gatherKeys';

const useIsUser = () => {
  const client = useQueryClient();
  const user = client.getQueryData(gatherKeys.current_user);
  return user ? true : false;
};

// cookie에서 jwt 가져오기
const useGetSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase_client.auth.getSession();
  if (error) {
    console.error(`유저 session 가져오기 오류 : ${error.message}`);
    return;
  }
  return session;
};

// userList 가져오기
const useGetUserList = () => {
  const handleGetUserList = async () => {
    const session = await useGetSession();
    if (session) {
      const { data, error } = await supabase_client.from('profiles').select('*');
      return new Promise((resolve, reject) => {
        if (error) {
          reject(`유저 리스트 불러오기 오류 :  ${error.message}`);
        } else {
          resolve(data);
        }
      });
    } else {
      return [];
    }
  };
  return useQuery(gatherKeys.current_userList, handleGetUserList);
};

// session 확인하여 유저정보 출력
const useGetUserInfo = () => {
  const handleGetUser = async () => {
    const session = await useGetSession();
    if (session) {
      let { data, error } = await supabase_client
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();
      return new Promise((resolve, reject) => {
        if (error) {
          reject(`유저 정보 출력 오류 :  ${error.message}`);
        } else {
          resolve(data);
        }
      });
    } else {
      return [];
    }
  };
  return useQuery(gatherKeys.current_user, handleGetUser);
};

// 로그아웃
const useLogOut = () => {
  const handleLogout = async () => {
    const { error } = await supabase_client.auth.signOut();
    if (error) {
      console.error(`유저 로그아웃 오류 : ${error.message}`);
    } else {
      toast.success('로그아웃');
    }
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleLogout, {
    onSuccess: () => {
      router.refresh();
      client.removeQueries(gatherKeys.current_user);
    },
  });
};

//회원퇄퇴
const useDelete = () => {
  const handleDelete = async (id) => {
    const { error: profiles_error } = await supabase_client.from('profiles').delete().eq('id', id);

    if (profiles_error) {
      console.error(`회원탈퇴 오류 : ${profiles_error.message}`);
    } else {
      const { error } = await supabase_client.auth.admin.deleteUser(id);
      if (!error) toast.success('회원퇄퇴 성공');
    }
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleDelete, {
    onSuccess: () => {
      router.push('/');
      client.removeQueries(gatherKeys.current_user);
    },
  });
};
//회원삭제
const useAdminDelete = () => {
  const handleAdminDelete = async (id) => {
    const { error: profiles_error } = await supabase_client.from('profiles').delete().eq('id', id);

    if (profiles_error) {
      console.log(`회원삭제 오류 : ${profiles_error.message}`);
    } else {
      const { error } = await supabase_client.auth.admin.deleteUser(id);
      if (!error) console.log('회원삭제 성공');
    }
  };
  const client = useQueryClient();
  return useMutation(handleAdminDelete, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.current_userList);
    },
  });
};
// 회원가입
const useCreateUser = () => {
  const handleCreateUser = async ({ name, email, password, privacy_check }) => {
    const { data: auth, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (auth) {
      const { data: insertData, error: insertError } = await supabase_client
        .from('profiles')
        .insert({
          id: auth.user.id,
          email,
          name,
          role: 'member',
          privacy_check,
        });
      if (insertError) {
        const { error } = await supabase_client.auth.admin.deleteUser(auth.user.id);
        if (error) {
          console.error(`유저 정보 기입 오류로 인한 유저 삭제 실패 : ${insertError.message}`);
          return;
        }
        console.error(`유저 정보 기입 오류 : ${insertError.message}`);
        return;
      } else {
        toast.success('회원가입에 성공하였습니다!');
      }

      return insertData;
    }
    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          toast.error('이미 사용중인 이메일입니다.');
          console.error(`유저 회원가입 오류 : ${error.message}`);
          break;
        case 'User already registered':
          toast.error('이미 사용중인 이메일입니다.');
          console.error(`유저 회원가입 오류 : ${error.message}`);
          break;
        default:
          toast.error(error.message);
          console.error(`유저 회원가입 오류 : ${error.message}`);
          break;
      }
    }
  };
  return useMutation(handleCreateUser);
};

// 회원 정보 업데이트
const useUpdateUser = () => {
  const handleUpdateUser = async ({
    id,
    name,
    phone,
    password,
    address_1,
    address_2,
    address_3,
  }) => {
    if (password) {
      const { data, error } = await supabase_client.auth.updateUser({
        password,
      });
      if (error) {
        toast.error(`비밀변호 변경 실패 ${error.message}`);
      } else {
        toast.success('비밀변호 변경완료');
      }
    }
    const { data, error } = await supabase_client
      .from('profiles')
      .update({
        name,
        phone,
        address_1,
        address_2,
        address_3,
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(`유저 정보 수정 오류 :  ${error.message}`);
      } else {
        toast.success('수정완료 하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleUpdateUser, {
    onSuccess: async () => {
      router.refresh();
      await client.invalidateQueries(gatherKeys.current_user);
    },
  });
};

// 유저 로그인
const useSignIn = () => {
  const handleLogin = async ({ email, password }) => {
    const { data, error } = await supabase_client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          toast.error('로그인정보가 올바르지 않습니다.');
          console.error('로그인정보가 올바르지 않습니다.');
          break;
        default:
          toast.error('로그인 오류입니다');
          console.error(`로그인 오류 : ${error.message}`);
      }
      return error;
    } else {
      toast.success('로그인 성공하였습니다!');
      return data;
    }
  };

  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleLogin, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.current_user);
      router.refresh();
    },
  });
};
// 구글 로그인
const useSignInGoogle = () => {
  const handleGoogleLogin = async () => {
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
    //      console.error(`유저 정보 기입 오류 : ${insertError.message}`);
    //   } else {
    //     client.setQueryData(gatherKeys.current_user, getUser(data?.user.id));
    //     return insertData;
    //   }
    // }
    // if (error) {
    //    toast.econsole.error(`GoogleLogin : ${error.message}`);
    // }
    return data;
  };
  return useMutation(handleGoogleLogin);
};

export const useUser = () => {
  return {
    useIsUser,
    useGetSession,
    useGetUserList,
    useGetUserInfo,
    useCreateUser,
    useUpdateUser,
    useSignIn,
    useSignInGoogle,
    useLogOut,
    useAdminDelete,
    useDelete,
  };
};
