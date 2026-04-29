-- [1] 잘못 들어간 엑셀 데이터 삭제
DELETE FROM public.products
WHERE id LIKE 'sur-sur-%' OR name LIKE '모델명%' OR name LIKE '모 델 명%';

-- [2] 기존 제품들에 엑셀의 상세 스펙(무게, 전류 등) 매핑 업데이트
UPDATE public.products
SET weight_kg = 17,
    current_a = 16.3,
    calorific_value_kcal = 3096,
    heating_temp_c = '약350~390'
WHERE id = 'sur-3600-excellent';
UPDATE public.products
SET weight_kg = 13,
    current_a = 10.9,
    calorific_value_kcal = 2064,
    heating_temp_c = '약350~390'
WHERE id = 'sur-2400-t';
UPDATE public.products
SET weight_kg = 13,
    current_a = 10.9,
    calorific_value_kcal = 2064,
    heating_temp_c = '약350~390'
WHERE id = 'sur-2400-d';
UPDATE public.products
SET weight_kg = 10,
    current_a = 8.2,
    calorific_value_kcal = 1548,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1800-t';
UPDATE public.products
SET weight_kg = 10,
    current_a = 8.2,
    calorific_value_kcal = 1548,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1800-d';
UPDATE public.products
SET weight_kg = 10,
    current_a = 5.5,
    calorific_value_kcal = 1032,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1200-t';
UPDATE public.products
SET weight_kg = 10,
    current_a = 5.5,
    calorific_value_kcal = 1032,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1200-d';
UPDATE public.products
SET weight_kg = 3,
    current_a = 2.7,
    calorific_value_kcal = 516,
    heating_temp_c = '약350~400'
WHERE id = 'sur-600-t';
UPDATE public.products
SET weight_kg = 3,
    current_a = 2.7,
    calorific_value_kcal = 516,
    heating_temp_c = '약350~400'
WHERE id = 'sur-600-wall-excellent';
UPDATE public.products
SET weight_kg = 17,
    current_a = 16.3,
    calorific_value_kcal = 3096,
    heating_temp_c = '약350~390'
WHERE id = 'sur-3600-mas';
UPDATE public.products
SET weight_kg = 13,
    current_a = 10.9,
    calorific_value_kcal = 2064,
    heating_temp_c = '약350~390'
WHERE id = 'sur-2400-1';
UPDATE public.products
SET weight_kg = 13,
    current_a = 10.9,
    calorific_value_kcal = 2064,
    heating_temp_c = '약350~390'
WHERE id = 'sur-2400-2';
UPDATE public.products
SET weight_kg = 10,
    current_a = 8.2,
    calorific_value_kcal = 1548,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1800-1';
UPDATE public.products
SET weight_kg = 10,
    current_a = 5.5,
    calorific_value_kcal = 1032,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1200-1';
UPDATE public.products
SET weight_kg = 10,
    current_a = 5.5,
    calorific_value_kcal = 1032,
    heating_temp_c = '약350~400'
WHERE id = 'sur-1200-2';
UPDATE public.products
SET weight_kg = 3,
    current_a = 2.7,
    calorific_value_kcal = 516,
    heating_temp_c = '약350~400'
WHERE id = 'sur-600-1';
UPDATE public.products
SET weight_kg = 3,
    current_a = 2.7,
    calorific_value_kcal = 516,
    heating_temp_c = '약350~400'
WHERE id = 'sur-600-wall-mas';
UPDATE public.products
SET weight_kg = 2,
    current_a = 1.4,
    calorific_value_kcal = 258,
    heating_temp_c = '약350~400'
WHERE id = 'sur-d300a';
