import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProfile() {
  const userId = '7c7b8191-ce6a-485b-aeef-2a6de0576332';
  const email = 'master@sunraytec.net';

  console.log(`Attempting to insert admin profile for ${email}...`);

  const { data, error } = await supabase.from('profiles').insert({
    id: userId,
    email: email,
    full_name: '관리자',
    role: 'admin',
    status: 'approved'
  }).select();

  console.log('Result:', data);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Successfully created admin profile!');
  }
}

fixProfile();
