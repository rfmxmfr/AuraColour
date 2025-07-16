-- Insert admin users (assuming profiles table exists)
INSERT INTO profiles (id, role) VALUES 
('7da5a2fd-c44d-4bc7-9cdf-6d153bcbd13b', 'admin'),
('702e2ac4-1b43-44a8-892f-8aa052d61aa2', 'admin'),
('480a5db5-f186-4555-9859-434edee8b009', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- If profiles table doesn't exist, create it first:
-- CREATE TABLE profiles (
--   id UUID REFERENCES auth.users(id) PRIMARY KEY,
--   role TEXT DEFAULT 'user'
-- );