-- Create or update admin users in auth.users and profiles tables

-- First, ensure profiles table exists
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert/Update users in auth.users table (if they don't exist, they need to sign up first)
-- Then set their roles to admin in profiles table

INSERT INTO profiles (id, role) VALUES 
('7da5a2fd-c44d-4bc7-9cdf-6d153bcbd13b', 'admin'),
('702e2ac4-1b43-44a8-892f-8aa052d61aa2', 'admin'),
('480a5db5-f186-4555-9859-434edee8b009', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify admin users
SELECT 
  au.id,
  au.email,
  p.role,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE au.id IN (
  '7da5a2fd-c44d-4bc7-9cdf-6d153bcbd13b',
  '702e2ac4-1b43-44a8-892f-8aa052d61aa2',
  '480a5db5-f186-4555-9859-434edee8b009'
);