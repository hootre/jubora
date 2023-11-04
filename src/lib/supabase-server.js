import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
const supabase_server = createServerComponentClient({ cookies });

export default supabase_server;
