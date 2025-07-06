-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  service_type VARCHAR(100) DEFAULT 'color_analysis',
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  image_url TEXT,
  questionnaire_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analyst reports table
CREATE TABLE IF NOT EXISTS analyst_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  analyst_id UUID REFERENCES profiles(id),
  season_analysis TEXT,
  color_recommendations JSONB,
  styling_notes TEXT,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  status VARCHAR(50) DEFAULT 'draft',
  ai_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create color analysis results table (legacy support)
CREATE TABLE IF NOT EXISTS color_analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT,
  season VARCHAR(50),
  confidence INTEGER,
  undertone VARCHAR(50),
  recommended_colors JSONB,
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update questionnaire_submissions to match API usage
ALTER TABLE questionnaire_submissions 
ADD COLUMN IF NOT EXISTS session_id UUID,
ADD COLUMN IF NOT EXISTS answers JSONB,
ADD COLUMN IF NOT EXISTS results JSONB;

-- Add missing columns to contact_submissions
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add created_at to profiles if missing
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_tickets_customer_email ON tickets(customer_email);
CREATE INDEX IF NOT EXISTS idx_reports_ticket_id ON analyst_reports(ticket_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON analyst_reports(status);
CREATE INDEX IF NOT EXISTS idx_color_results_user_id ON color_analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_user_id ON questionnaire_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_session_id ON questionnaire_submissions(session_id);

-- Enable RLS on new tables
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyst_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies for tickets
CREATE POLICY "Anyone can create tickets" ON tickets
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all tickets" ON tickets
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update tickets" ON tickets
FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create policies for analyst reports
CREATE POLICY "Admins can manage reports" ON analyst_reports
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create policies for color analysis results
CREATE POLICY "Users can view their own results" ON color_analysis_results
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert results" ON color_analysis_results
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all results" ON color_analysis_results
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create storage bucket for images if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);