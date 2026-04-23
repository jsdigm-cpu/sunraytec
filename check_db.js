import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*').eq('email', 'master@sunraytec.net');
  console.log('Profiles with master@sunraytec.net:', profiles);
  console.log('Error:', pErr);
}

check();
