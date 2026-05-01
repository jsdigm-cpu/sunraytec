import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'node:fs';

const ENV_CANDIDATES = ['.env.local', '../../../.env.local', 'C:/projects/sunraytec/.env.local'];
for (const c of ENV_CANDIDATES) {
  if (fs.existsSync(c)) {
    dotenv.config({ path: c });
    break;
  }
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || '',
);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, product_line, installation_type, thumbnail_image')
    .order('product_line', { ascending: true });

  if (error) {
    console.error('❌', error.message);
    process.exit(1);
  }

  console.log(`\n전체 ${data?.length}개 제품:\n`);
  data?.forEach((p) => {
    const hasImage = p.thumbnail_image ? '✅' : '❌';
    console.log(
      `  ${hasImage} [${p.product_line}/${p.installation_type}] ${p.name} (id: ${p.id})`,
    );
    if (p.thumbnail_image) console.log(`       → ${p.thumbnail_image.split('/').pop()}`);
  });
}

run();
