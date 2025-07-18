-- Complete AuraColor Database Schema (with policy existence checks)

-- Users and Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  username TEXT UNIQUE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  website TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services
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

-- Questionnaires
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  service_id UUID REFERENCES services(id),
  questions JSONB NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Questionnaire Submissions
CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  questionnaire_id UUID REFERENCES questionnaires(id),
  data JSONB NOT NULL,
  completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMP WITH TIME ZONE
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  service_id UUID REFERENCES services(id),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER, -- in minutes
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  notes TEXT,
  metadata JSONB
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  booking_id UUID REFERENCES bookings(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT NOT NULL, -- pending, succeeded, failed, refunded
  payment_intent_id TEXT,
  payment_method TEXT,
  metadata JSONB
);

-- Analysis Results
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  questionnaire_id UUID REFERENCES questionnaire_submissions(id),
  booking_id UUID REFERENCES bookings(id),
  season TEXT,
  palette JSONB,
  report_url TEXT,
  analyst_notes TEXT,
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  metadata JSONB
);

-- File Uploads
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  questionnaire_submission_id UUID REFERENCES questionnaire_submissions(id),
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  metadata JSONB
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread', -- unread, read, replied
  data JSONB
);

-- Gift Vouchers
CREATE TABLE IF NOT EXISTS gift_vouchers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  purchaser_id UUID REFERENCES auth.users(id),
  recipient_email TEXT,
  recipient_name TEXT,
  message TEXT,
  redeemed BOOLEAN DEFAULT false,
  redeemed_by UUID REFERENCES auth.users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' -- active, redeemed, expired
);

-- Availability
CREATE TABLE IF NOT EXISTS availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  day_of_week INTEGER, -- 0 = Sunday, 1 = Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  metadata JSONB
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  type TEXT, -- booking, payment, result, system
  reference_id UUID,
  reference_type TEXT,
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies with existence checks
DO $$
BEGIN
    -- Profiles policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone') THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile') THEN
        CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    END IF;
    
    -- Services policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Services are viewable by everyone') THEN
        CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Admins can manage services') THEN
        CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Questionnaires policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaires' AND policyname = 'Questionnaires are viewable by everyone') THEN
        CREATE POLICY "Questionnaires are viewable by everyone" ON questionnaires FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaires' AND policyname = 'Admins can manage questionnaires') THEN
        CREATE POLICY "Admins can manage questionnaires" ON questionnaires FOR ALL USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Questionnaire submissions policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_submissions' AND policyname = 'Users can view their own submissions') THEN
        CREATE POLICY "Users can view their own submissions" ON questionnaire_submissions FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_submissions' AND policyname = 'Users can insert their own submissions') THEN
        CREATE POLICY "Users can insert their own submissions" ON questionnaire_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_submissions' AND policyname = 'Users can update their own submissions') THEN
        CREATE POLICY "Users can update their own submissions" ON questionnaire_submissions FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_submissions' AND policyname = 'Admins can view all submissions') THEN
        CREATE POLICY "Admins can view all submissions" ON questionnaire_submissions FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_submissions' AND policyname = 'Admins can update all submissions') THEN
        CREATE POLICY "Admins can update all submissions" ON questionnaire_submissions FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Bookings policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can view their own bookings') THEN
        CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can insert their own bookings') THEN
        CREATE POLICY "Users can insert their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can update their own bookings') THEN
        CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Admins can view all bookings') THEN
        CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Admins can update all bookings') THEN
        CREATE POLICY "Admins can update all bookings" ON bookings FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Payments policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Users can view their own payments') THEN
        CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Payment system can insert payments') THEN
        CREATE POLICY "Payment system can insert payments" ON payments FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Admins can view all payments') THEN
        CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Admins can update payments') THEN
        CREATE POLICY "Admins can update payments" ON payments FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Analysis results policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Users can view their own analysis results') THEN
        CREATE POLICY "Users can view their own analysis results" ON analysis_results FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Admins can view all analysis results') THEN
        CREATE POLICY "Admins can view all analysis results" ON analysis_results FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Admins can update analysis results') THEN
        CREATE POLICY "Admins can update analysis results" ON analysis_results FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- File uploads policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Users can view their own uploads') THEN
        CREATE POLICY "Users can view their own uploads" ON file_uploads FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Users can insert their own uploads') THEN
        CREATE POLICY "Users can insert their own uploads" ON file_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Admins can view all uploads') THEN
        CREATE POLICY "Admins can view all uploads" ON file_uploads FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Contact submissions policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'Anyone can insert contact submissions') THEN
        CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'Admins can view contact submissions') THEN
        CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_submissions' AND policyname = 'Admins can update contact submissions') THEN
        CREATE POLICY "Admins can update contact submissions" ON contact_submissions FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Gift vouchers policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_vouchers' AND policyname = 'Users can view their purchased vouchers') THEN
        CREATE POLICY "Users can view their purchased vouchers" ON gift_vouchers FOR SELECT USING (auth.uid() = purchaser_id OR auth.uid() = redeemed_by);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_vouchers' AND policyname = 'Users can insert vouchers') THEN
        CREATE POLICY "Users can insert vouchers" ON gift_vouchers FOR INSERT WITH CHECK (auth.uid() = purchaser_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_vouchers' AND policyname = 'Admins can view all vouchers') THEN
        CREATE POLICY "Admins can view all vouchers" ON gift_vouchers FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gift_vouchers' AND policyname = 'Admins can update vouchers') THEN
        CREATE POLICY "Admins can update vouchers" ON gift_vouchers FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Availability policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'availability' AND policyname = 'Availability is viewable by everyone') THEN
        CREATE POLICY "Availability is viewable by everyone" ON availability FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'availability' AND policyname = 'Admins can manage availability') THEN
        CREATE POLICY "Admins can manage availability" ON availability FOR ALL USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Notifications policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can view their own notifications') THEN
        CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can update their own notifications') THEN
        CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'System can insert notifications') THEN
        CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- Insert sample services if they don't exist
