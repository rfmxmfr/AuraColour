-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  service_type VARCHAR(100) NOT NULL,
  preferred_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create vouchers table
CREATE TABLE IF NOT EXISTS vouchers (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  brand VARCHAR(50) DEFAULT 'GIFT',
  initial_value INTEGER NOT NULL,
  balance INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'GBP',
  status VARCHAR(20) DEFAULT 'ACTIVE',
  owner_email VARCHAR(255) NOT NULL,
  purchaser_email VARCHAR(255) NOT NULL,
  message TEXT,
  expiry_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_vouchers_code ON vouchers(code);
CREATE INDEX IF NOT EXISTS idx_vouchers_owner ON vouchers(owner_email);