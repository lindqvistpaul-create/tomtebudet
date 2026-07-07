-- ============================================================
-- Publika tomtprofiler: stad, publik fotobucket och publik vy
-- ============================================================

-- 1) Stad/område för sök och matchning
ALTER TABLE public.santa_applications
  ADD COLUMN IF NOT EXISTS city text
    CHECK (city IS NULL OR char_length(city) <= 100);

-- 2) Publik bucket för PROFILFOTON (porträtt + tomtedräkt).
--    ID-handlingar ligger kvar i privata 'santa-uploads' – flytta dem ALDRIG hit.
INSERT INTO storage.buckets (id, name, public)
VALUES ('santa-photos', 'santa-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view santa photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'santa-photos');

CREATE POLICY "Users can upload their own santa photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'santa-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own santa photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'santa-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own santa photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'santa-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 3) Publik vy: ENDAST godkända tomtar, ENDAST ofarliga fält.
--    Förnamn + stad – aldrig efternamn, e-post, telefon eller ID-handlingar.
--    Vyn ägs av postgres (kringgår RLS) – det är avsiktligt och säkert
--    eftersom kolumnurvalet och WHERE-villkoret utgör exponeringsgränsen.
CREATE OR REPLACE VIEW public.public_santas AS
SELECT
  sa.id,
  COALESCE(NULLIF(TRIM(p.first_name), ''), SPLIT_PART(p.full_name, ' ', 1)) AS display_name,
  sa.city,
  sa.bio,
  sa.experience,
  sa.price_per_quarter,
  sa.available_times,
  sa.portrait_photo_url,
  sa.costume_photo_url,
  sa.bankid_verified,
  sa.reviewed_at
FROM public.santa_applications sa
JOIN public.profiles p ON p.user_id = sa.user_id
WHERE sa.status = 'approved';

GRANT SELECT ON public.public_santas TO anon, authenticated;
