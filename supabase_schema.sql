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
  image_gallery jsonb DEFAULT '[]'::jsonb,
  feature_bullets jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_gallery jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

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

ALTER TABLE public.case_studies
  ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS installed_at date,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- 3-1. 자료실 문서 테이블
CREATE TABLE IF NOT EXISTS public.resource_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  file_url text,
  file_path text,
  file_size text,
  is_public boolean DEFAULT true,
  sort_order integer DEFAULT 0,
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
  organization text,
  position text,
  interest_area text,
  login_count integer NOT NULL DEFAULT 0,
  last_login_at timestamptz,
  portal_visit_count integer NOT NULL DEFAULT 0,
  last_portal_visited_at timestamptz,
  role text NOT NULL DEFAULT 'partner' CHECK (role IN ('admin', 'partner')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.partner_signup_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  company_name text NOT NULL,
  phone text NOT NULL,
  organization text,
  position text,
  interest_area text,
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
ALTER TABLE public.resource_documents ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_signup_requests TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_documents TO anon, authenticated;

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
    organization,
    position,
    interest_area,
    role,
    status
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'company_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    NULLIF(NEW.raw_user_meta_data->>'organization', ''),
    NULLIF(NEW.raw_user_meta_data->>'position', ''),
    NULLIF(NEW.raw_user_meta_data->>'interest_area', ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'partner'),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'status', ''), 'pending')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    company_name = COALESCE(public.profiles.company_name, EXCLUDED.company_name),
    phone = COALESCE(public.profiles.phone, EXCLUDED.phone),
    organization = COALESCE(public.profiles.organization, EXCLUDED.organization),
    position = COALESCE(public.profiles.position, EXCLUDED.position),
    interest_area = COALESCE(public.profiles.interest_area, EXCLUDED.interest_area),
    updated_at = now();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.admin_delete_auth_user(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only approved admins can delete users';
  END IF;

  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Admins cannot delete their own account';
  END IF;

  DELETE FROM auth.users
  WHERE id = target_user_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_delete_auth_user(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.track_profile_login()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET login_count = COALESCE(login_count, 0) + 1,
      last_login_at = now(),
      updated_at = now()
  WHERE id = auth.uid();
END;
$$;

CREATE OR REPLACE FUNCTION public.track_partner_portal_visit()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET portal_visit_count = COALESCE(portal_visit_count, 0) + 1,
      last_portal_visited_at = now(),
      updated_at = now()
  WHERE id = auth.uid();
END;
$$;

CREATE OR REPLACE FUNCTION public.update_own_partner_profile(
  new_full_name text,
  new_company_name text,
  new_phone text,
  new_organization text,
  new_position text,
  new_interest_area text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET full_name = NULLIF(new_full_name, ''),
      company_name = NULLIF(new_company_name, ''),
      phone = NULLIF(new_phone, ''),
      organization = NULLIF(new_organization, ''),
      position = NULLIF(new_position, ''),
      interest_area = NULLIF(new_interest_area, ''),
      updated_at = now()
  WHERE id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.track_profile_login() TO authenticated;
GRANT EXECUTE ON FUNCTION public.track_partner_portal_visit() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_own_partner_profile(text, text, text, text, text, text) TO authenticated;

-- 기존 Auth 사용자 중 profiles가 없는 사용자 복구
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  company_name,
  phone,
  organization,
  position,
  interest_area,
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
  NULLIF(u.raw_user_meta_data->>'organization', ''),
  NULLIF(u.raw_user_meta_data->>'position', ''),
  NULLIF(u.raw_user_meta_data->>'interest_area', ''),
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

CREATE POLICY "Anyone can read public resource_documents"
  ON public.resource_documents FOR SELECT
  USING (is_public = true OR public.is_admin());

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

CREATE POLICY "Admins can manage resource_documents"
  ON public.resource_documents FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Supabase Storage 버킷과 정책
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('product-images', 'product-images', true),
  ('case-images', 'case-images', true),
  ('resource-files', 'resource-files', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can read public product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can read public case images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-images');

CREATE POLICY "Anyone can read public resource files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resource-files');

CREATE POLICY "Admins can manage product images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admins can manage case images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'case-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'case-images' AND public.is_admin());

CREATE POLICY "Admins can manage resource files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'resource-files' AND public.is_admin())
  WITH CHECK (bucket_id = 'resource-files' AND public.is_admin());

CREATE POLICY "Admins can read inquiries"
  ON public.inquiries FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

NOTIFY pgrst, 'reload schema';
