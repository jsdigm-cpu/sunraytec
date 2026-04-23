import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpyvabbxjgkxypafdrrp.supabase.co';
const supabaseKey = 'sb_publishable_FbU38FsKNWADLALwq3kucg_VurLdupO';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Checking sign in...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'master@sunraytec.net',
    password: 'sunraytec2021!',
  });
  console.log('SignIn Result:', data, error);
}

test();
