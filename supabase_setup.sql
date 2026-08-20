-- Run this in your Supabase SQL Editor

-- 1. Create Articles Table
CREATE TABLE public.articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  author text NOT NULL,
  date text NOT NULL,
  excerpt text NOT NULL,
  image text NOT NULL,
  services text[] NOT NULL,
  results jsonb NOT NULL -- Example format: [{"label": "Recall Lift", "value": "+85%"}]
);

-- 2. Create Contact Requests Table (For Project Inquiries)
CREATE TABLE public.contact_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name text NOT NULL,
  company_name text,
  email text NOT NULL,
  phone text,
  country text,
  website text,
  industry text,
  source text,
  project_interests text[],
  description text,
  budget text,
  timeline text,
  attachment_url text
);

-- 3. Create Job Applications Table (For Join Us Form)
CREATE TABLE public.job_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  position text NOT NULL,
  employment_type text NOT NULL,
  experience text,
  portfolio text,
  message text,
  skills text,
  availability text,
  resume_url text
);

-- 4. Set up Row Level Security (RLS)

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- ARTICLES POLICIES
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.articles FOR SELECT
  USING ( true );

CREATE POLICY "Admins can insert articles."
  ON public.articles FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Admins can update articles."
  ON public.articles FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Admins can delete articles."
  ON public.articles FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- CONTACT REQUESTS POLICIES
CREATE POLICY "Anyone can submit a contact form."
  ON public.contact_requests FOR INSERT
  WITH CHECK ( true );

CREATE POLICY "Admins can view contact requests."
  ON public.contact_requests FOR SELECT
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Admins can delete contact requests."
  ON public.contact_requests FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- JOB APPLICATIONS POLICIES
CREATE POLICY "Anyone can submit a job application."
  ON public.job_applications FOR INSERT
  WITH CHECK ( true );

CREATE POLICY "Admins can view job applications."
  ON public.job_applications FOR SELECT
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Admins can delete job applications."
  ON public.job_applications FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- 5. Storage Buckets for Uploads
-- Note: In the Supabase Dashboard, you can create a bucket named 'uploads' and make it public.
-- The following SQL creates the bucket and sets policies (if run by superuser).

INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true) ON CONFLICT DO NOTHING;

-- Allow public uploads to 'uploads' bucket
CREATE POLICY "Anyone can upload files."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'uploads' );

-- Allow public viewing of files (since bucket is public)
CREATE POLICY "Anyone can view files."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'uploads' );

-- Allow authenticated admins to delete files
CREATE POLICY "Admins can delete files."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'uploads' AND auth.role() = 'authenticated' );
