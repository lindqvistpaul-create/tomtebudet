-- Fix critical security vulnerability: Prevent admin role assignment via signup
-- The trigger must ONLY allow 'customer' or 'santa' roles from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    -- Only allow customer or santa roles from user input, NEVER admin
    CASE 
      WHEN (NEW.raw_user_meta_data ->> 'role')::text = 'santa' THEN 'santa'::app_role
      ELSE 'customer'::app_role
    END
  );
  RETURN NEW;
END;
$$;