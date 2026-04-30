-- site_settings 테이블: 사이트 전역 설정 (히어로 테마 등)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key         text PRIMARY KEY,
  value       jsonb NOT NULL,
  updated_at  timestamptz DEFAULT now()
);

-- RLS 활성화
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (프론트에서 테마 로드)
CREATE POLICY "site_settings_public_read"
  ON public.site_settings FOR SELECT
  USING (true);

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "site_settings_auth_write"
  ON public.site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 기본 히어로 테마 초기값 삽입
INSERT INTO public.site_settings (key, value)
VALUES (
  'hero_theme',
  '{
    "gradientAngle": 160,
    "gradientStart": "#0F2241",
    "gradientMid": "#152035",
    "gradientEnd": "#0E1E3A",
    "accentColor": "#E5483A",
    "overlayEffect": "none"
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
