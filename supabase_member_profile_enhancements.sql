-- ============================================
-- Sunraytec member profile enhancements
-- Adds partner details, admin visibility fields, and visit/login counters.
-- Run the whole file in Supabase SQL Editor.
-- ============================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS position text,
  ADD COLUMN IF NOT EXISTS interest_area text,
  ADD COLUMN IF NOT EXISTS login_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz,
  ADD COLUMN IF NOT EXISTS portal_visit_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_portal_visited_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE public.partner_signup_requests
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS position text,
  ADD COLUMN IF NOT EXISTS interest_area text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

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

NOTIFY pgrst, 'reload schema';
