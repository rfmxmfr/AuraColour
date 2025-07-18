-- Add Row Level Security to all tables
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    tablename IN ('profiles', 'services', 'questionnaires', 'questionnaire_submissions', 
                 'bookings', 'payments', 'color_analysis_results', 'gift_vouchers', 
                 'notifications', 'business_availability')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);
  END LOOP;
END $$;

-- Create basic RLS policies
-- Profiles policies
CREATE POLICY IF NOT EXISTS "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY IF NOT EXISTS "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Services policies (viewable by all)
CREATE POLICY IF NOT EXISTS "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

-- Bookings policies
CREATE POLICY IF NOT EXISTS "Users can view their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (for all tables)
DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public' AND 
    tablename IN ('profiles', 'services', 'questionnaires', 'questionnaire_submissions', 
                 'bookings', 'payments', 'color_analysis_results', 'gift_vouchers', 
                 'notifications', 'business_availability')
  LOOP
    EXECUTE format('
      CREATE POLICY IF NOT EXISTS "Admins can do everything with %1$I" ON %1$I
        FOR ALL USING (
          EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND 
            (role = ''admin'' OR role = ''super_admin'')
          )
        )
    ', table_name);
  END LOOP;
END $$;

-- Insert sample services if table exists and is empty
INSERT INTO services (name, description, base_price, duration_minutes, image_url, active)
SELECT 
  s.name, s.description, s.base_price, s.duration_minutes, s.image_url, s.active
FROM (
  VALUES 
    ('12-Season Color Analysis', 'Personal color season identification with comprehensive palette', 75.00, 60, '/services/color-analysis.jpg', true),
    ('Virtual Wardrobe Curation', 'Wardrobe audit and outfit combinations', 100.00, 90, '/services/wardrobe-curation.jpg', true),
    ('Personal Shopping Service', 'Guided shopping assistance', 150.00, 120, '/services/personal-shopping.jpg', true),
    ('Style Evolution Coaching', 'Complete style transformation program', 300.00, 180, '/services/style-coaching.jpg', true),
    ('Gift Vouchers', 'Flexible gift options', 75.00, 0, '/services/gift-voucher.jpg', true)
) AS s(name, description, base_price, duration_minutes, image_url, active)
WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);