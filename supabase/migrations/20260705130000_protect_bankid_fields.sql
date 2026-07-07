-- Skydda bankid_verified/bankid_verified_at: får endast sättas av service role
-- (dvs. bankid-edge-funktionen), aldrig direkt av klienter – oavsett RLS.
CREATE OR REPLACE FUNCTION public.protect_bankid_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_service_role boolean;
BEGIN
  is_service_role := coalesce(auth.role(), '') = 'service_role';

  IF TG_OP = 'INSERT' THEN
    IF NOT is_service_role THEN
      -- Klienter får skapa ansökningar, men aldrig som redan verifierade.
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
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_bankid_fields();
