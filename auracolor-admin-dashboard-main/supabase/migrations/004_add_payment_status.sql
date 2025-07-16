-- Add payment status to questionnaire_submissions
ALTER TABLE questionnaire_submissions 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS stripe_session_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT 'color_analysis';