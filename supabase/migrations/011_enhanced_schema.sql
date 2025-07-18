-- Create ENUM types for comprehensive type safety
CREATE TYPE user_role AS ENUM ('user', 'stylist', 'admin', 'super_admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded', 'partially_refunded');
CREATE TYPE analysis_status AS ENUM ('pending', 'in_progress', 'completed', 'review_needed');
CREATE TYPE notification_type AS ENUM ('booking', 'payment', 'analysis', 'system', 'marketing');
CREATE TYPE voucher_status AS ENUM ('active', 'redeemed', 'expired', 'cancelled');
CREATE TYPE contact_status AS ENUM ('unread', 'in_progress', 'resolved', 'closed');
CREATE TYPE consultation_type AS ENUM ('virtual', 'in_person', 'hybrid');
CREATE TYPE color_season AS ENUM ('spring_light', 'spring_bright', 'summer_light', 'summer_soft', 
                                   'autumn_warm', 'autumn_soft', 'winter_bright', 'winter_deep');

-- Enhanced Profiles Table with Comprehensive User Information
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL 
    CHECK (length(username) BETWEEN 3 AND 50)
    CHECK (username ~* '^[a-zA-Z0-9_]+$'),
  full_name TEXT CHECK (length(full_name) BETWEEN 2 AND 100),
  email TEXT UNIQUE NOT NULL 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  phone_number TEXT 
    CHECK (phone_number ~* '^\+?[1-9]\d{1,14}$'), -- E.164 format
  date_of_birth DATE 
    CHECK (date_of_birth < CURRENT_DATE AND age(date_of_birth) >= interval '16 years'),
  
  -- Profile Specific Fields
  role user_role DEFAULT 'user',
  preferred_consultation_type consultation_type,
  preferred_language TEXT DEFAULT 'en',
  
  -- Metadata and Tracking
  avatar_url TEXT,
  website TEXT,
  bio TEXT CHECK (length(bio) <= 500),
  location JSONB, -- Store city, country, timezone
  
  -- Tracking and Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  
  -- Privacy and Marketing Preferences
  marketing_opt_in BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active' 
    CHECK (account_status IN ('active', 'suspended', 'deleted'))
);

-- Services Catalog with Detailed Pricing and Configuration
CREATE TABLE services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE 
    CHECK (length(name) BETWEEN 3 AND 100),
  description TEXT CHECK (length(description) <= 1000),
  
  -- Pricing and Duration
  base_price NUMERIC(10, 2) NOT NULL 
    CHECK (base_price >= 0 AND base_price <= 10000),
  duration_minutes INTEGER 
    CHECK (duration_minutes > 0 AND duration_minutes <= 1440),
  
  -- Service Configurations
  consultation_type consultation_type[], -- Array of supported consultation types
  requires_questionnaire BOOLEAN DEFAULT false,
  
  -- Visibility and Availability
  active BOOLEAN DEFAULT true,
  public BOOLEAN DEFAULT true,
  
  -- Multimedia
  image_url TEXT,
  promo_video_url TEXT,
  
  -- Metadata and Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional Service Metadata
  tags TEXT[] -- Searchable tags for services
);

-- Comprehensive Questionnaire System
CREATE TABLE questionnaires (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL 
    CHECK (length(title) BETWEEN 3 AND 200),
  description TEXT CHECK (length(description) <= 500),
  
  -- Service Association
  service_id BIGINT REFERENCES services(id),
  
  -- Questionnaire Configuration
  questions JSONB NOT NULL 
    CHECK (
      jsonb_typeof(questions) = 'array' AND 
      jsonb_array_length(questions) BETWEEN 1 AND 50
    ),
  
  -- Versioning and Tracking
  version INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questionnaire Submissions with Comprehensive Tracking
CREATE TABLE questionnaire_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  questionnaire_id BIGINT REFERENCES questionnaires(id),
  
  -- Submission Data
  responses JSONB NOT NULL 
    CHECK (jsonb_typeof(responses) = 'object'),
  
  -- Submission Status
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Associated Files
  supporting_files JSONB, -- Store file references
  
  -- Tracking and Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique Constraint to Prevent Multiple Submissions
  UNIQUE(user_id, questionnaire_id)
);

