import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

const supabaseServer = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
});
export default supabaseServer;
