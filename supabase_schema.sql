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

-- 5. profiles 테이블
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  company_name text,
  phone text,
  role text NOT NULL DEFAULT 'partner' CHECK (role IN ('admin', 'partner')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.partner_signup_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  company_name text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. RLS(Row Level Security) 정책
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_signup_requests ENABLE ROW LEVEL SECURITY;

-- 관리자 확인 함수
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND status = 'approved'
  );
$$;

-- 회원가입 시 프로필 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    company_name,
    phone,
    role,
    status
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'company_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'partner'),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'status', ''), 'pending')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    company_name = COALESCE(public.profiles.company_name, EXCLUDED.company_name),
    phone = COALESCE(public.profiles.phone, EXCLUDED.phone);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 기존 Auth 사용자 중 profiles가 없는 사용자 복구
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  company_name,
  phone,
  role,
  status,
  created_at
)
SELECT
  u.id,
  COALESCE(u.email, ''),
  NULLIF(u.raw_user_meta_data->>'full_name', ''),
  NULLIF(u.raw_user_meta_data->>'company_name', ''),
  NULLIF(u.raw_user_meta_data->>'phone', ''),
  COALESCE(NULLIF(u.raw_user_meta_data->>'role', ''), 'partner'),
  COALESCE(NULLIF(u.raw_user_meta_data->>'status', ''), 'pending'),
  COALESCE(u.created_at, now())
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

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

-- profiles: 본인 또는 관리자만 조회/수정
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admins can manage profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Anyone can create signup requests"
  ON public.partner_signup_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read signup requests"
  ON public.partner_signup_requests FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can manage signup requests"
  ON public.partner_signup_requests FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 관리자 CMS 쓰기 권한
CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can manage site_content"
  ON public.site_content FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can manage case_studies"
  ON public.case_studies FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can read inquiries"
  ON public.inquiries FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
