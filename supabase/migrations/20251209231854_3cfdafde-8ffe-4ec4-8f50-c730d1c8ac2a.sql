-- Drop existing SELECT policies on bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Santas can view their assigned bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;

-- Recreate with explicit authentication requirement
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Santas can view their assigned bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = santa_user_id);

CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role));