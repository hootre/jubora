import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase_client = createClientComponentClient({
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
});

export default supabase_client;
