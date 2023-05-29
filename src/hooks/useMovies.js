import supabase from 'lib/supabase-browser';
import { useQuery } from 'react-query';

const searchMovies = async () => {
  let { data, error } = await supabase.from('test').select('*');

  if (error) {
    throw new Error('Error searching movies');
  }
  return data;
};

export default function useMovies() {
  return useQuery('profiles', () => searchMovies());
}
