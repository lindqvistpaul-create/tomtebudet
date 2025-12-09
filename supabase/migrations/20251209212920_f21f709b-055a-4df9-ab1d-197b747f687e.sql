-- Add payment tracking columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS stripe_session_id text,
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;

-- Add constraint for valid payment statuses
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_payment_status_check 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_session_id ON public.bookings(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON public.bookings(payment_status);