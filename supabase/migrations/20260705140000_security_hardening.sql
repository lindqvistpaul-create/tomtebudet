-- ============================================================
-- Säkerhetshärdning inför lansering (senior review 2026-07-05)
-- ============================================================

-- 1) santa_applications: klienter får ALDRIG sätta status till approved/rejected
--    själva – varken via INSERT eller UPDATE. (Tidigare saknades WITH CHECK.)
DROP POLICY IF EXISTS "Users can create their own application" ON public.santa_applications;
CREATE POLICY "Users can create their own application"
ON public.santa_applications
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND status IN ('draft', 'pending_review')
);

DROP POLICY IF EXISTS "Users can update their own application" ON public.santa_applications;
CREATE POLICY "Users can update their own application"
ON public.santa_applications
FOR UPDATE
USING (auth.uid() = user_id AND status != 'approved')
WITH CHECK (
  auth.uid() = user_id
  AND status IN ('draft', 'pending_review')
);

-- 2) Skydda gransknings-fälten med trigger (försvar på djupet utöver RLS).
--    Endast service role eller admin får ändra status till approved/rejected
--    samt sätta reviewed_at/review_notes.
CREATE OR REPLACE FUNCTION public.protect_review_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_privileged boolean;
BEGIN
  is_privileged :=
    coalesce(auth.role(), '') = 'service_role'
    OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

  IF NOT is_privileged THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.status NOT IN ('draft', 'pending_review') THEN
        NEW.status := 'draft';
      END IF;
      NEW.reviewed_at := NULL;
      NEW.review_notes := NULL;
    ELSIF TG_OP = 'UPDATE' THEN
      IF NEW.status IS DISTINCT FROM OLD.status
         AND NEW.status NOT IN ('draft', 'pending_review') THEN
        RAISE EXCEPTION 'Endast administratörer kan godkänna eller avslå ansökningar';
      END IF;
      NEW.reviewed_at := OLD.reviewed_at;
      NEW.review_notes := OLD.review_notes;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_review_fields_trigger ON public.santa_applications;
CREATE TRIGGER protect_review_fields_trigger
  BEFORE INSERT OR UPDATE ON public.santa_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_review_fields();

-- 3) Explicit WITH CHECK på admin-uppdateringar (var implicit tidigare).
DROP POLICY IF EXISTS "Admins can update all applications" ON public.santa_applications;
CREATE POLICY "Admins can update all applications"
ON public.santa_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4) Admins måste kunna läsa uppladdade filer (signerade URL:er) för granskning.
--    Bucketen förblir PRIVAT – gör den aldrig publik, den innehåller ID-handlingar.
CREATE POLICY "Admins can view all santa files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'santa-uploads'
  AND public.has_role(auth.uid(), 'admin')
);

-- 5) Rimliga gränser på klient-skrivbara fält.
ALTER TABLE public.santa_applications
  ADD CONSTRAINT santa_applications_price_bounds
    CHECK (price_per_quarter IS NULL OR (price_per_quarter > 0 AND price_per_quarter <= 10000)),
  ADD CONSTRAINT santa_applications_bio_length
    CHECK (bio IS NULL OR char_length(bio) <= 2000),
  ADD CONSTRAINT santa_applications_experience_length
    CHECK (experience IS NULL OR char_length(experience) <= 2000);

-- 6) Kontaktmeddelanden: riktigt mål för kontaktformulären (som idag kastar
--    bort allt). Publik INSERT med validering, endast admin läser.
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 320),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 300),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now(),
  handled_at timestamptz
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
