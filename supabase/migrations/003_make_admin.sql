-- Make user 480a5db5-f186-4555-9859-434edee8b009 an admin
INSERT INTO profiles (id, role, full_name, created_at, updated_at)
VALUES ('480a5db5-f186-4555-9859-434edee8b009', 'admin', 'Admin User', NOW(), NOW())
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  updated_at = NOW();