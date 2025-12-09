-- Add santa_user_id column to link bookings to Santa's auth user
ALTER TABLE public.bookings 
ADD COLUMN santa_user_id UUID REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX idx_bookings_santa_user_id ON public.bookings(santa_user_id);

-- Add RLS policy for Santas to view bookings assigned to them
CREATE POLICY "Santas can view their assigned bookings"
ON public.bookings
FOR SELECT
USING (
  auth.uid() = santa_user_id
);

-- Add RLS policy for Santas to update bookings assigned to them (for accept/decline)
CREATE POLICY "Santas can update their assigned bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = santa_user_id);

-- Add RLS policy for Santas to view booking children for their bookings
CREATE POLICY "Santas can view children for their bookings"
ON public.booking_children
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = booking_children.booking_id
    AND bookings.santa_user_id = auth.uid()
  )
);