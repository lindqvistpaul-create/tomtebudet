-- Create santa_applications table to store onboarding data
CREATE TABLE public.santa_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  
  -- Verification status
  bankid_verified BOOLEAN NOT NULL DEFAULT false,
  bankid_verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Documents and photos
  id_document_url TEXT,
  portrait_photo_url TEXT,
  costume_photo_url TEXT,
  
  -- Profile information
  price_per_quarter INTEGER, -- Price per 15 min in SEK
  bio TEXT,
  experience TEXT,
  available_times TEXT[], -- Array of available time slots
  
  -- Application status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.santa_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own application
CREATE POLICY "Users can view their own application"
ON public.santa_applications
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own application
CREATE POLICY "Users can create their own application"
ON public.santa_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own application (only if not yet approved)
CREATE POLICY "Users can update their own application"
ON public.santa_applications
FOR UPDATE
USING (auth.uid() = user_id AND status != 'approved');

-- Add trigger for updated_at
CREATE TRIGGER update_santa_applications_updated_at
BEFORE UPDATE ON public.santa_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for santa photos and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('santa-uploads', 'santa-uploads', false);

-- Storage policies for santa uploads
CREATE POLICY "Users can upload their own santa files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'santa-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own santa files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'santa-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own santa files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'santa-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own santa files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'santa-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);