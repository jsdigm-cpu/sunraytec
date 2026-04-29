const fs = require('fs');
const products = require('../src/data/parsed_products.json');

let sql = `-- [1] 테이블 컬럼 추가 (이미 있으면 무시)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS weight_kg numeric,
  ADD COLUMN IF NOT EXISTS current_a numeric,
  ADD COLUMN IF NOT EXISTS calorific_value_kcal numeric,
  ADD COLUMN IF NOT EXISTS heating_temp_c text;

-- [2] 엑셀에서 추출한 제품 데이터 입력
`;

products.forEach((p, idx) => {
  if (p.name === '모델명') return; // skip header row if any
  
  const idStr = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const id = `sur-${idStr}-${idx}`;
  
  const power = p.specs.powerW || 0;
  const size = p.specs.sizeMm || '';
  const volt = p.specs.voltage || '';
  const hArea = p.specs.heatingArea || '';
  const weight = p.specs.weightKg || 0;
  const current = p.specs.currentA || 0;
  const kcal = p.specs.calorificValueKcal || 0;
  const hTemp = p.specs.heatingTempC || '';
  
  const apps = JSON.stringify(p.applications).replace(/'/g, "''");
  const name = p.name.replace(/'/g, "''");
  
  sql += `INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('${id}', '${name}', '복사난방패널', '${p.productLine}', '${p.installationType}', ${power}, '${size}', '${volt}', '${hArea}', ${weight}, ${current}, ${kcal}, '${hTemp}', '${apps}'::jsonb, '${p.procurementId}')
ON CONFLICT (id) DO UPDATE SET
  power_w = EXCLUDED.power_w,
  size_mm = EXCLUDED.size_mm,
  voltage = EXCLUDED.voltage,
  heating_area = EXCLUDED.heating_area,
  weight_kg = EXCLUDED.weight_kg,
  current_a = EXCLUDED.current_a,
  calorific_value_kcal = EXCLUDED.calorific_value_kcal,
  heating_temp_c = EXCLUDED.heating_temp_c,
  procurement_id = EXCLUDED.procurement_id;
`;
});

fs.writeFileSync('../db_update_and_seed.sql', sql);
console.log('SQL generated successfully.');
