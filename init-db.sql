-- Basic schema setup for AuraColour

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  message TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Questionnaires are viewable by admin or owner" ON questionnaire_submissions
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can insert their own questionnaire" ON questionnaire_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Contact submissions are viewable by admins" ON contact_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO profiles (id, full_name, username, role)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Admin User', 'admin', 'admin'),
  ('11111111-1111-1111-1111-111111111111', 'Test User', 'testuser', 'user')
ON CONFLICT (id) DO NOTHING;

INSERT INTO questionnaire_submissions (user_id, data)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '{"question1": "answer1", "question2": "answer2"}')
ON CONFLICT DO NOTHING;

INSERT INTO contact_submissions (name, email, message)
VALUES 
  ('John Doe', 'john@example.com', 'This is a test message'),
  ('Jane Smith', 'jane@example.com', 'Another test message')
ON CONFLICT DO NOTHING;