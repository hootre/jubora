import supabaseClient from 'lib/supabaseClient';
import toast from 'react-hot-toast';

const BoardPasswordCheck = async (table, name, password) => {
  const { data, error } = await supabaseClient
    .from(table)
    .select('id')
    .eq('name', name)
    .eq('password', password)
    .single();
  if (error) {
    toast.error(`틀린 비밀번호입니다 : ${error.message}`);
    return false;
  }
  return data;
};

export default BoardPasswordCheck;
