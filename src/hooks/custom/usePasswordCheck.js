import supabase_client from 'lib/supabase-browser';

export const useBoardPasswordCheck = async (table, id, password) => {
  const { data, error } = await supabase_client
    .from(table)
    .select('id')
    .eq('id', id)
    .eq('password', password)
    .single();
  if (error) {
    console.error(`Password ERROR : ${error.message}`);
    return false;
  }
  return data;
};
