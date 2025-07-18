-- Complete AuraColor Database Rebuild Script

-- Create ENUM types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'stylist', 'admin', 'super_admin');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded', 'partially_refunded');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE analysis_status AS ENUM ('pending', 'in_progress', 'completed', 'review_needed');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM ('booking', 'payment', 'analysis', 'system', 'marketing');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE voucher_status AS ENUM ('active', 'redeemed', 'expired', 'cancelled');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE contact_status AS ENUM ('unread', 'in_progress', 'resolved', 'closed');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE consultation_type AS ENUM ('virtual', 'in_person', 'hybrid');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE color_season AS ENUM ('spring_light', 'spring_bright', 'summer_light', 'summer_soft', 
                                   'autumn_warm', 'autumn_soft', 'winter_bright', 'winter_deep');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT,
  date_of_birth DATE,
  role user_role DEFAULT 'user',
  preferred_consultation_type consultation_type,
  preferred_language TEXT DEFAULT 'en',
  avatar_url TEXT,
  website TEXT,
  bio TEXT,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  marketing_opt_in BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  base_price NUMERIC(10, 2) NOT NULL,
  duration_minutes INTEGER,
  consultation_type consultation_type[],
  requires_questionnaire BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  public BOOLEAN DEFAULT true,
  image_url TEXT,
  promo_video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[]
);

