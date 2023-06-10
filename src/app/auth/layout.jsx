import supabase_server from 'lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }) {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();
  if (session?.user) {
    redirect('/');
  }
  return <section>{children}</section>;
}