INSERT INTO services (name, description, price, duration, active, image_url)
VALUES 
  ('12-Season Color Analysis', 'Personal color season identification with comprehensive palette', 75.00, 60, true, '/services/color-analysis.jpg'),
  ('Virtual Wardrobe Curation', 'Wardrobe audit and outfit combinations', 100.00, 90, true, '/services/wardrobe-curation.jpg'),
  ('Personal Shopping Service', 'Guided shopping assistance', 150.00, 120, true, '/services/personal-shopping.jpg'),
  ('Style Evolution Coaching', 'Complete style transformation program', 300.00, 180, true, '/services/style-coaching.jpg'),
  ('Gift Vouchers', 'Flexible gift options', 75.00, 0, true, '/services/gift-voucher.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample availability if it doesn't exist
INSERT INTO availability (day_of_week, start_time, end_time, is_available)
VALUES
  (1, '09:00:00', '17:00:00', true), -- Monday
  (2, '09:00:00', '17:00:00', true), -- Tuesday
  (3, '09:00:00', '17:00:00', true), -- Wednesday
  (4, '09:00:00', '17:00:00', true), -- Thursday
  (5, '09:00:00', '17:00:00', true)  -- Friday
ON CONFLICT DO NOTHING;

-- Create sample questionnaire if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM questionnaires WHERE title = 'Color Analysis Questionnaire') THEN
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
              'id', 'colors_look_good',
              'type', 'multiple_select',
              'question', 'Which colors do you feel look best on you?',
              'options', jsonb_build_array(
                'Bright/vivid colors',
                'Soft/muted colors',
                'Warm colors (yellow, orange, red)',
                'Cool colors (blue, purple, green)',
                'Neutrals (black, white, gray)',
                'Pastels',
                'Earth tones',
                'Jewel tones'
              ),
              'required', false
            ),
            jsonb_build_object(
              'id', 'colors_avoid',
              'type', 'multiple_select',
              'question', 'Which colors do you tend to avoid wearing?',
              'options', jsonb_build_array(
                'Bright/vivid colors',
                'Soft/muted colors',
                'Warm colors (yellow, orange, red)',
                'Cool colors (blue, purple, green)',
                'Neutrals (black, white, gray)',
                'Pastels',
                'Earth tones',
                'Jewel tones'
              ),
              'required', false
            ),
            jsonb_build_object(
              'id', 'jewelry_preference',
              'type', 'multiple_choice',
              'question', 'Which metal jewelry looks best on you?',
              'options', jsonb_build_array(
                'Gold',
                'Silver/White gold/Platinum',
                'Rose gold',
                'Both gold and silver look good',
                'Not sure'
              ),
              'required', false
            ),
            jsonb_build_object(
              'id', 'photo_upload',
              'type', 'file_upload',
              'question', 'Please upload a recent photo of yourself in natural lighting without makeup',
              'required', true
            )
          ),
          true
        );
    END IF;
END $$;