-- Storage setup for AuraColour application
-- This migration sets up storage buckets and policies for file uploads

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('color-analysis-photos', 'color-analysis-photos', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('profile-avatars', 'profile-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('reports', 'reports', false, 5242880, ARRAY['application/pdf', 'text/html'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for color-analysis-photos bucket
CREATE POLICY "Users can upload their own photos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'color-analysis-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own photos" ON storage.objects
FOR SELECT USING (
  bucket_id = 'color-analysis-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Analysts can view all photos" ON storage.objects
FOR SELECT USING (
  bucket_id = 'color-analysis-photos' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

CREATE POLICY "Users can delete their own photos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'color-analysis-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for profile-avatars bucket
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for reports bucket
CREATE POLICY "Users can view their own reports" ON storage.objects
FOR SELECT USING (
  bucket_id = 'reports' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Analysts can upload reports" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'reports' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

CREATE POLICY "Analysts can view all reports" ON storage.objects
FOR SELECT USING (
  bucket_id = 'reports' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

CREATE POLICY "Analysts can update reports" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'reports' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Create a function to generate signed URLs for reports
CREATE OR REPLACE FUNCTION generate_report_url(report_path TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  signed_url TEXT;
BEGIN
  -- Only allow access to own reports or if user is admin/analyst
  IF NOT (
    auth.uid()::text = (string_to_array(report_path, '/'))[1] OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  -- Generate signed URL (expires in 1 hour)
  SELECT storage.create_signed_url('reports', report_path, 3600) INTO signed_url;
  
  RETURN signed_url;
END;
$$;

-- Create a function to clean up old uploaded photos
CREATE OR REPLACE FUNCTION cleanup_old_photos()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete photos older than 30 days that are not referenced in any reports
  DELETE FROM storage.objects
  WHERE bucket_id = 'color-analysis-photos'
    AND created_at < NOW() - INTERVAL '30 days'
    AND name NOT IN (
      SELECT UNNEST(photos_analyzed) 
      FROM analyst_reports 
      WHERE photos_analyzed IS NOT NULL
    );
END;
$$;

COMMENT ON FUNCTION generate_report_url IS 'Generate signed URL for report access with proper authorization';
COMMENT ON FUNCTION cleanup_old_photos IS 'Clean up old uploaded photos not referenced in reports';