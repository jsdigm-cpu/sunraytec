-- ============================================
-- Sunraytec quick fix: create signup request ledger only
-- Run the whole file in Supabase SQL Editor.
-- ============================================

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

ALTER TABLE public.partner_signup_requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_signup_requests TO anon, authenticated;

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

DROP POLICY IF EXISTS "Anyone can create signup requests" ON public.partner_signup_requests;
CREATE POLICY "Anyone can create signup requests"
  ON public.partner_signup_requests FOR INSERT
  WITH CHECK (true);

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
