-- Fix for missing user_id columns

-- First, check and add missing columns to tables
DO $$
BEGIN
    -- Check if user_id column exists in bookings table
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'bookings' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE bookings ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
    
    -- Check if user_id column exists in payments table
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE payments ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
    
    -- Check if user_id column exists in analysis_results table
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'analysis_results' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE analysis_results ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
    
    -- Check if user_id column exists in file_uploads table
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'file_uploads' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE file_uploads ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
    
    -- Check if user_id column exists in notifications table
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'notifications' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE notifications ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
END $$;

-- Now create policies after ensuring columns exist
DO $$
BEGIN
    -- Bookings policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can view their own bookings') THEN
        CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can insert their own bookings') THEN
        CREATE POLICY "Users can insert their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Users can update their own bookings') THEN
        CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Admins can view all bookings') THEN
        CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Admins can update all bookings') THEN
        CREATE POLICY "Admins can update all bookings" ON bookings FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Payments policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Users can view their own payments') THEN
        CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Payment system can insert payments') THEN
        CREATE POLICY "Payment system can insert payments" ON payments FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Admins can view all payments') THEN
        CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Admins can update payments') THEN
        CREATE POLICY "Admins can update payments" ON payments FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Analysis results policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Users can view their own analysis results') THEN
        CREATE POLICY "Users can view their own analysis results" ON analysis_results FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Admins can view all analysis results') THEN
        CREATE POLICY "Admins can view all analysis results" ON analysis_results FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analysis_results' AND policyname = 'Admins can update analysis results') THEN
        CREATE POLICY "Admins can update analysis results" ON analysis_results FOR UPDATE USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- File uploads policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Users can view their own uploads') THEN
        CREATE POLICY "Users can view their own uploads" ON file_uploads FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Users can insert their own uploads') THEN
        CREATE POLICY "Users can insert their own uploads" ON file_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'file_uploads' AND policyname = 'Admins can view all uploads') THEN
        CREATE POLICY "Admins can view all uploads" ON file_uploads FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
    END IF;
    
    -- Notifications policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can view their own notifications') THEN
        CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can update their own notifications') THEN
        CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'System can insert notifications') THEN
        CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
    END IF;
END $$;