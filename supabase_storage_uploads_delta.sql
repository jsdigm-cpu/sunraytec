-- ============================================
-- Sunraytec admin upload/order delta SQL
-- Run in Supabase Dashboard > SQL Editor
-- Created: 2026-04-27
-- ============================================

-- 1. Product image gallery and display order
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_gallery jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

UPDATE public.products
SET image_gallery = COALESCE(image_gallery, '[]'::jsonb),
    sort_order = COALESCE(sort_order, 0);

-- 2. Case study image gallery and display order
ALTER TABLE public.case_studies
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT ARRAY[]::text[],
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS installed_at date,
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

UPDATE public.case_studies
SET images = COALESCE(images, ARRAY[]::text[]),
    sort_order = COALESCE(sort_order, 0);

-- 3. Resource documents table
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

ALTER TABLE public.resource_documents ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_documents TO anon, authenticated;

-- 4. Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('product-images', 'product-images', true),
  ('case-images', 'case-images', true),
  ('resource-files', 'resource-files', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- 5. Resource document policies
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

-- 6. Storage read policies
DROP POLICY IF EXISTS "Anyone can read public product images" ON storage.objects;
CREATE POLICY "Anyone can read public product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Anyone can read public case images" ON storage.objects;
CREATE POLICY "Anyone can read public case images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-images');

DROP POLICY IF EXISTS "Anyone can read public resource files" ON storage.objects;
CREATE POLICY "Anyone can read public resource files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resource-files');

-- 7. Storage admin write policies
DROP POLICY IF EXISTS "Admins can manage product images" ON storage.objects;
CREATE POLICY "Admins can manage product images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can manage case images" ON storage.objects;
CREATE POLICY "Admins can manage case images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'case-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'case-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can manage resource files" ON storage.objects;
CREATE POLICY "Admins can manage resource files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'resource-files' AND public.is_admin())
  WITH CHECK (bucket_id = 'resource-files' AND public.is_admin());
