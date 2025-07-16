-- Create admin profile for rmonteiro@gmx.co.uk
-- Run this in Supabase SQL Editor after setting password in Auth

INSERT INTO profiles (id, username, full_name, role, created_at, updated_at)
VALUES (
  '7da5a2fd-c44d-4bc7-9cdf-6d153bcbd13b',
  'rmonteiro',
  'Renato Monteiro',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  username = 'rmonteiro',
  full_name = 'Renato Monteiro',
  updated_at = NOW();