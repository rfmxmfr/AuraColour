-- Enhanced schema for AuraColour application

-- Update questionnaire_submissions table with additional fields
ALTER TABLE IF EXISTS questionnaire_submissions
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_amount INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS stripe_payment_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS stripe_session_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS refund_amount INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS refund_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT '12-Season Color Analysis',
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stylist_id UUID REFERENCES profiles(id),
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  location VARCHAR(255) DEFAULT 'Online',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  submission_id UUID REFERENCES questionnaire_submissions(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(50)
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Appointments
CREATE POLICY "Users can view their own appointments" ON appointments
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Stylists can view appointments assigned to them" ON appointments
FOR SELECT USING (stylist_id = auth.uid());

CREATE POLICY "Admins can view all appointments" ON appointments
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Feedback
CREATE POLICY "Users can submit and view their own feedback" ON feedback
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can view all feedback" ON feedback
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Notifications
CREATE POLICY "Users can view their own notifications" ON notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
FOR UPDATE USING (user_id = auth.uid());

-- Activity Log
CREATE POLICY "Admins can view activity logs" ON activity_log
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_submissions_status ON questionnaire_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_payment_status ON questionnaire_submissions(payment_status);
CREATE INDEX IF NOT EXISTS idx_submissions_assigned_to ON questionnaire_submissions(assigned_to);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_stylist_id ON appointments(stylist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_feedback_submission_id ON feedback(submission_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action ON activity_log(action);

-- Add stylist role to profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type 
    WHERE typname = 'user_role' 
  ) THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin', 'stylist');
    
    -- Convert existing role column to use the new type
    ALTER TABLE profiles 
    ALTER COLUMN role TYPE user_role USING role::user_role;
  END IF;
END
$$;