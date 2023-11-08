import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseClient = createClientComponentClient({
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
});

export default supabaseClient;
