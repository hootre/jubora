import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from 'lib/supabase';
import supabaseClient from 'lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTemplatesActions } from 'store';
import gatherKeys from 'utils/gatherKeys';
import koreaDate from 'utils/koreaDate';

const useIsUser = () => {
  const client = useQueryClient();
  const user = client.getQueryData(gatherKeys.currentUser);
  return user;
};

// 존재하는 이메일인지 확인
const checkEmail = async ({ email }) => {
  const { data } = await supabaseClient
    .from('profiles')
    .select('email')
    .eq('email', email)
    .single();
  return data;
};
// 비밀번호 재설정 메일
const sendResetEmail = async ({ email }) => {
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/home/mypage/my_info',
  });
  if (error) {
    switch (error.message) {
      case 'For security purposes, you can only request this once every 60 seconds':
        toast.error('60초에 한번씩 가능합니다.');
        return false;
      default:
        toast.error(error.message);
        return false;
    }
  }
  return true;
};

// cookie에서 jwt 가져오기
const GetSession = async () => {
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();
  if (error) {
    toast.error(`유저 session 가져오기 오류 : ${error.message}`);
  }
  return session;
};

// userList 가져오기
const GetUserList = () => {
  const handleGetUserList = async () => {
    const session = await GetSession();
    if (session) {
      const { data, error } = await supabaseClient.from('profiles').select('*');
      return new Promise((resolve, reject) => {
        if (error) {
          reject(new Error(`유저 리스트 불러오기 오류 :  ${error.message}`));
        } else {
          resolve(data);
        }
      });
    }
    return [];
  };
  return useQuery(gatherKeys.currentUserList, handleGetUserList);
};

// session 확인하여 유저정보 출력
const useGetUserInfo = () => {
  const handleGetUser = async () => {
    const session = await GetSession();
    if (session) {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', session?.user.id)
        .single();
      return new Promise((resolve, reject) => {
        if (error) {
          reject(new Error(`유저 정보 출력 오류 :  ${error.message}`));
        } else {
          resolve(data);
        }
      });
    }
    return [];
  };
  return useQuery(gatherKeys.currentUser, handleGetUser);
};

// 로그아웃
const useLogOut = () => {
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      throw new Error(`유저 로그아웃 오류 : ${error.message}`);
    } else {
      toast.success('로그아웃');
    }
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleLogout, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.currentUser);
      router.refresh();
    },
  });
};

// 회원퇄퇴
const useDelete = () => {
  const handleDelete = async (id) => {
    const { error: profilesError } = await supabaseClient.from('profiles').delete().eq('id', id);

    if (profilesError) {
      throw new Error(`회원탈퇴 오류 : ${profilesError.message}`);
    } else {
      const { error } = await supabaseClient.auth.admin.deleteUser(id);
      if (!error) toast.success('회원퇄퇴 성공');
    }
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleDelete, {
    onSuccess: () => {
      router.push('/');
      client.removeQueries(gatherKeys.currentUser);
    },
  });
};
// 회원삭제
const AdminDelete = () => {
  const handleAdminDelete = async (id) => {
    const { error: profilesError } = await supabaseClient.from('profiles').delete().eq('id', id);

    if (profilesError) {
      throw new Error(`회원삭제 오류 : ${profilesError.message}`);
    } else {
      const { error } = await supabaseClient.auth.admin.deleteUser(id);
      if (!error) toast.success('회원삭제 성공');
    }
  };
  const client = useQueryClient();
  return useMutation(handleAdminDelete, {
    onSuccess: () => {
      client.removeQueries(gatherKeys.currentUserList);
    },
  });
};
// 회원가입
const useCreateUser = () => {
  const handleCreateUser = async ({ name, email, password, privacyCheck }) => {
    const { data: auth, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      switch (error.message) {
        case 'Invalid login credentials':
          toast.error('이미 사용중인 이메일입니다.');
          throw new Error(`유저 회원가입 오류 : ${error.message}`);
        case 'User already registered':
          toast.error('이미 사용중인 이메일입니다.');
          throw new Error(`유저 회원가입 오류 : ${error.message}`);
        default:
          toast.error(error.message);
          throw new Error(`유저 회원가입 오류 : ${error.message}`);
      }
    } else if (auth.user.id) {
      const { error: insertError } = await supabaseClient.from('profiles').insert({
        id: auth.user.id,
        email,
        name,
        role: 'member',
        privacyCheck,
      });
      if (insertError) {
        const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(auth.user.id);
        if (deleteError) {
          throw new Error(`유저 정보 기입 오류로 인한 유저 삭제 실패 : ${insertError.message}`);
        }
        throw new Error(`유저 정보 기입 오류 : ${insertError.message}`);
      } else {
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        toast.success('회원가입에 성공하였습니다!');
      }
    }
  };
  const client = useQueryClient();
  const router = useRouter();
  // zustand
  const { setAuthState } = useTemplatesActions();
  return useMutation(handleCreateUser, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.currentUser);
      setAuthState();
      router.refresh();
    },
  });
};

