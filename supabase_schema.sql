-- ============================================
-- 썬레이텍 Supabase 초기 스키마 생성 SQL
-- Supabase Dashboard > SQL Editor 에서 실행
-- ============================================

-- 1. products 테이블
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  product_line text NOT NULL,
  installation_type text,
  summary text,
  detail_description text,
  applications jsonb,
  power_w integer,
  size_mm text,
  voltage text,
  heating_area text,
  procurement_id text,
  thumbnail_image text,
  detail_image text,
  feature_bullets jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. site_content 테이블
CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  payload jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- 3. case_studies 테이블
CREATE TABLE IF NOT EXISTS public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  location text,
  summary text,
  content text,
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. inquiries 테이블
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  phone text,
  email text,
  project_type text,
  space_size text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- 5. RLS(Row Level Security) 정책 - anon 키로 읽기 허용
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- products: 누구나 읽기 가능
CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT
  USING (true);

-- site_content: 누구나 읽기 가능
CREATE POLICY "Anyone can read site_content"
  ON public.site_content FOR SELECT
  USING (true);

-- case_studies: 누구나 읽기 가능
CREATE POLICY "Anyone can read case_studies"
  ON public.case_studies FOR SELECT
  USING (true);

-- inquiries: 누구나 삽입 가능 (견적 문의 폼)
CREATE POLICY "Anyone can insert inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);