CREATE TABLE IF NOT EXISTS questionnaires (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  service_id BIGINT REFERENCES services(id),
  questions JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  questionnaire_id BIGINT REFERENCES questionnaires(id),
  responses JSONB NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  supporting_files JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, questionnaire_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  service_id BIGINT REFERENCES services(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER,
  consultation_type consultation_type,
  consultation_link TEXT,
  questionnaire_submission_id BIGINT REFERENCES questionnaire_submissions(id),
  status booking_status DEFAULT 'pending',
  stylist_id UUID REFERENCES auth.users(id),
  client_notes TEXT,
  stylist_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  booking_id BIGINT REFERENCES bookings(id),
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  payment_intent_id TEXT UNIQUE,
  payment_method TEXT,
  last_four_digits TEXT,
  status payment_status NOT NULL,
  refund_amount NUMERIC(10, 2) DEFAULT 0,
  refund_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS color_analysis_results (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  booking_id BIGINT REFERENCES bookings(id),
  color_season color_season,
  palette JSONB,
  clothing_recommendations JSONB,
  makeup_recommendations JSONB,
  accessory_recommendations JSONB,
  report_url TEXT,
  analyst_notes TEXT,
  status analysis_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS file_uploads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  questionnaire_submission_id BIGINT REFERENCES questionnaire_submissions(id),
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gift_vouchers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  purchaser_id UUID REFERENCES auth.users(id),
  recipient_email TEXT,
  recipient_name TEXT,
  redeemed BOOLEAN DEFAULT false,
  redeemed_by UUID REFERENCES auth.users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  status voucher_status DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type,
  reference_id UUID,
  reference_type TEXT,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false,
  push_sent BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  status contact_status DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_availability (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_working_day BOOLEAN DEFAULT true,
  is_bookable BOOLEAN DEFAULT true,
  date DATE,
  special_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_availability ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Services policies
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Questionnaires policies
CREATE POLICY "Questionnaires are viewable by everyone" ON questionnaires FOR SELECT USING (true);
CREATE POLICY "Admins can manage questionnaires" ON questionnaires FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Questionnaire submissions policies
CREATE POLICY "Users can view their own submissions" ON questionnaire_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own submissions" ON questionnaire_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own submissions" ON questionnaire_submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all submissions" ON questionnaire_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);
CREATE POLICY "Stylists can view assigned bookings" ON bookings FOR SELECT USING (auth.uid() = stylist_id);

-- Payments policies
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Payment system can insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Color analysis results policies
CREATE POLICY "Users can view their own analysis results" ON color_analysis_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all analysis results" ON color_analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);
CREATE POLICY "Stylists can update analysis results" ON color_analysis_results FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'stylist')
);

-- File uploads policies
CREATE POLICY "Users can view their own uploads" ON file_uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own uploads" ON file_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all uploads" ON file_uploads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Gift vouchers policies
CREATE POLICY "Users can view their purchased vouchers" ON gift_vouchers FOR SELECT USING (auth.uid() = purchaser_id OR auth.uid() = redeemed_by);
CREATE POLICY "Users can insert vouchers" ON gift_vouchers FOR INSERT WITH CHECK (auth.uid() = purchaser_id);
CREATE POLICY "Admins can view all vouchers" ON gift_vouchers FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Contact submissions policies
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Business availability policies
CREATE POLICY "Availability is viewable by everyone" ON business_availability FOR SELECT USING (true);
CREATE POLICY "Admins can manage availability" ON business_availability FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_stylist ON bookings(stylist_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_color_analysis_user ON color_analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_color_analysis_booking ON color_analysis_results(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_user ON file_uploads(user_id);

-- Insert sample services
INSERT INTO services (name, description, base_price, duration_minutes, active, image_url)
VALUES 
  ('12-Season Color Analysis', 'Personal color season identification with comprehensive palette', 75.00, 60, true, '/services/color-analysis.jpg'),
  ('Virtual Wardrobe Curation', 'Wardrobe audit and outfit combinations', 100.00, 90, true, '/services/wardrobe-curation.jpg'),
  ('Personal Shopping Service', 'Guided shopping assistance', 150.00, 120, true, '/services/personal-shopping.jpg'),
  ('Style Evolution Coaching', 'Complete style transformation program', 300.00, 180, true, '/services/style-coaching.jpg'),
  ('Gift Vouchers', 'Flexible gift options', 75.00, 0, true, '/services/gift-voucher.jpg')
ON CONFLICT (name) DO NOTHING;

-- Insert sample business availability
INSERT INTO business_availability (day_of_week, start_time, end_time, is_working_day)
VALUES
  (1, '09:00:00', '17:00:00', true), -- Monday
  (2, '09:00:00', '17:00:00', true), -- Tuesday
  (3, '09:00:00', '17:00:00', true), -- Wednesday
  (4, '09:00:00', '17:00:00', true), -- Thursday
  (5, '09:00:00', '17:00:00', true), -- Friday
  (6, '10:00:00', '15:00:00', false), -- Saturday
  (0, '00:00:00', '00:00:00', false)  -- Sunday
ON CONFLICT DO NOTHING;

-- Create sample questionnaire
INSERT INTO questionnaires (title, description, questions, active)
VALUES (
  'Color Analysis Questionnaire',
  'Help us understand your coloring and style preferences',
  jsonb_build_array(
    jsonb_build_object(
      'id', 'skin_tone',
      'type', 'multiple_choice',
      'question', 'How would you describe your skin tone?',
      'options', jsonb_build_array(
        'Very fair/pale',
        'Fair/light',
        'Medium/neutral',
        'Olive/warm',
        'Deep/dark'
      ),
      'required', true
    ),
    jsonb_build_object(
      'id', 'undertone',
      'type', 'multiple_choice',
      'question', 'What is your skin undertone?',
      'options', jsonb_build_array(
        'Cool (pink/blue/red)',
        'Warm (yellow/peach/golden)',
        'Neutral (mix of cool and warm)',
        'Olive (greenish)',
        'Not sure'
      ),
      'required', true
    ),
    jsonb_build_object(
      'id', 'hair_color',
      'type', 'multiple_choice',
      'question', 'What is your natural hair color?',
      'options', jsonb_build_array(
        'Platinum/White blonde',
        'Golden blonde',
        'Light brown/Dark blonde',
        'Medium brown',
        'Dark brown',
        'Black',
        'Red/Auburn',
        'Gray/Silver'
      ),
      'required', true
    ),
    jsonb_build_object(
      'id', 'eye_color',
      'type', 'multiple_choice',
      'question', 'What is your eye color?',
      'options', jsonb_build_array(
        'Light blue',
        'Blue',
        'Gray',
        'Green',
        'Hazel',
        'Light brown',
        'Dark brown',
        'Black'
      ),
      'required', true
    ),
    jsonb_build_object(
      'id', 'photo_upload',
      'type', 'file_upload',
      'question', 'Please upload a recent photo of yourself in natural lighting without makeup',
      'required', true
    )
  ),
  true
)
ON CONFLICT DO NOTHING;