-- Check existing tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check bookings table structure
\d bookings;

-- Check vouchers table structure  
\d vouchers;