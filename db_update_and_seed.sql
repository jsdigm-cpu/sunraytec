-- [1] 테이블 컬럼 추가 (이미 있으면 무시)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS weight_kg numeric,
  ADD COLUMN IF NOT EXISTS current_a numeric,
  ADD COLUMN IF NOT EXISTS calorific_value_kcal numeric,
  ADD COLUMN IF NOT EXISTS heating_temp_c text;

-- [2] 엑셀에서 추출한 제품 데이터 입력
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25334603-1', 'SUR-25334603', '복사난방패널', 'excellent', 'exposed', 3600, '1510 x 375 x 48', '220 (380) / 60', '19.8~29.7', 17, 16.3, 3096, '약350~390', '["대형공간 및 야외난방 (공장","/체육관/물류센터/  테라스 등)","동파방지(소화전/물탱크실 등)","결로방지(지하실 등)","제품/기계 예열, 건조","(난방능력 : 약6~9평)"]'::jsonb, '25334603')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25334605-25800925-2', 'SUR-25334605 
25800925', '복사난방패널', 'excellent', 'exposed', 2400, '(매립) 1510 x 300 x 48', '220 / 60', '13.2~19.8', 13, 10.9, 2064, '약350~390', '["중/대형공간 난방 (학교/교실/","사무실/공장/업소/매장 등)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약4~6평)"]'::jsonb, '25334605 
25800925')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25334606-23921490-3', 'SUR-25334606 
23921490', '복사난방패널', 'excellent', 'exposed', 1800, '(매립) 1200 x 300 x 48', '220 / 60', '9.9~13.2', 10, 8.2, 1548, '약350~400', '["중/소형공간 난방","(사무실/가정/업소)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약3~5평)"]'::jsonb, '25334606 
23921490')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25334606-25800924-4', 'SUR-25334606 
25800924', '복사난방패널', 'excellent', 'exposed', 1200, '(매립) 1200 x 300 x 48', '220 / 60', '6.6~9.9', 10, 5.5, 1032, '약350~400', '["중/소형공간 난방","(사무실/가정/업소)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약2~3평)"]'::jsonb, '25334606 
25800924')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25334603-5', 'SUR-25334603', '복사난방패널', 'excellent', 'embedded', 600, '(매립) 600 x 300 x 48', '220 / 60', '3.3~4.9', 3, 2.7, 516, '약350~400', '["소규모 공간 난방","(사무실/가정/욕실)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약1~1.5평)"]'::jsonb, '25334603')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25800923-6', 'SUR-25800923', '복사난방패널', 'excellent', 'wall-mounted', 600, '(벽걸이형) 630 x 220 x 35', '220 / 60', '3.3~4.9', 3, 2.7, 516, '약350~400', '["소규모 공간 및 개인용 난방","(사무실/가정/욕실)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약1~1.5평)"]'::jsonb, '25800923')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25312825-7', 'SUR-25312825', '복사난방패널', 'excellent', 'embedded', 0, '93 x 43 x 25', '3.0(1.5V x 2) DC', '', 85, 0, 0, '', '["난방기 제어용 리모컨 (공용)","(추가선택품목 - 부품)"]'::jsonb, '25312825')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25347133-8', 'SUR-25347133', '복사난방패널', 'excellent', 'embedded', 0, '70 x 120 x 27', '100VAC ~ 240VAC', '', 170, 0, 0, '', '["원격제어 통신용 온도조절기","(추가선택품목 - 부품)"]'::jsonb, '25347133')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25803890-9', 'SUR-25803890', '복사난방패널', 'excellent', 'embedded', 0, '130 x 180 x 35', '100VAC ~ 240VAC', '', 360, 0, 0, '', '["원격제어 14회로 중앙제어기","(추가선택품목 - 부품)"]'::jsonb, '25803890')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25361248-10', 'SUR-25361248', '복사난방패널', 'excellent', 'embedded', 0, '265 x 20 x 25', '100VAC ~ 240VAC', '', 580, 0, 0, '', '["원격제어 128회로 중앙제어기","(추가선택품목 - 부품)"]'::jsonb, '25361248')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur--11', '모 델 명', '복사난방패널', 'mas', 'embedded', 0, '', '', '', 0, 0, 0, '', '["적용 분야"]'::jsonb, '조달 마스제풐 식별번호')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25387001-12', 'SUR-25387001', '복사난방패널', 'mas', 'exposed', 3600, '1510 x 375 x 48', '220 (380) / 60', '19.8~29.7', 17, 16.3, 3096, '약350~390', '["대형공간 및 야외난방 (공장","/체육관/물류센터/  테라스 등)","동파방지(소화전/물탱크실 등)","결로방지(지하실 등)","제품/기계 예열, 건조","(난방능력 : 약6~9평)"]'::jsonb, '25387001')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386998-25387000-13', 'SUR-25386998 
    25387000', '복사난방패널', 'mas', 'exposed', 2400, '(매립) 1510 x 300 x 48', '220 / 60', '13.2~19.8', 13, 10.9, 2064, '약350~390', '["중/대형공간 난방 (학교/교실","/사무실/공장/업소/매장 등)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약4~6평)"]'::jsonb, '25386998 
    25387000')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386997-14', 'SUR-25386997', '복사난방패널', 'mas', 'embedded', 1800, '(매립) 1200 x 300 x 48', '220 / 60', '9.9~13.2', 10, 8.2, 1548, '약350~400', '["중/소형공간 난방","(사무실/가정/업소)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약3~5평)"]'::jsonb, '25386997')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386996-25386999-15', 'SUR-25386996 
    25386999', '복사난방패널', 'mas', 'exposed', 1200, '(매립) 1200 x 300 x 48', '220 / 60', '6.6~9.9', 10, 5.5, 1032, '약350~400', '["중/소형공간 난방","(사무실/가정/업소)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약2~3평)"]'::jsonb, '25386996 
    25386999')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386995-16', 'SUR-25386995', '복사난방패널', 'mas', 'embedded', 600, '(매립) 600 x 300 x 48', '220 / 60', '3.3~4.9', 3, 2.7, 516, '약350~400', '["소규모 공간 난방","(사무실/가정/욕실)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약1~1.5평)"]'::jsonb, '25386995')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386994-17', 'SUR-25386994', '복사난방패널', 'mas', 'wall-mounted', 600, '(벽걸이형) 630 x 220 x 35', '220 / 60', '3.3~4.9', 3, 2.7, 516, '약350~400', '["소규모 공간 및 개인용 난방","(사무실/가정/욕실)","제품 및 기계 예열","동파방지(화장실 등)","결로방지(지하실 등)","(난방능력 : 약1~1.5평)"]'::jsonb, '25386994')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25386993-18', 'SUR-25386993', '복사난방패널', 'mas', 'embedded', 300, '500 x 580 x 28', '220 / 60', '1~2', 2, 1.4, 258, '약350~400', '["책상속 상판 고정형","개인 초절전 난방기","(Under Desk Type)"]'::jsonb, '25386993')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25387002-19', 'SUR-25387002', '복사난방패널', 'mas', 'embedded', 0, '93 x 43 x 25', '3.0(1.5V x 2) DC', '', 85, 0, 0, '', '["난방기 제어용 리모컨 (공용)","(추가선택품목 - 부품)"]'::jsonb, '25387002')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25392029-20', 'SUR-25392029', '복사난방패널', 'mas', 'embedded', 0, '70 x 120 x 27', '100VAC ~ 240VAC', '', 170, 0, 0, '', '["원격제어 통신용 온도조절기","(추가선택품목 - 부품)"]'::jsonb, '25392029')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25387004-21', 'SUR-25387004', '복사난방패널', 'mas', 'embedded', 0, '130 x 180 x 35', '100VAC ~ 240VAC', '', 360, 0, 0, '', '["원격제어 14회로 중앙제어기","(추가선택품목 - 부품)"]'::jsonb, '25387004')
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
INSERT INTO public.products (id, name, category, product_line, installation_type, power_w, size_mm, voltage, heating_area, weight_kg, current_a, calorific_value_kcal, heating_temp_c, applications, procurement_id)
VALUES ('sur-sur-25387003-22', 'SUR-25387003', '복사난방패널', 'mas', 'embedded', 0, '265 x 20 x 25', '100VAC ~ 240VAC', '', 580, 0, 0, '', '["원격제어 128회로 중앙제어기","(추가선택품목 - 부품)"]'::jsonb, '25387003')
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
