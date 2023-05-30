import { useMutation } from '@tanstack/react-query';
import supabase from 'lib/supabase-browser';
import { toast } from 'react-hot-toast';

const createUser = async (formData) => {
  const signUpPromise = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  const { data } = signUpPromise;
  toast
    .promise(signUpPromise, {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    })
    .then((r) => r)
    .catch((error) => error);

  return { data, formData };
};

export const useCreateUser = () => {
  return useMutation((formData) => createUser(formData), {
    onSuccess: async ({ data, formData }) => {
      console.log('createUser');
      const { data: insertData, error: insertError } = await supabase.from('profiles').insert({
        id: data.user.id,
        name: formData.name,
        privacy_check: formData.check,
      });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
};
