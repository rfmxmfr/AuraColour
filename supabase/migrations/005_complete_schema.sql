-- Complete AuraColour Database Schema
-- This migration creates all required tables for the application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'analyst')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Questionnaire Submissions table
CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  service_type TEXT DEFAULT '12-Season Color Analysis',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'failed', 'refunded')),
  payment_intent_id TEXT,
  amount DECIMAL(10,2) DEFAULT 75.00,
  currency TEXT DEFAULT 'GBP',
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'resolved')),
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Analyst Reports table
CREATE TABLE IF NOT EXISTS analyst_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  questionnaire_id UUID REFERENCES questionnaire_submissions(id) ON DELETE CASCADE,
  analyst_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  season_analysis TEXT CHECK (season_analysis IN ('Spring', 'Summer', 'Autumn', 'Winter', 'Light Spring', 'True Spring', 'Clear Spring', 'Light Summer', 'True Summer', 'Soft Summer', 'Soft Autumn', 'True Autumn', 'Deep Autumn', 'Clear Winter', 'True Winter', 'Deep Winter')),
  color_recommendations TEXT[] DEFAULT '{}',
  avoid_colors TEXT[] DEFAULT '{}',
  undertone TEXT CHECK (undertone IN ('warm', 'cool', 'neutral')),
  contrast_level TEXT CHECK (contrast_level IN ('low', 'medium', 'high')),
  styling_notes TEXT,
  makeup_recommendations TEXT,
  wardrobe_suggestions TEXT,
  shopping_guide TEXT,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  ai_analysis JSONB DEFAULT '{}',
  photos_analyzed TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'sent', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- 5. Bookings table (for scheduling appointments)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  questionnaire_id UUID REFERENCES questionnaire_submissions(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  notes TEXT,
  meeting_link TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  questionnaire_id UUID REFERENCES questionnaire_submissions(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled', 'refunded')),
  payment_method TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- 7. Gift Vouchers table
CREATE TABLE IF NOT EXISTS gift_vouchers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  purchaser_name TEXT,
  purchaser_email TEXT,
  recipient_name TEXT,
  recipient_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  redeemed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_user_id ON questionnaire_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_payment_status ON questionnaire_submissions(payment_status);
CREATE INDEX IF NOT EXISTS idx_questionnaire_submissions_created_at ON questionnaire_submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_analyst_reports_questionnaire_id ON analyst_reports(questionnaire_id);
CREATE INDEX IF NOT EXISTS idx_analyst_reports_analyst_id ON analyst_reports(analyst_id);
CREATE INDEX IF NOT EXISTS idx_analyst_reports_status ON analyst_reports(status);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

CREATE INDEX IF NOT EXISTS idx_gift_vouchers_code ON gift_vouchers(code);
CREATE INDEX IF NOT EXISTS idx_gift_vouchers_status ON gift_vouchers(status);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questionnaire_submissions_updated_at BEFORE UPDATE ON questionnaire_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_analyst_reports_updated_at BEFORE UPDATE ON analyst_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gift_vouchers_updated_at BEFORE UPDATE ON gift_vouchers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyst_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_vouchers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Questionnaire submissions policies
CREATE POLICY "Users can view own submissions" ON questionnaire_submissions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create submissions" ON questionnaire_submissions FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY "Admins can view all submissions" ON questionnaire_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);
CREATE POLICY "Admins can update submissions" ON questionnaire_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Contact submissions policies
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update contact submissions" ON contact_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Analyst reports policies
CREATE POLICY "Users can view own reports" ON analyst_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM questionnaire_submissions WHERE id = analyst_reports.questionnaire_id AND user_id = auth.uid())
);
CREATE POLICY "Analysts can view and manage reports" ON analyst_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);
CREATE POLICY "Admins can update bookings" ON bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
);

-- Payments policies
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM questionnaire_submissions 
    WHERE id = payments.questionnaire_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM bookings 
    WHERE id = payments.booking_id AND user_id = auth.uid()
  )
);
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Gift vouchers policies
CREATE POLICY "Anyone can view active vouchers by code" ON gift_vouchers FOR SELECT USING (status = 'active');
CREATE POLICY "Users can redeem vouchers" ON gift_vouchers FOR UPDATE USING (status = 'active');
CREATE POLICY "Admins can manage vouchers" ON gift_vouchers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Insert sample data for testing
INSERT INTO profiles (id, username, full_name, role) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin', 'Admin User', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'analyst', 'Color Analyst', 'analyst')
ON CONFLICT (id) DO NOTHING;

-- Sample questionnaire submission
INSERT INTO questionnaire_submissions (id, name, email, data, service_type, payment_status, status)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Sample Customer',
  'customer@example.com',
  '{"skinTone": "fair", "eyeColor": "blue", "hairColor": "blonde", "preferences": ["professional", "casual"]}',
  '12-Season Color Analysis',
  'confirmed',
  'submitted'
) ON CONFLICT (id) DO NOTHING;

-- Sample contact submission
INSERT INTO contact_submissions (name, email, subject, message)
VALUES (
  'Jane Doe',
  'jane@example.com',
  'Color Analysis Inquiry',
  'I am interested in learning more about your color analysis services.'
) ON CONFLICT DO NOTHING;

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth';
COMMENT ON TABLE questionnaire_submissions IS 'Color analysis questionnaire submissions';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions';
COMMENT ON TABLE analyst_reports IS 'Generated color analysis reports';
COMMENT ON TABLE bookings IS 'Service appointment bookings';
COMMENT ON TABLE payments IS 'Payment transactions via Stripe';
COMMENT ON TABLE gift_vouchers IS 'Gift voucher management';