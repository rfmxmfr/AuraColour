-- Complete schema for Style & Fashion Platform

-- Color analysis results table
CREATE TABLE IF NOT EXISTS color_analysis_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT,
  season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter')),
  confidence_score DECIMAL(3,2),
  color_palette JSONB,
  analysis_data JSONB,
  status TEXT DEFAULT 'completed'
);

-- Virtual wardrobe table
CREATE TABLE IF NOT EXISTS virtual_wardrobe (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  item_name TEXT NOT NULL,
  category TEXT,
  color TEXT,
  season TEXT,
  image_url TEXT,
  purchase_date DATE,
  price DECIMAL(10,2),
  brand TEXT,
  notes TEXT
);

-- Stylist appointments table
CREATE TABLE IF NOT EXISTS stylist_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  stylist_id UUID REFERENCES auth.users(id),
  appointment_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 60,
  service_type TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  meeting_url TEXT,
  price DECIMAL(10,2)
);

-- Orders table for personal shopping
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  payment_status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  items JSONB
);

-- Product recommendations table
CREATE TABLE IF NOT EXISTS product_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  product_data JSONB,
  season_match TEXT,
  confidence_score DECIMAL(3,2),
  source TEXT,
  is_purchased BOOLEAN DEFAULT FALSE
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  style_preferences JSONB,
  size_preferences JSONB,
  budget_range JSONB,
  color_season TEXT,
  notification_settings JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS on all tables
ALTER TABLE color_analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_wardrobe ENABLE ROW LEVEL SECURITY;
ALTER TABLE stylist_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Color analysis results
CREATE POLICY "Users can view own color analysis" ON color_analysis_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own color analysis" ON color_analysis_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all color analysis" ON color_analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Virtual wardrobe
CREATE POLICY "Users can manage own wardrobe" ON virtual_wardrobe FOR ALL USING (auth.uid() = user_id);

-- Stylist appointments
CREATE POLICY "Users can view own appointments" ON stylist_appointments FOR SELECT USING (
  auth.uid() = user_id OR auth.uid() = stylist_id
);
CREATE POLICY "Users can book appointments" ON stylist_appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Stylists can update appointments" ON stylist_appointments FOR UPDATE USING (auth.uid() = stylist_id);

-- Orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Product recommendations
CREATE POLICY "Users can view own recommendations" ON product_recommendations FOR ALL USING (auth.uid() = user_id);

-- User preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_color_analysis_user_id ON color_analysis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_wardrobe_user_id ON virtual_wardrobe(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON stylist_appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_stylist_id ON stylist_appointments(stylist_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON product_recommendations(user_id);