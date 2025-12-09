-- Create family interest table
CREATE TABLE public.family_interest (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  location TEXT,
  children_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notified_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.family_interest ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can submit interest"
ON public.family_interest
FOR INSERT
WITH CHECK (true);

-- Only admins can view all entries
CREATE POLICY "Admins can view all interest entries"
ON public.family_interest
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update entries (mark as notified)
CREATE POLICY "Admins can update interest entries"
ON public.family_interest
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));