-- Bookings and Consultation Management
CREATE TABLE bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  service_id BIGINT REFERENCES services(id),
  
  -- Booking Details
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL 
    CHECK (scheduled_at > NOW()),
  duration_minutes INTEGER 
    CHECK (duration_minutes > 0 AND duration_minutes <= 1440),
  
  -- Consultation Specifics
  consultation_type consultation_type,
  consultation_link TEXT, -- For virtual consultations
  
  -- Associated Submissions
  questionnaire_submission_id BIGINT 
    REFERENCES questionnaire_submissions(id),
  
  -- Booking Status
  status booking_status DEFAULT 'pending',
  stylist_id UUID REFERENCES auth.users(id), -- Assigned stylist
  
  -- Additional Notes
  client_notes TEXT CHECK (length(client_notes) <= 500),
  stylist_notes TEXT CHECK (length(stylist_notes) <= 500),
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comprehensive Payments System
CREATE TABLE payments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  booking_id BIGINT REFERENCES bookings(id),
  
  -- Payment Details
  amount NUMERIC(10, 2) NOT NULL 
    CHECK (amount > 0),
  currency TEXT DEFAULT 'GBP' 
    CHECK (length(currency) = 3),
  
  -- Payment Gateway Information
  payment_intent_id TEXT UNIQUE,
  payment_method TEXT,
  last_four_digits TEXT 
    CHECK (last_four_digits ~ '^\d{4}$'),
  
  -- Payment Status
  status payment_status NOT NULL,
  
  -- Refund Tracking
  refund_amount NUMERIC(10, 2) DEFAULT 0,
  refund_reason TEXT,
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Color Analysis Results
CREATE TABLE color_analysis_results (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  booking_id BIGINT REFERENCES bookings(id),
  
  -- Analysis Details
  color_season color_season,
  palette JSONB 
    CHECK (jsonb_typeof(palette) = 'object'),
  
  -- Detailed Recommendations
  clothing_recommendations JSONB,
  makeup_recommendations JSONB,
  accessory_recommendations JSONB,
  
  -- Analysis Report
  report_url TEXT,
  analyst_notes TEXT CHECK (length(analyst_notes) <= 2000),
  
  -- Status Tracking
  status analysis_status DEFAULT 'pending',
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gift Voucher System
CREATE TABLE gift_vouchers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT UNIQUE NOT NULL 
    CHECK (length(code) BETWEEN 6 AND 20),
  
  -- Voucher Details
  amount NUMERIC(10, 2) NOT NULL 
    CHECK (amount > 0),
  
  -- Purchaser and Recipient
  purchaser_id UUID REFERENCES auth.users(id),
  recipient_email TEXT 
    CHECK (recipient_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  recipient_name TEXT CHECK (length(recipient_name) <= 100),
  
  -- Voucher Lifecycle
  redeemed BOOLEAN DEFAULT false,
  redeemed_by UUID REFERENCES auth.users(id),
  redeemed_at TIMESTAMP WITH TIME ZONE,
  
  -- Validity
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE 
    CHECK (expiry_date > NOW()),
  status voucher_status DEFAULT 'active'
);

-- Notifications System
CREATE TABLE notifications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  
  -- Notification Content
  title TEXT NOT NULL 
    CHECK (length(title) BETWEEN 3 AND 200),
  message TEXT NOT NULL 
    CHECK (length(message) BETWEEN 10 AND 2000),
  
  -- Notification Metadata
  type notification_type,
  reference_id UUID,
  reference_type TEXT,
  
  -- Delivery Tracking
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Delivery Channels
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false,
  push_sent BOOLEAN DEFAULT false
);

-- Business Availability Management
CREATE TABLE business_availability (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day_of_week INTEGER 
    CHECK (day_of_week BETWEEN 0 AND 6),
  
  -- Time Slots
  start_time TIME NOT NULL,
  end_time TIME NOT NULL 
    CHECK (end_time > start_time),
  
  -- Availability Flags
  is_working_day BOOLEAN DEFAULT true,
  is_bookable BOOLEAN DEFAULT true,
  
  -- Special Dates (Holidays, etc.)
  date DATE,
  special_notes TEXT
);

-- Comprehensive Indexing
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_service ON bookings(service_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_color_analysis_user ON color_analysis_results(user_id);

-- BRIN Indexes for Time-based Columns
CREATE INDEX brin_idx_bookings_created ON bookings USING brin(created_at);
CREATE INDEX brin_idx_payments_created ON payments USING brin(created_at);