import supabase_client from 'lib/supabase_client';

export const useBoardPasswordCheck = async (table, name, password) => {
  const { data, error } = await supabase_client
    .from(table)
    .select('id')
    .eq('name', name)
    .eq('password', password)
    .single();
  if (error) {
    console.error(`Password ERROR : ${error.message}`);
    return false;
  }
  return data;
};
