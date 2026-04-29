import fs from 'fs';
import { initialProducts } from '../src/data/products';

let sql = `-- [최종 복구] 누락된 크기, 전압, 난방면적 등 모든 스펙 복구\n\n`;

initialProducts.forEach(p => {
  const size = p.specs.sizeMm || '';
  const voltage = p.specs.voltage || '';
  const hArea = p.specs.heatingArea || '';
  
  sql += `UPDATE public.products
SET size_mm = '${size}',
    voltage = '${voltage}',
    heating_area = '${hArea}'
WHERE id = '${p.id}';
`;
});

fs.writeFileSync('../db_fix_2.sql', sql);
console.log('SQL generated.');
