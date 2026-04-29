const fs = require('fs');

// We don't have direct access to typescript files, so I'll write the logic mapping specs directly.
const getSpecsForPower = (powerW) => {
  if (powerW === 3600) return { weightKg: 17, currentA: 16.3, calorificValueKcal: 3096, heatingTempC: '약350~390' };
  if (powerW === 2400) return { weightKg: 13, currentA: 10.9, calorificValueKcal: 2064, heatingTempC: '약350~390' };
  if (powerW === 1800) return { weightKg: 10, currentA: 8.2, calorificValueKcal: 1548, heatingTempC: '약350~400' };
  if (powerW === 1200) return { weightKg: 10, currentA: 5.5, calorificValueKcal: 1032, heatingTempC: '약350~400' };
  if (powerW === 600) return { weightKg: 3, currentA: 2.7, calorificValueKcal: 516, heatingTempC: '약350~400' };
  if (powerW === 300) return { weightKg: 2, currentA: 1.4, calorificValueKcal: 258, heatingTempC: '약350~400' };
  return { weightKg: 0, currentA: 0, calorificValueKcal: 0, heatingTempC: '' };
};

// IDs from products.ts
const originalProducts = [
  { id: 'sur-3600-excellent', powerW: 3600 },
  { id: 'sur-2400-t', powerW: 2400 },
  { id: 'sur-2400-d', powerW: 2400 },
  { id: 'sur-1800-t', powerW: 1800 },
  { id: 'sur-1800-d', powerW: 1800 },
  { id: 'sur-1200-t', powerW: 1200 },
  { id: 'sur-1200-d', powerW: 1200 },
  { id: 'sur-600-t', powerW: 600 },
  { id: 'sur-600-wall-excellent', powerW: 600 },
  { id: 'sur-3600-mas', powerW: 3600 },
  { id: 'sur-2400-1', powerW: 2400 },
  { id: 'sur-2400-2', powerW: 2400 },
  { id: 'sur-1800-1', powerW: 1800 },
  { id: 'sur-1200-1', powerW: 1200 },
  { id: 'sur-1200-2', powerW: 1200 },
  { id: 'sur-600-1', powerW: 600 },
  { id: 'sur-600-wall-mas', powerW: 600 },
  { id: 'sur-d300a', powerW: 300 }
];

let sql = `-- [1] 잘못 들어간 엑셀 데이터 삭제
DELETE FROM public.products
WHERE id LIKE 'sur-sur-%' OR name LIKE '모델명%' OR name LIKE '모 델 명%';

-- [2] 기존 제품들에 엑셀의 상세 스펙(무게, 전류 등) 매핑 업데이트
`;

originalProducts.forEach(p => {
  const specs = getSpecsForPower(p.powerW);
  sql += `UPDATE public.products
SET weight_kg = ${specs.weightKg},
    current_a = ${specs.currentA},
    calorific_value_kcal = ${specs.calorificValueKcal},
    heating_temp_c = '${specs.heatingTempC}'
WHERE id = '${p.id}';
`;
});

fs.writeFileSync('../db_fix.sql', sql);
console.log('Fix SQL generated.');
