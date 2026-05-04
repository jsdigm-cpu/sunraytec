-- ============================================
-- Sunraytec Auth + protected route support
-- Run the whole file in Supabase Dashboard > SQL Editor.
-- Purpose:
--   1. Create/repair Auth profiles and signup ledger.
--   2. Keep user-controlled metadata out of role/status decisions.
--   3. Allow approved partners to read partner-only resource documents.
-- ============================================

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

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS position text,
  ADD COLUMN IF NOT EXISTS interest_area text,
  ADD COLUMN IF NOT EXISTS login_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz,
  ADD COLUMN IF NOT EXISTS portal_visit_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_portal_visited_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

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

ALTER TABLE public.partner_signup_requests
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS position text,
  ADD COLUMN IF NOT EXISTS interest_area text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_signup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_documents ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_signup_requests TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_documents TO anon, authenticated;

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
    'partner',
    'pending'
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

GRANT EXECUTE ON FUNCTION public.track_profile_login() TO authenticated;
GRANT EXECUTE ON FUNCTION public.track_partner_portal_visit() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_own_partner_profile(text, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_auth_user(uuid) TO authenticated;

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
  'partner',
  'pending',
  COALESCE(u.created_at, now())
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
CREATE POLICY "Admins can manage profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Anyone can create signup requests" ON public.partner_signup_requests;
CREATE POLICY "Anyone can create signup requests"
  ON public.partner_signup_requests FOR INSERT
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Admins can read signup requests" ON public.partner_signup_requests;
CREATE POLICY "Admins can read signup requests"
  ON public.partner_signup_requests FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage signup requests" ON public.partner_signup_requests;
CREATE POLICY "Admins can manage signup requests"
  ON public.partner_signup_requests FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Anyone can read public resource_documents" ON public.resource_documents;
CREATE POLICY "Anyone can read public resource_documents"
  ON public.resource_documents FOR SELECT
  USING (
    is_public = true
    OR public.is_admin()
    OR (
      category = '파트너 자료'
      AND EXISTS (
        SELECT 1
        FROM public.profiles p
        WHERE p.id = auth.uid()
          AND p.role = 'partner'
          AND p.status = 'approved'
      )
    )
  );

DROP POLICY IF EXISTS "Admins can manage resource_documents" ON public.resource_documents;
CREATE POLICY "Admins can manage resource_documents"
  ON public.resource_documents FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

NOTIFY pgrst, 'reload schema';
