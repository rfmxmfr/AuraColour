-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER, -- in minutes
  active BOOLEAN DEFAULT true,
  image_url TEXT,
  metadata JSONB
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  booking_id UUID,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT NOT NULL,
  payment_intent_id TEXT,
  payment_method TEXT,
  metadata JSONB
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  questionnaire_id UUID REFERENCES questionnaire_submissions(id),
  season TEXT,
  palette JSONB,
  report_url TEXT,
  analyst_notes TEXT,
  status TEXT DEFAULT 'pending',
  metadata JSONB
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Admins can insert/update services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Payment system can insert payments" ON payments FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own analysis results" ON analysis_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all analysis results" ON analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update analysis results" ON analysis_results FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Insert sample services
INSERT INTO services (name, description, price, duration, active, image_url)
VALUES 
  ('12-Season Color Analysis', 'Personal color season identification with comprehensive palette', 75.00, 60, true, '/services/color-analysis.jpg'),
  ('Virtual Wardrobe Curation', 'Wardrobe audit and outfit combinations', 100.00, 90, true, '/services/wardrobe-curation.jpg'),
  ('Personal Shopping Service', 'Guided shopping assistance', 150.00, 120, true, '/services/personal-shopping.jpg'),
  ('Style Evolution Coaching', 'Complete style transformation program', 300.00, 180, true, '/services/style-coaching.jpg'),
  ('Gift Vouchers', 'Flexible gift options', 75.00, 0, true, '/services/gift-voucher.jpg')
ON CONFLICT DO NOTHING;