-- [최종 복구] 누락된 크기, 전압, 난방면적 등 모든 스펙 복구

UPDATE public.products
SET size_mm = '1510 × 375 × 48',
    voltage = '220 (380) / 60Hz',
    heating_area = '19.8~29.7㎡ (약 6~9평)'
WHERE id = 'sur-3600-excellent';
UPDATE public.products
SET size_mm = '1510 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '13.2~19.8㎡ (약 4~6평)'
WHERE id = 'sur-2400-t';
UPDATE public.products
SET size_mm = '1510 × 275 × 48',
    voltage = '220 / 60Hz',
    heating_area = '13.2~19.8㎡ (약 4~6평)'
WHERE id = 'sur-2400-d';
UPDATE public.products
SET size_mm = '1200 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '9.9~13.2㎡ (약 3~5평)'
WHERE id = 'sur-1800-t';
UPDATE public.products
SET size_mm = '1200 × 275 × 48',
    voltage = '220 / 60Hz',
    heating_area = '9.9~13.2㎡ (약 3~5평)'
WHERE id = 'sur-1800-d';
UPDATE public.products
SET size_mm = '1200 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '6.6~9.9㎡ (약 2~3평)'
WHERE id = 'sur-1200-t';
UPDATE public.products
SET size_mm = '1510 × 175 × 48',
    voltage = '220 / 60Hz',
    heating_area = '6.6~9.9㎡ (약 2~3평)'
WHERE id = 'sur-1200-d';
UPDATE public.products
SET size_mm = '600 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '3.3~4.9㎡ (약 1~1.5평)'
WHERE id = 'sur-600-t';
UPDATE public.products
SET size_mm = '630 × 220 × 35',
    voltage = '220 / 60Hz',
    heating_area = '3.3~4.9㎡ (약 1~1.5평)'
WHERE id = 'sur-600-wall-excellent';
UPDATE public.products
SET size_mm = '1510 × 375 × 48',
    voltage = '220 (380) / 60Hz',
    heating_area = '19.8~29.7㎡ (약 6~9평)'
WHERE id = 'sur-3600-mas';
UPDATE public.products
SET size_mm = '1510 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '13.2~19.8㎡ (약 4~6평)'
WHERE id = 'sur-2400-1';
UPDATE public.products
SET size_mm = '1510 × 275 × 48',
    voltage = '220 / 60Hz',
    heating_area = '13.2~19.8㎡ (약 4~6평)'
WHERE id = 'sur-2400-2';
UPDATE public.products
SET size_mm = '1200 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '9.9~13.2㎡ (약 3~5평)'
WHERE id = 'sur-1800-1';
UPDATE public.products
SET size_mm = '1200 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '6.6~9.9㎡ (약 2~3평)'
WHERE id = 'sur-1200-1';
UPDATE public.products
SET size_mm = '1510 × 175 × 48',
    voltage = '220 / 60Hz',
    heating_area = '6.6~9.9㎡ (약 2~3평)'
WHERE id = 'sur-1200-2';
UPDATE public.products
SET size_mm = '600 × 300 × 48',
    voltage = '220 / 60Hz',
    heating_area = '3.3~4.9㎡ (약 1~1.5평)'
WHERE id = 'sur-600-1';
UPDATE public.products
SET size_mm = '630 × 220 × 35',
    voltage = '220 / 60Hz',
    heating_area = '3.3~4.9㎡ (약 1~1.5평)'
WHERE id = 'sur-600-wall-mas';
UPDATE public.products
SET size_mm = '500 × 580 × 28',
    voltage = '220V / 60Hz',
    heating_area = '개인용'
WHERE id = 'sur-d300a';
