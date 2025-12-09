-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert their own role on signup" ON public.user_roles;

-- Create a more restrictive INSERT policy that only allows 'customer' role
-- The handle_new_user_role trigger (SECURITY DEFINER) handles santa role assignment
CREATE POLICY "Users can insert their own customer role on signup"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'customer'::app_role
);