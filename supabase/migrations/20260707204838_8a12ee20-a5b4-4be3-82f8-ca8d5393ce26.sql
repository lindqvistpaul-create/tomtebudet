-- bankid_orders
CREATE TABLE IF NOT EXISTS public.bankid_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  qr_start_token text NOT NULL,
  qr_start_secret text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.bankid_orders TO service_role;
ALTER TABLE public.bankid_orders ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS bankid_orders_created_at_idx ON public.bankid_orders (created_at);

-- protect_bankid_fields
CREATE OR REPLACE FUNCTION public.protect_bankid_fields()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE is_service_role boolean;
BEGIN
  is_service_role := coalesce(auth.role(), '') = 'service_role';
  IF TG_OP = 'INSERT' THEN
    IF NOT is_service_role THEN
      NEW.bankid_verified := false;
      NEW.bankid_verified_at := NULL;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NOT is_service_role AND (
      NEW.bankid_verified IS DISTINCT FROM OLD.bankid_verified OR
      NEW.bankid_verified_at IS DISTINCT FROM OLD.bankid_verified_at
    ) THEN
      RAISE EXCEPTION 'bankid_verified kan endast sättas av systemet';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS protect_bankid_fields_trigger ON public.santa_applications;
CREATE TRIGGER protect_bankid_fields_trigger
  BEFORE INSERT OR UPDATE ON public.santa_applications
  FOR EACH ROW EXECUTE FUNCTION public.protect_bankid_fields();

-- security_hardening
DROP POLICY IF EXISTS "Users can create their own application" ON public.santa_applications;
CREATE POLICY "Users can create their own application"
ON public.santa_applications FOR INSERT
WITH CHECK (auth.uid() = user_id AND status IN ('draft', 'pending_review'));

DROP POLICY IF EXISTS "Users can update their own application" ON public.santa_applications;
CREATE POLICY "Users can update their own application"
ON public.santa_applications FOR UPDATE
USING (auth.uid() = user_id AND status != 'approved')
WITH CHECK (auth.uid() = user_id AND status IN ('draft', 'pending_review'));

CREATE OR REPLACE FUNCTION public.protect_review_fields()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE is_privileged boolean;
BEGIN
  is_privileged := coalesce(auth.role(), '') = 'service_role'
    OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));
  IF NOT is_privileged THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.status NOT IN ('draft', 'pending_review') THEN NEW.status := 'draft'; END IF;
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
  FOR EACH ROW EXECUTE FUNCTION public.protect_review_fields();

DROP POLICY IF EXISTS "Admins can update all applications" ON public.santa_applications;
CREATE POLICY "Admins can update all applications"
ON public.santa_applications FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all santa files" ON storage.objects;
CREATE POLICY "Admins can view all santa files"
ON storage.objects FOR SELECT
USING (bucket_id = 'santa-uploads' AND public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.santa_applications
  ADD CONSTRAINT santa_applications_price_bounds
    CHECK (price_per_quarter IS NULL OR (price_per_quarter > 0 AND price_per_quarter <= 10000)),
  ADD CONSTRAINT santa_applications_bio_length
    CHECK (bio IS NULL OR char_length(bio) <= 2000),
  ADD CONSTRAINT santa_applications_experience_length
    CHECK (experience IS NULL OR char_length(experience) <= 2000);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 320),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 300),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now(),
  handled_at timestamptz
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- public_santa_profiles
ALTER TABLE public.santa_applications
  ADD COLUMN IF NOT EXISTS city text CHECK (city IS NULL OR char_length(city) <= 100);

DROP POLICY IF EXISTS "Anyone can view santa photos" ON storage.objects;
CREATE POLICY "Anyone can view santa photos"
ON storage.objects FOR SELECT USING (bucket_id = 'santa-photos');

DROP POLICY IF EXISTS "Users can upload their own santa photos" ON storage.objects;
CREATE POLICY "Users can upload their own santa photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'santa-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can update their own santa photos" ON storage.objects;
CREATE POLICY "Users can update their own santa photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'santa-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete their own santa photos" ON storage.objects;
CREATE POLICY "Users can delete their own santa photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'santa-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE OR REPLACE VIEW public.public_santas AS
SELECT
  sa.id,
  COALESCE(NULLIF(TRIM(p.first_name), ''), SPLIT_PART(p.full_name, ' ', 1)) AS display_name,
  sa.city, sa.bio, sa.experience, sa.price_per_quarter, sa.available_times,
  sa.portrait_photo_url, sa.costume_photo_url, sa.bankid_verified, sa.reviewed_at
FROM public.santa_applications sa
JOIN public.profiles p ON p.user_id = sa.user_id
WHERE sa.status = 'approved';

GRANT SELECT ON public.public_santas TO anon, authenticated;