// 어드민 계정에서 회원 권한 수정
const UpdateUserRole = () => {
  const handleUpdateUserRole = async ({ id, role }) => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .update({
        role,
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`유저 정보 수정 오류 :  ${error.message}`));
      } else {
        toast.success('수정완료 하였습니다');
        resolve(data);
      }
    });
  };
  const client = useQueryClient();
  const router = useRouter();
  return useMutation(handleUpdateUserRole, {
    onSuccess: async () => {
      router.refresh();
      await client.invalidateQueries(gatherKeys.currentUserList);
    },
  });
};

// 회원 정보 업데이트
const useUpdateUser = () => {
  const handleUpdateUser = async ({ id, name, phone, password, address1, address2, address3 }) => {
    if (password) {
      const { error } = await supabaseClient.auth.updateUser({
        password,
      });
      if (error) {
        toast.error(`비밀변호 변경 실패 ${error.message}`);
      } else {
        toast.success('비밀변호 변경완료');
      }
    }
    const { data, error } = await supabaseClient
      .from('profiles')
      .update({
        name,
        phone,
        address1,
        address2,
        address3,
      })
      .eq('id', id);
    return new Promise((resolve, reject) => {
      if (error) {
        reject(new Error(`유저 정보 수정 오류 :  ${error.message}`));
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
      await client.invalidateQueries(gatherKeys.currentUser);
    },
  });
};

// 유저 로그인
const useSignIn = () => {
  const handleLogin = async ({ email, password }) => {
    const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      switch (loginError.message) {
        case 'Invalid login credentials':
          toast.error('로그인정보가 올바르지 않습니다.');
          throw new Error('로그인정보가 올바르지 않습니다.');
        default:
          toast.error('로그인 오류입니다');
          throw new Error(`로그인 오류 : ${loginError.message}`);
      }
    } else {
      const { error } = await supabaseClient
        .from('profiles')
        .update({ updatedAt: koreaDate() })
        .eq('id', loginData.user.id);
      if (error) {
        throw new Error(`유저 상태 업데이트 오류${error.message}`);
      }
      toast.success('로그인 성공하였습니다!');
    }
  };

  const client = useQueryClient();
  const router = useRouter();
  // zustand
  const { setAuthState } = useTemplatesActions();
  return useMutation(handleLogin, {
    onSuccess: async () => {
      await client.invalidateQueries(gatherKeys.currentUser);
      setAuthState();
      router.push('/');
    },
  });
};
// 구글 로그인
const useSignInGoogle = () => {
  const handleGoogleLogin = async () => {
    const { data } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
    // if (data) {
    //   console.log(data.provider);
    //   const { data: insertData, error: insertError } = await supabaseClient
    //     .from('profiles')
    //     .insert({
    //       id: data.id,
    //       email: data.email,
    //       role: 'member',
    //       privacy_check: 'true',
    //     });
    //   if (insertError) {
    //      console.error(`유저 정보 기입 오류 : ${insertError.message}`));
    //   } else {
    //     client.setQueryData(gatherKeys.currentUser, getUser(data?.user.id));
    //     return insertData;
    //   }
    // }
    // if (error) {
    //    toast.econsole.error(`GoogleLogin : ${error.message}`));
    // }
    return data;
  };
  return useMutation(handleGoogleLogin);
};

const User = () => ({
  useIsUser,
  checkEmail,
  sendResetEmail,
  GetSession,
  GetUserList,
  useGetUserInfo,
  useCreateUser,
  UpdateUserRole,
  useUpdateUser,
  useSignIn,
  useSignInGoogle,
  useLogOut,
  AdminDelete,
  useDelete,
});
export default User;
