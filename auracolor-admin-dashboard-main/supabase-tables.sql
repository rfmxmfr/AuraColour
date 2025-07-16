-- Create all required tables for AuraColor

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_number VARCHAR(50) UNIQUE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  service_type VARCHAR(100),
  preferred_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Questionnaire submissions
CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id SERIAL PRIMARY KEY,
  answers JSONB,
  photo_urls TEXT[],
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id SERIAL PRIMARY KEY,
  code VARCHAR(16) UNIQUE,
  brand VARCHAR(10) DEFAULT 'GIFT',
  initial_value INTEGER,
  balance INTEGER,
  currency VARCHAR(3) DEFAULT 'GBP',
  status VARCHAR(20) DEFAULT 'ACTIVE',
  owner_email VARCHAR(255),
  purchaser_email VARCHAR(255),
  message TEXT,
  expiry_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ML analyses table
CREATE TABLE IF NOT EXISTS ml_analyses (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(255),
  season VARCHAR(100),
  confidence DECIMAL(3,2),
  colors TEXT[],
  undertone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin users
INSERT INTO profiles (id, role) VALUES 
('7da5a2fd-c44d-4bc7-9cdf-6d153bcbd13b', 'admin'),
('702e2ac4-1b43-44a8-892f-8aa052d61aa2', 'admin'),
('480a5db5-f186-4555-9859-434edee8b009', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';