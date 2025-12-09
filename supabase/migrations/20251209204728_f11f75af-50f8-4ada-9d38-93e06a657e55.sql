-- Add DELETE policy to booking_children table
-- Only booking owners can delete their booking children
CREATE POLICY "Users can delete their booking children"
ON public.booking_children
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM bookings
  WHERE bookings.id = booking_children.booking_id
  AND bookings.user_id = auth.uid()
));