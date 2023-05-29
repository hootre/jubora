import { useMutation, useQueryClient } from 'react-query';

const addMovie = async (movie, user_id) => {
  const { error } = await supabase.from('movies').upsert(movie).single();

  if (error) {
    throw error;
  }

  const { data, error: err } = await supabase
    .from('recommendations')
    .upsert(
      { movie_id: movie.movie_id, user_id },
      {
        onConflict: 'user_id, movie_id',
      }
    )
    .single();

  if (err) {
    throw err;
  }

  return data;
};

export default function useAddMovie(movie: Movie) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(() => addMovie(movie, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries('recommendations');
    },
  });
}
