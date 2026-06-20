import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
  },
});

export default supabase;
