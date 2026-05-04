-- ============================================
-- Sunraytec member/signup minimal fix
-- Run the WHOLE file in Supabase SQL Editor.
-- Do not run only a selected fragment.
-- ============================================

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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_signup_requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_signup_requests TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

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
    role,
    status
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'company_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    'partner',
    'pending'
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
  'partner',
  'pending',
  COALESCE(u.created_at, now())
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

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

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own basic profile" ON public.profiles;

DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
CREATE POLICY "Admins can manage profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Anyone can create signup requests" ON public.partner_signup_requests;
CREATE POLICY "Anyone can create signup requests"
  ON public.partner_signup_requests FOR INSERT
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Anyone can update own signup request by email" ON public.partner_signup_requests;

DROP POLICY IF EXISTS "Admins can read signup requests" ON public.partner_signup_requests;
CREATE POLICY "Admins can read signup requests"
  ON public.partner_signup_requests FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage signup requests" ON public.partner_signup_requests;
CREATE POLICY "Admins can manage signup requests"
  ON public.partner_signup_requests FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

NOTIFY pgrst, 'reload schema';
