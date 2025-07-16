-- Storage setup for Style & Fashion Platform

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('user-photos', 'user-photos', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('wardrobe-items', 'wardrobe-items', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('analysis-results', 'analysis-results', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for user-photos bucket
CREATE POLICY "Users can upload their own photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'user-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'user-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for wardrobe-items bucket
CREATE POLICY "Users can upload wardrobe items" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'wardrobe-items' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view wardrobe items" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'wardrobe-items' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete wardrobe items" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'wardrobe-items' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for analysis-results bucket
CREATE POLICY "Users can view analysis results" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'analysis-results' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "System can create analysis results" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'analysis-results');

-- Public access for analysis results (for sharing)
CREATE POLICY "Public can view analysis results" ON storage.objects
  FOR SELECT USING (bucket_id = 'analysis-results');